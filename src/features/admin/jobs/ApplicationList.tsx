"use client";

import { useEffect, useState } from 'react';
import { Job } from '@/features/jobs/types/job';
import { Application } from '@/features/jobs/types/application';
import { applicationService } from '@/features/jobs/services/applicationService';
import { AdminButton } from '@/features/admin/components/ui/AdminButton';
import styles from './ApplicationList.module.css';

interface ApplicationListProps {
  job: Job;
  onBack: () => void;
}

export function ApplicationList({ job, onBack }: ApplicationListProps) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  
  const [aiAnalysis, setAiAnalysis] = useState<{ score: number, evaluation: string, recommendation: string } | null>(null);
  const [analyzingAi, setAnalyzingAi] = useState(false);

  useEffect(() => {
    loadApplications();
  }, [job]);

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
    
    let grade = 'Ruim candidato';
    if (percentage >= 80) grade = 'Excelente candidato';
    else if (percentage >= 60) grade = 'Bom candidato';
    else if (percentage >= 40) grade = 'Candidato regular';

    return { correct, total, percentage, grade };
  };

  const handleAnalyzeCV = async () => {
    if (!selectedApp || !selectedApp.cvUrl) return;
    
    // If we already have the analysis for this specific applicant on the object, just use it
    if (selectedApp.aiAnalysis) {
      setAiAnalysis(selectedApp.aiAnalysis);
      return;
    }
    
    setAnalyzingAi(true);
    try {
      const res = await fetch('/api/analyze-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cvBase64: selectedApp.cvUrl,
          jobTitle: job.title,
          jobDescription: job.description,
          candidateName: selectedApp.name
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro na análise');
      
      setAiAnalysis(data);
      
      // Save the analysis result back into the application
      const updatedApp = await applicationService.updateApplication(selectedApp.id, { aiAnalysis: data });
      if (updatedApp) {
         setSelectedApp(updatedApp);
         setApplications(prev => prev.map(a => a.id === updatedApp.id ? updatedApp : a));
      }
    } catch (error) {
      console.error(error);
      alert('Houve um erro ao analisar o currículo.');
    } finally {
      setAnalyzingAi(false);
    }
  };

  const handleDeleteApp = async () => {
    if (!selectedApp) return;
    if (confirm('Tem certeza que deseja excluir esta candidatura?')) {
      await applicationService.deleteApplication(selectedApp.id);
      setSelectedApp(null);
      loadApplications();
    }
  };

  if (loading) return <div className={styles.loading}>Carregando candidatos...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <button className={styles.backButton} onClick={onBack}>
            ← Voltar para Vagas
          </button>
          <h1>Candidatos: {job.title}</h1>
          <p className={styles.subtitle}>
            {applications.length} {applications.length === 1 ? 'candidato' : 'candidatos'} para esta vaga.
          </p>
        </div>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.listSection}>
          {applications.length === 0 ? (
            <div className={styles.emptyState}>Nenhum candidato ainda.</div>
          ) : (
            <ul className={styles.appList}>
              {applications.map((app) => (
                <li 
                  key={app.id} 
                  className={`${styles.appItem} ${selectedApp?.id === app.id ? styles.selected : ''}`}
                  onClick={() => handleSelectApp(app)}
                >
                  <div className={styles.appHeader}>
                    <strong>{app.name}</strong>
                    <span className={styles.date}>
                      {new Date(app.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className={styles.appMeta}>{app.email}</div>
                  {app.answers && app.answers.length > 0 && (
                     <div className={styles.appBadge}>Questionário Respondido</div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.detailsSection}>
          {selectedApp ? (
            <div className={styles.detailsCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                <h2 style={{ margin: 0, borderBottom: 'none', paddingBottom: 0 }}>Detalhes do Candidato</h2>
                <button 
                  onClick={handleDeleteApp}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.35rem',
                    background: 'none', border: 'none', color: '#e31c23',
                    cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  Excluir
                </button>
              </div>
              
              <div className={styles.detailGroup}>
                <label>Nome:</label>
                <p>{selectedApp.name}</p>
              </div>
              <div className={styles.detailGrid}>
                <div className={styles.detailGroup}>
                  <label>E-mail:</label>
                  <p><a href={`mailto:${selectedApp.email}`}>{selectedApp.email}</a></p>
                </div>
                <div className={styles.detailGroup}>
                  <label>Telefone:</label>
                  <p>{selectedApp.phone}</p>
                </div>
                <div className={styles.detailGroup}>
                  <label>CPF:</label>
                  <p>{selectedApp.cpf}</p>
                </div>
                <div className={styles.detailGroup}>
                  <label>LinkedIn:</label>
                  <p>
                    {selectedApp.linkedin ? (
                      <a href={selectedApp.linkedin} target="_blank" rel="noopener noreferrer">
                        Acessar Perfil
                      </a>
                    ) : 'Não informado'}
                  </p>
                </div>
              </div>

              {selectedApp.cvUrl && (
                <div className={styles.detailGroup} style={{ marginTop: '1.5rem' }}>
                  <label>Currículo (Anexo):</label>
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <a 
                      href={selectedApp.cvUrl} 
                      download={`Curriculo_${selectedApp.name.replace(/\s+/g, '_')}`}
                      className={styles.downloadBtn}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Baixar Currículo
                    </a>
                    
                    <button 
                      className={styles.aiButton} 
                      onClick={handleAnalyzeCV}
                      disabled={analyzingAi || !!selectedApp.aiAnalysis}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                      </svg>
                      {selectedApp.aiAnalysis ? 'Currículo já Avaliado' : analyzingAi ? 'Analisando CV...' : 'Avaliar Currículo com IA'}
                    </button>
                  </div>
                  
                  {aiAnalysis && (
                    <div className={styles.aiAnalysisCard}>
                      <div className={styles.aiAnalysisHeader}>
                        <h4>Avaliação da IA</h4>
                        <span className={`${styles.aiScore} ${aiAnalysis.score >= 70 ? styles.scoreGood : styles.scoreBad}`}>
                          Nota: {aiAnalysis.score}/100
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

              {selectedApp.answers && selectedApp.answers.length > 0 && (
                <div className={styles.answersSection}>
                  <div className={styles.answersHeader}>
                    <h3>Respostas do Questionário</h3>
                    {(() => {
                      const score = getTestScore(selectedApp);
                      if (!score) return null;
                      return (
                        <div className={styles.testScoreBadge}>
                          <span className={styles.testPercentage}>{score.percentage}% de acerto</span>
                          <span className={styles.testDetails}>({score.correct} de {score.total})</span>
                          <span className={`${styles.testGrade} ${score.percentage >= 60 ? styles.gradeGood : styles.gradeBad}`}>
                            - {score.grade}
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                  
                  {selectedApp.proctoring && (
                    <div className={`${styles.proctoringAlert} ${selectedApp.proctoring.flagged ? styles.flagged : ''}`}>
                      <strong>Status de Monitoramento:</strong>
                      <ul style={{ margin: '0.5rem 0 0 1.5rem', fontSize: '0.9rem' }}>
                         <li>Trocas de aba: {selectedApp.proctoring.tabSwitchCount}</li>
                         <li>Tentativas de cola/paste: {selectedApp.proctoring.pasteAttemptCount}</li>
                         <li>Tempo total: {Math.round(selectedApp.proctoring.totalTimeMs / 1000)}s</li>
                      </ul>
                      {selectedApp.proctoring.flagged && (
                        <p style={{ marginTop: '0.5rem', color: '#d32f2f', fontWeight: 'bold' }}>
                          ⚠️ Candidato sinalizado por comportamento suspeito.
                        </p>
                      )}
                    </div>
                  )}

                  {selectedApp.answers.map((ans, idx) => {
                    const question = job.screeningQuestions?.find(q => q.id === ans.questionId);
                    if (!question) return null;
                    
                    const selectedText = question.options[ans.selectedOptionIndex] || 'Não respondida';
                    const isCorrect = ans.selectedOptionIndex === question.correctOptionIndex;

                    return (
                      <div key={ans.questionId} className={styles.answerBlock}>
                        <p className={styles.questionText}>
                          <strong>{idx + 1}.</strong> {question.text}
                        </p>
                        <p className={`${styles.answerText} ${isCorrect ? styles.correct : styles.incorrect}`}>
                          {selectedText}
                          <span className={styles.badge}>{isCorrect ? '✓' : '✗'}</span>
                        </p>
                        {!isCorrect && question.correctOptionIndex !== undefined && (
                          <p className={styles.correctAnswerText}>
                            Esperado: {question.options[question.correctOptionIndex]}
                          </p>
                        )}
                        <span className={styles.timeSpent}>
                           Tempo na questão: {Math.round(ans.timeSpentMs / 1000)}s
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className={styles.emptyDetails}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <p>Selecione um candidato para ver os detalhes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
