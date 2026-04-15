"use client";

import { useEffect, useState } from 'react';
import { Job } from '@/features/jobs/types/job';
import { Application } from '@/features/jobs/types/application';
import { applicationService } from '@/features/jobs/services/applicationService';
import { useToast } from '@/components/atoms/Toast/ToastContext';
import styles from './ApplicationList.module.css';

interface ApplicationListProps {
  job: Job;
  onBack: () => void;
}

export function ApplicationList({ job, onBack }: ApplicationListProps) {
  const { showToast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'cv' | 'answers'>('info');
  const [aiAnalysis, setAiAnalysis] = useState<{ score: number; evaluation: string; recommendation: string } | null>(null);
  const [analyzingAi, setAnalyzingAi] = useState(false);

  useEffect(() => { loadApplications(); }, [job]);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const data = await applicationService.getApplicationsByJobId(job.id);
      setApplications(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectApp = (app: Application) => {
    setSelectedApp(app);
    setAiAnalysis(app.aiAnalysis || null);
    setActiveTab('info');
  };

  const getTestScore = (app: Application) => {
    if (!app.answers || app.answers.length === 0 || !job.screeningQuestions) return null;
    let correct = 0;
    app.answers.forEach(ans => {
      const q = job.screeningQuestions?.find(sq => sq.id === ans.questionId);
      if (q && q.correctOptionIndex === ans.selectedOptionIndex) correct++;
    });
    const total = job.screeningQuestions.length;
    const percentage = Math.round((correct / total) * 100);
    let grade = 'Fraco';
    if (percentage >= 80) grade = 'Excelente';
    else if (percentage >= 60) grade = 'Bom';
    else if (percentage >= 40) grade = 'Regular';
    return { correct, total, percentage, grade };
  };

  const handleAnalyzeCV = async () => {
    if (!selectedApp?.cvUrl) return;
    if (selectedApp.aiAnalysis) { setAiAnalysis(selectedApp.aiAnalysis); return; }
    setAnalyzingAi(true);
    try {
      const res = await fetch('/api/analyze-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cvBase64: selectedApp.cvUrl,
          jobTitle: job.title,
          jobDescription: job.description,
          candidateName: selectedApp.name,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro na análise');
      setAiAnalysis(data);
      const updated = await applicationService.updateApplication(selectedApp.id, { aiAnalysis: data });
      if (updated) {
        setSelectedApp(updated);
        setApplications(prev => prev.map(a => a.id === updated.id ? updated : a));
      }
    } catch {
      showToast('Erro ao analisar o currículo.', 'error');
    } finally {
      setAnalyzingAi(false);
    }
  };

  const handleDeleteApp = async () => {
    if (!selectedApp) return;
    if (!confirm('Tem certeza que deseja excluir esta candidatura?')) return;
    await applicationService.deleteApplication(selectedApp.id);
    setSelectedApp(null);
    loadApplications();
    showToast('Candidatura excluída.', 'success');
  };

  const handleDownloadCV = () => {
    if (!selectedApp?.cvUrl) return;
    const link = document.createElement('a');
    link.href = selectedApp.cvUrl;
    link.download = `Curriculo_${selectedApp.name.replace(/\s+/g, '_')}.pdf`;
    link.click();
  };

  const withCV = applications.filter(a => a.cvUrl).length;
  const withAnswers = applications.filter(a => a.answers?.length).length;

  if (loading) return <div className={styles.loading}><div className={styles.spinner} /><span>Carregando candidatos...</span></div>;

  return (
    <div className={styles.container}>

      {/* ── HEADER ── */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Voltar para Vagas
        </button>
        <div className={styles.headerMain}>
          <div>
            <h1 className={styles.title}>{job.title}</h1>
            <p className={styles.subtitle}>{job.location} · {job.area}</p>
          </div>
          <div className={styles.statsRow}>
            <div className={styles.statBadge}>
              <span className={styles.statNum}>{applications.length}</span>
              <span className={styles.statLabel}>Candidatos</span>
            </div>
            <div className={styles.statBadge}>
              <span className={styles.statNum}>{withCV}</span>
              <span className={styles.statLabel}>Com currículo</span>
            </div>
            <div className={styles.statBadge}>
              <span className={styles.statNum}>{withAnswers}</span>
              <span className={styles.statLabel}>Com triagem</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── GRID ── */}
      <div className={styles.contentGrid}>

        {/* LEFT — LIST */}
        <aside className={styles.listSection}>
          {applications.length === 0 ? (
            <div className={styles.emptyState}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              <p>Nenhum candidato ainda</p>
            </div>
          ) : (
            <ul className={styles.appList}>
              {applications.map(app => {
                const score = getTestScore(app);
                return (
                  <li
                    key={app.id}
                    className={`${styles.appItem} ${selectedApp?.id === app.id ? styles.selected : ''}`}
                    onClick={() => handleSelectApp(app)}
                  >
                    <div className={styles.appAvatar}>{app.name.charAt(0).toUpperCase()}</div>
                    <div className={styles.appInfo}>
                      <strong className={styles.appName}>{app.name}</strong>
                      <span className={styles.appEmail}>{app.email}</span>
                      <div className={styles.appTags}>
                        {app.cvUrl && <span className={styles.tag}>📄 CV</span>}
                        {score && (
                          <span className={`${styles.tag} ${score.percentage >= 60 ? styles.tagGood : styles.tagBad}`}>
                            {score.percentage}% triagem
                          </span>
                        )}
                        {app.aiAnalysis && <span className={`${styles.tag} ${styles.tagAi}`}>✦ IA avaliado</span>}
                      </div>
                    </div>
                    <span className={styles.appDate}>{new Date(app.createdAt).toLocaleDateString('pt-BR')}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>

        {/* RIGHT — DETAIL */}
        <main className={styles.detailsSection}>
          {!selectedApp ? (
            <div className={styles.emptyDetails}>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="1.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <p>Selecione um candidato para ver os detalhes</p>
            </div>
          ) : (
            <div className={styles.detailsCard}>

              {/* Candidate header */}
              <div className={styles.candidateHeader}>
                <div className={styles.candidateAvatar}>{selectedApp.name.charAt(0).toUpperCase()}</div>
                <div className={styles.candidateMeta}>
                  <h2 className={styles.candidateName}>{selectedApp.name}</h2>
                  <a href={`mailto:${selectedApp.email}`} className={styles.candidateEmail}>{selectedApp.email}</a>
                </div>
                <button className={styles.deleteBtn} onClick={handleDeleteApp} title="Excluir candidatura">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  Excluir
                </button>
              </div>

              {/* Tabs */}
              <div className={styles.tabs}>
                <button className={`${styles.tab} ${activeTab === 'info' ? styles.tabActive : ''}`} onClick={() => setActiveTab('info')}>Dados</button>
                {selectedApp.cvUrl && (
                  <button className={`${styles.tab} ${activeTab === 'cv' ? styles.tabActive : ''}`} onClick={() => setActiveTab('cv')}>Currículo</button>
                )}
                {selectedApp.answers && selectedApp.answers.length > 0 && (
                  <button className={`${styles.tab} ${activeTab === 'answers' ? styles.tabActive : ''}`} onClick={() => setActiveTab('answers')}>
                    Triagem {(() => { const s = getTestScore(selectedApp); return s ? `· ${s.percentage}%` : ''; })()}
                  </button>
                )}
              </div>

              {/* TAB: INFO */}
              {activeTab === 'info' && (
                <div className={styles.tabContent}>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <label>Telefone</label>
                      <p>{selectedApp.phone}</p>
                    </div>
                    <div className={styles.infoItem}>
                      <label>CPF</label>
                      <p>{selectedApp.cpf}</p>
                    </div>
                    <div className={styles.infoItem}>
                      <label>LinkedIn</label>
                      <p>{selectedApp.linkedin
                        ? <a href={selectedApp.linkedin} target="_blank" rel="noopener noreferrer">Ver perfil →</a>
                        : 'Não informado'}
                      </p>
                    </div>
                    <div className={styles.infoItem}>
                      <label>Candidatura em</label>
                      <p>{new Date(selectedApp.createdAt).toLocaleString('pt-BR')}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: CV */}
              {activeTab === 'cv' && selectedApp.cvUrl && (
                <div className={styles.tabContent}>
                  <div className={styles.cvActions}>
                    <button className={styles.downloadBtn} onClick={handleDownloadCV}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      Baixar PDF
                    </button>
                    <button
                      className={`${styles.aiBtn} ${selectedApp.aiAnalysis ? styles.aiBtnDone : ''}`}
                      onClick={handleAnalyzeCV}
                      disabled={analyzingAi || !!selectedApp.aiAnalysis}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                      {selectedApp.aiAnalysis ? '✦ Já avaliado pela IA' : analyzingAi ? 'Analisando...' : 'Analisar com IA'}
                    </button>
                  </div>

                  {/* PDF viewer */}
                  <div className={styles.pdfViewer}>
                    <iframe
                      src={selectedApp.cvUrl}
                      title={`Currículo de ${selectedApp.name}`}
                      className={styles.pdfFrame}
                    />
                  </div>

                  {/* AI Analysis */}
                  {aiAnalysis && (
                    <div className={styles.aiCard}>
                      <div className={styles.aiCardHeader}>
                        <span className={styles.aiCardTitle}>✦ Avaliação da IA</span>
                        <span className={`${styles.aiScore} ${aiAnalysis.score >= 70 ? styles.scoreGood : aiAnalysis.score >= 50 ? styles.scoreMid : styles.scoreBad}`}>
                          {aiAnalysis.score}/100
                        </span>
                      </div>
                      <p className={styles.aiEvaluation}>{aiAnalysis.evaluation}</p>
                      <div className={styles.aiRecommendation}>
                        <strong>Recomendação:</strong> {aiAnalysis.recommendation}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: ANSWERS */}
              {activeTab === 'answers' && selectedApp.answers && selectedApp.answers.length > 0 && (
                <div className={styles.tabContent}>
                  {(() => {
                    const score = getTestScore(selectedApp);
                    return score && (
                      <div className={`${styles.scoreSummary} ${score.percentage >= 60 ? styles.scoreSummaryGood : styles.scoreSummaryBad}`}>
                        <div className={styles.scoreCircle}>
                          <span className={styles.scoreNum}>{score.percentage}%</span>
                          <span className={styles.scoreSub}>acerto</span>
                        </div>
                        <div>
                          <p className={styles.scoreGrade}>{score.grade}</p>
                          <p className={styles.scoreDetail}>{score.correct} de {score.total} questões corretas</p>
                        </div>
                      </div>
                    );
                  })()}

                  {selectedApp.proctoring && (
                    <div className={`${styles.proctoringAlert} ${selectedApp.proctoring.flagged ? styles.flagged : ''}`}>
                      <strong>{selectedApp.proctoring.flagged ? '⚠️ Comportamento suspeito detectado' : '✓ Monitoramento sem ocorrências'}</strong>
                      <div className={styles.proctoringStats}>
                        <span>Trocas de aba: {selectedApp.proctoring.tabSwitchCount}</span>
                        <span>Tentativas de cola: {selectedApp.proctoring.pasteAttemptCount}</span>
                        <span>Tempo total: {Math.round(selectedApp.proctoring.totalTimeMs / 1000)}s</span>
                      </div>
                    </div>
                  )}

                  <div className={styles.answersList}>
                    {selectedApp.answers.map((ans, idx) => {
                      const question = job.screeningQuestions?.find(q => q.id === ans.questionId);
                      if (!question) return null;
                      const isCorrect = ans.selectedOptionIndex === question.correctOptionIndex;
                      return (
                        <div key={ans.questionId} className={`${styles.answerBlock} ${isCorrect ? styles.answerCorrect : styles.answerWrong}`}>
                          <p className={styles.questionText}><strong>{idx + 1}.</strong> {question.text}</p>
                          <p className={styles.answerText}>
                            <span className={styles.answerMark}>{isCorrect ? '✓' : '✗'}</span>
                            {question.options[ans.selectedOptionIndex] || 'Não respondida'}
                          </p>
                          {!isCorrect && (
                            <p className={styles.correctAnswer}>Correta: {question.options[question.correctOptionIndex]}</p>
                          )}
                          <span className={styles.timeSpent}>{Math.round(ans.timeSpentMs / 1000)}s nesta questão</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
