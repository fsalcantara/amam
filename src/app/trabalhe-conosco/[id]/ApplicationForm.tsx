"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { ScreeningQuestion } from '@/features/jobs/types/job';
import { QuestionAnswer, ProctoringData } from '@/features/jobs/types/application';
import { applicationService } from '@/features/jobs/services/applicationService';
import { useToast } from '@/components/atoms/Toast/ToastContext';
import styles from './page.module.css';

interface ApplicationFormProps {
  jobId: string;
  screeningQuestions?: ScreeningQuestion[];
  onSuccess: () => void;
  onCancel: () => void;
}

// ─── CPF Utilities ───
function formatCPF(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function isValidCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, '');
  if (digits.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false; // all same digits

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i);
  let rest = (sum * 10) % 11;
  if (rest === 10) rest = 0;
  if (rest !== parseInt(digits[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(digits[i]) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10) rest = 0;
  return rest === parseInt(digits[10]);
}

export function ApplicationForm({ jobId, screeningQuestions = [], onSuccess, onCancel }: ApplicationFormProps) {
  const hasQuestions = screeningQuestions.length > 0;
  const [step, setStep] = useState<1 | 2>(1);
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [cpfError, setCpfError] = useState('');

  // Step 1 data
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    phone: '',
    linkedin: '',
    cvFile: null as File | null,
  });

  // Step 2 data (questionnaire)
  const [answers, setAnswers] = useState<Record<string, number>>({});
  
  // ─── Proctoring State ───
  const proctoringRef = useRef<ProctoringData>({
    tabSwitchCount: 0,
    pasteAttemptCount: 0,
    totalTimeMs: 0,
    flagged: false,
  });
  const questionStartTime = useRef<number>(Date.now());
  const questionTimesRef = useRef<Record<string, number>>({});
  const sessionStartRef = useRef<number>(0);

  // ─── Anti-Cheat: Tab Visibility ───
  useEffect(() => {
    if (step !== 2) return;
    sessionStartRef.current = Date.now();

    const handleVisibility = () => {
      if (document.hidden) {
        proctoringRef.current.tabSwitchCount += 1;
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [step]);

  // ─── Anti-Cheat: Paste, Copy, Context Menu ───
  const blockPaste = useCallback((e: ClipboardEvent) => {
    if (step === 2) {
      e.preventDefault();
      proctoringRef.current.pasteAttemptCount += 1;
    }
  }, [step]);

  const blockCopy = useCallback((e: ClipboardEvent) => {
    if (step === 2) e.preventDefault();
  }, [step]);

  const blockContextMenu = useCallback((e: MouseEvent) => {
    if (step === 2) e.preventDefault();
  }, [step]);

  useEffect(() => {
    if (step !== 2) return;

    document.addEventListener('paste', blockPaste);
    document.addEventListener('copy', blockCopy);
    document.addEventListener('cut', blockCopy);
    document.addEventListener('contextmenu', blockContextMenu);

    return () => {
      document.removeEventListener('paste', blockPaste);
      document.removeEventListener('copy', blockCopy);
      document.removeEventListener('cut', blockCopy);
      document.removeEventListener('contextmenu', blockContextMenu);
    };
  }, [step, blockPaste, blockCopy, blockContextMenu]);

  // ─── Handle CPF Validation + Duplicate Check ───
  const handleAdvanceToStep2 = async () => {
    setCpfError('');

    if (!isValidCPF(formData.cpf)) {
      setCpfError('CPF inválido. Verifique os dígitos.');
      return;
    }

    setLoading(true);
    try {
      const isDuplicate = await applicationService.checkDuplicateCPF(jobId, formData.cpf);
      if (isDuplicate) {
        setCpfError('Você já se candidatou a esta vaga com este CPF.');
        return;
      }

      if (hasQuestions) {
        setStep(2);
        questionStartTime.current = Date.now();
      } else {
        await submitApplication();
      }
    } finally {
      setLoading(false);
    }
  };

  // ─── Select Answer ───
  const selectAnswer = (questionId: string, optionIndex: number) => {
    // Record time for current question
    const now = Date.now();
    questionTimesRef.current[questionId] = (questionTimesRef.current[questionId] || 0) + (now - questionStartTime.current);
    questionStartTime.current = now;

    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  // ─── Submit Application ───
  const submitApplication = async (questionAnswers?: QuestionAnswer[]) => {
    setLoading(true);
    try {
      // Finalize proctoring
      proctoringRef.current.totalTimeMs = Date.now() - sessionStartRef.current;
      proctoringRef.current.flagged = 
        proctoringRef.current.tabSwitchCount > 3 || 
        proctoringRef.current.pasteAttemptCount > 2;

      await applicationService.apply({
        jobId,
        name: formData.name,
        cpf: formData.cpf.replace(/\D/g, ''),
        email: formData.email,
        phone: formData.phone,
        linkedin: formData.linkedin,
        cvFile: formData.cvFile || undefined,
        answers: questionAnswers,
        proctoring: step === 2 ? { ...proctoringRef.current } : undefined,
      });
      onSuccess();
    } catch (error) {
      console.error('Error submitting application:', error);
      showToast('Erro ao enviar candidatura. Tente novamente.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Build answers array with times
    const questionAnswers: QuestionAnswer[] = screeningQuestions.map(q => ({
      questionId: q.id,
      selectedOptionIndex: answers[q.id] ?? -1,
      timeSpentMs: questionTimesRef.current[q.id] || 0,
    }));

    await submitApplication(questionAnswers);
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleAdvanceToStep2();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        showToast('Por favor, envie o currículo apenas em formato PDF.', 'error');
        e.target.value = '';
        setFormData({ ...formData, cvFile: null });
        return;
      }
      const MAX_SIZE_MB = 5;
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        showToast(`O arquivo excede o limite de ${MAX_SIZE_MB}MB. Por favor, reduza o tamanho do PDF.`, 'error');
        e.target.value = '';
        setFormData({ ...formData, cvFile: null });
        return;
      }
      setFormData({ ...formData, cvFile: file });
    }
  };

  // ────────────────────────────────
  // STEP 2 — QUESTIONNAIRE
  // ────────────────────────────────
  if (step === 2) {
    const allAnswered = screeningQuestions.every(q => answers[q.id] !== undefined);

    return (
      <div className={styles.formContainer} style={{ userSelect: 'none' }}>
        <div className={styles.stepIndicator}>
          <span className={styles.stepDone}>1. Dados Pessoais ✓</span>
          <span className={styles.stepCurrent}>2. Questionário</span>
        </div>

        <h3 className={styles.formTitle}>Questionário de Triagem</h3>
        <p className={styles.formSubtitle}>
          Responda todas as perguntas abaixo. Não é possível voltar após iniciar.
        </p>

        <form onSubmit={handleStep2Submit}>
          {screeningQuestions.map((q, qIndex) => (
            <div key={q.id} className={styles.questionBlock}>
              <div className={styles.questionLabel}>
                <span className={styles.qNumber}>{qIndex + 1}</span>
                {q.text}
              </div>
              <div className={styles.optionsWrapper}>
                {q.options.map((opt, optIndex) => (
                  <label
                    key={optIndex}
                    className={`${styles.optionLabel} ${answers[q.id] === optIndex ? styles.optionSelected : ''}`}
                  >
                    <input
                      type="radio"
                      name={`question_${q.id}`}
                      checked={answers[q.id] === optIndex}
                      onChange={() => selectAnswer(q.id, optIndex)}
                      className={styles.hiddenInput}
                    />
                    <span className={styles.optionLetter}>
                      {String.fromCharCode(65 + optIndex)}
                    </span>
                    <span className={styles.optionText}>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className={styles.formActions}>
            <button
              type="submit"
              disabled={loading || !allAnswered}
              className={`${styles.applyButton} ${styles.submitButton}`}
            >
              {loading ? 'Enviando...' : 'Enviar Candidatura'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // ────────────────────────────────
  // STEP 1 — PERSONAL DATA + CV
  // ────────────────────────────────
  return (
    <div className={styles.formContainer}>
      {hasQuestions && (
        <div className={styles.stepIndicator}>
          <span className={styles.stepCurrent}>1. Dados Pessoais</span>
          <span className={styles.stepPending}>2. Questionário</span>
        </div>
      )}

      <h3 className={styles.formTitle}>Candidatar-se para a vaga</h3>
      <form onSubmit={handleStep1Submit}>
        
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Nome Completo *</label>
          <input 
            type="text" 
            required 
            className={styles.input}
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            placeholder="Seu nome"
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>CPF *</label>
          <input 
            type="text" 
            required 
            className={`${styles.input} ${cpfError ? styles.inputError : ''}`}
            value={formData.cpf}
            onChange={e => {
              setCpfError('');
              setFormData({...formData, cpf: formatCPF(e.target.value)});
            }}
            placeholder="000.000.000-00"
            maxLength={14}
          />
          {cpfError && <span className={styles.errorText}>{cpfError}</span>}
        </div>

        <div className={styles.formGrid}>
          <div>
            <label className={styles.label}>Email *</label>
            <input 
              type="email" 
              required 
              className={styles.input}
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className={styles.label}>Telefone *</label>
            <input 
              type="tel" 
              required 
              className={styles.input}
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
              placeholder="(00) 00000-0000"
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>LinkedIn (Opcional)</label>
          <input 
            type="url" 
            className={styles.input}
            value={formData.linkedin}
            onChange={e => setFormData({...formData, linkedin: e.target.value})}
            placeholder="https://linkedin.com/in/seu-perfil"
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Currículo (Apenas PDF) *</label>
          <div className={`${styles.fileUploadArea} ${formData.cvFile ? styles.hasFile : ''}`}>
            {formData.cvFile ? (
              <div className={styles.fileName}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <strong>{formData.cvFile.name}</strong>
              </div>
            ) : (
              <>
                <div className={styles.uploadIcon}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <p className={styles.uploadText}>Clique ou arraste seu arquivo aqui</p>
                <p className={styles.uploadSubtext}>Apenas PDF (Máx. 5MB)</p>
              </>
            )}
            <input 
              type="file" 
              required 
              accept=".pdf"
              onChange={handleFileChange}
              className={styles.hiddenInput}
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <button 
            type="button" 
            onClick={onCancel}
            disabled={loading}
            className={styles.cancelButton}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className={`${styles.applyButton} ${styles.submitButton}`}
          >
            {loading ? 'Verificando...' : hasQuestions ? 'Avançar para Questionário →' : 'Enviar Candidatura'}
          </button>
        </div>

      </form>
    </div>
  );
}
