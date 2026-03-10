"use client";

import { useState } from 'react';
import { ScreeningQuestion } from '@/features/jobs/types/job';
import { generateScreeningQuestions } from '@/features/jobs/services/questionGenerator';
import { AdminButton } from '@/features/admin/components/ui/AdminButton';
import styles from './QuestionnaireEditor.module.css';

interface QuestionnaireEditorProps {
  questions: ScreeningQuestion[];
  onChange: (questions: ScreeningQuestion[]) => void;
  jobTitle?: string;
  jobArea?: string;
  jobDescription?: string;
}

export function QuestionnaireEditor({
  questions,
  onChange,
  jobTitle = '',
  jobArea = '',
  jobDescription = ''
}: QuestionnaireEditorProps) {
  const [activeTab, setActiveTab] = useState<'manual' | 'ai'>('manual');
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const addQuestion = () => {
    if (questions.length >= 10) return;
    const newQ: ScreeningQuestion = {
      id: `q_${Date.now()}_${questions.length}`,
      text: '',
      options: ['', '', '', ''],
      correctOptionIndex: 0,
    };
    onChange([...questions, newQ]);
  };

  const updateQuestion = (index: number, field: string, value: string) => {
    const updated = [...questions];
    (updated[index] as any)[field] = value;
    onChange(updated);
  };

  const updateOption = (qIndex: number, optIndex: number, value: string) => {
    const updated = [...questions];
    const opts = [...updated[qIndex].options] as [string, string, string, string];
    opts[optIndex] = value;
    updated[qIndex] = { ...updated[qIndex], options: opts };
    onChange(updated);
  };

  const setCorrectAnswer = (qIndex: number, optIndex: number) => {
    const updated = [...questions];
    updated[qIndex] = { ...updated[qIndex], correctOptionIndex: optIndex };
    onChange(updated);
  };

  const removeQuestion = (index: number) => {
    onChange(questions.filter((_, i) => i !== index));
  };

  const handleGenerateWithAI = async () => {
    if (!jobTitle) {
      setError('Preencha o título do cargo antes de gerar perguntas.');
      return;
    }
    setGenerating(true);
    setError('');
    try {
      const generated = await generateScreeningQuestions(jobTitle, jobArea, jobDescription);
      onChange(generated);
      setActiveTab('manual'); // Switch to manual to allow editing
    } catch (err) {
      setError('Erro ao gerar perguntas. Tente novamente.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className={styles.editor}>
      <div className={styles.editorHeader}>
        <h3 className={styles.editorTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
          </svg>
          Perguntas de Triagem
          <span className={styles.badge}>{questions.length}/10</span>
        </h3>
      </div>

      <div className={styles.tabBar}>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === 'manual' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('manual')}
        >
          ✏️ Criar Manualmente
        </button>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === 'ai' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('ai')}
        >
          🤖 Gerar com IA
        </button>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      {activeTab === 'ai' && (
        <div className={styles.aiSection}>
          <div className={styles.aiInfo}>
            <div className={styles.aiIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 014 4v2a4 4 0 01-8 0V6a4 4 0 014-4z" />
                <path d="M16 14v1a4 4 0 01-8 0v-1" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="8" y1="22" x2="16" y2="22" />
              </svg>
            </div>
            <div>
              <h4>Geração Inteligente com Gemini</h4>
              <p>A IA vai criar 10 perguntas personalizadas baseadas no cargo, área e descrição da vaga. Após geradas, você poderá revisar, editar ou excluir cada pergunta.</p>
            </div>
          </div>
          <AdminButton 
            type="button" 
            onClick={handleGenerateWithAI} 
            disabled={generating}
          >
            {generating ? '⏳ Gerando perguntas...' : '✨ Gerar 10 Perguntas com IA'}
          </AdminButton>
        </div>
      )}

      {activeTab === 'manual' && (
        <div className={styles.questionsList}>
          {questions.map((q, qIndex) => (
            <div key={q.id} className={styles.questionCard}>
              <div className={styles.questionHeader}>
                <span className={styles.questionNumber}>Pergunta {qIndex + 1}</span>
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => removeQuestion(qIndex)}
                  title="Remover pergunta"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                  </svg>
                </button>
              </div>

              <input
                type="text"
                className={styles.questionInput}
                placeholder="Digite a pergunta..."
                value={q.text}
                onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
              />

              <div className={styles.optionsGrid}>
                {q.options.map((opt, optIndex) => (
                  <div key={optIndex} className={styles.optionRow}>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name={`correct_${q.id}`}
                        checked={q.correctOptionIndex === optIndex}
                        onChange={() => setCorrectAnswer(qIndex, optIndex)}
                        className={styles.radioInput}
                      />
                      <span className={`${styles.radioMark} ${q.correctOptionIndex === optIndex ? styles.radioMarkActive : ''}`}>
                        {String.fromCharCode(65 + optIndex)}
                      </span>
                    </label>
                    <input
                      type="text"
                      className={styles.optionInput}
                      placeholder={`Opção ${String.fromCharCode(65 + optIndex)}`}
                      value={opt}
                      onChange={(e) => updateOption(qIndex, optIndex, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <p className={styles.correctHint}>
                ✅ Resposta correta: <strong>Opção {String.fromCharCode(65 + (q.correctOptionIndex || 0))}</strong>
              </p>
            </div>
          ))}

          {questions.length < 10 && (
            <button type="button" className={styles.addBtn} onClick={addQuestion}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              Adicionar Pergunta
            </button>
          )}

          {questions.length === 0 && (
            <div className={styles.emptyState}>
              <p>Nenhuma pergunta adicionada. Crie manualmente ou use a IA para gerar.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
