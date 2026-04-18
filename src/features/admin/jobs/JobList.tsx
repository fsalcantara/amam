"use client";

import { useEffect, useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import useSWR from 'swr';
import { Job, JOB_AREAS } from '@/features/jobs/types/job';
import { jobService } from '@/features/jobs/services/jobService';
import { AdminButton } from '@/features/admin/components/ui/AdminButton';
import { AdminSelect } from '@/features/admin/components/ui/AdminInput';
import { AdminToggle } from '@/features/admin/components/ui/AdminToggle';
import styles from './JobList.module.css';
import { applicationService } from '@/features/jobs/services/applicationService';
import { useDebounce } from '@/hooks/useDebounce';

const JobForm = dynamic(() => import('./JobForm').then(mod => mod.JobForm), {
  loading: () => <div className={styles.loading}>Carregando formulário...</div>
});

const ApplicationList = dynamic(() => import('./ApplicationList').then(mod => mod.ApplicationList), {
  loading: () => <div className={styles.loading}>Carregando currículos...</div>
});

export default function JobList() {
  const { data: jobs, error, mutate: mutateJobs } = useSWR<Job[]>('api/jobs', () => jobService.getJobs());
  const loading = !jobs && !error;

  const [isEditing, setIsEditing] = useState(false);
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const [viewingApplicationsJob, setViewingApplicationsJob] = useState<Job | null>(null);
  const [applicationCounts, setApplicationCounts] = useState<Record<string, number>>({});
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [areaFilter, setAreaFilter] = useState('');

  // Fetch application counts when jobs data is available
  useEffect(() => {
    async function fetchCounts() {
      if (!jobs) return;
      const counts: Record<string, number> = {};
      await Promise.all(jobs.map(async (job) => {
        counts[job.id] = await applicationService.countApplications(job.id);
      }));
      setApplicationCounts(counts);
    }
    fetchCounts();
  }, [jobs]);

  const filteredJobs = useMemo(() => 
    (jobs || []).filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchesArea = areaFilter ? job.area === areaFilter : true;
      return matchesSearch && matchesArea;
    }),
    [jobs, debouncedSearchTerm, areaFilter]
  );

  const getAreaLabel = useCallback((areaId: string) =>
    JOB_AREAS.find(a => a.id === areaId)?.label || areaId,
    []
  );

  const toTitleCase = (str: string) =>
    str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

  const handleCreate = () => {
    setCurrentJob(null);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEdit = (job: Job) => {
    setCurrentJob(job);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta vaga?')) {
      await jobService.deleteJob(id);
      mutateJobs();
    }
  };

  const handleSave = async (data: Partial<Job>) => {
    if (currentJob?.id || data.id) {
      await jobService.updateJob(currentJob?.id || data.id!, data);
    } else {
      await jobService.createJob(data as any);
    }
    setIsEditing(false);
    mutateJobs();
  };

  if (viewingApplicationsJob) {
    return (
      <ApplicationList 
        job={viewingApplicationsJob} 
        onBack={() => {
          setViewingApplicationsJob(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />
    );
  }

  if (isEditing) {
    return (
      <JobForm 
        initialData={currentJob} 
        onSubmit={handleSave} 
        onCancel={() => {
          setIsEditing(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />
    );
  }

  if (loading) return <div className={styles.loading}>Carregando vagas...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Gerenciar Vagas</h1>
          <p className={styles.subtitle}>Gerencie as oportunidades de carreira da Amam.</p>
        </div>
        <AdminButton onClick={handleCreate}>+ Nova Vaga</AdminButton>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <input 
            type="text" 
            placeholder="Buscar por cargo..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.filterBox}>
          <AdminSelect 
            value={areaFilter} 
            onChange={(value: string) => setAreaFilter(value)}
            options={[
              { label: 'Todas as Áreas', value: '' },
              ...JOB_AREAS.map(area => ({ label: area.label, value: area.id }))
            ]}
            placeholder="Filtrar por Área"
          />
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Cargo</th>
              <th>Área</th>
              <th>Local</th>
              <th>Currículos</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <tr key={job.id}>
                  <td className={styles.jobTitle}>{toTitleCase(job.title)}</td>
                  <td>
                    <span className={styles.areaTag}>{getAreaLabel(job.area)}</span>
                  </td>
                  <td>{job.location}</td>
                  <td>
                    <span style={{ 
                      backgroundColor: '#e3f2fd', 
                      color: '#1565c0', 
                      padding: '0.2rem 0.6rem', 
                      borderRadius: '12px', 
                      fontSize: '0.85rem', 
                      fontWeight: 600 
                    }}>
                      {applicationCounts[job.id] || 0}
                    </span>
                  </td>
                  <td>
                    <div onClick={(e) => e.stopPropagation()}>
                      <AdminToggle 
                        label={job.isActive ? 'Ativa' : 'Inativa'} 
                        checked={job.isActive}
                        onChange={(checked) => handleSave({...job, isActive: checked})}
                      />
                    </div>
                  </td>
                  <td className={styles.actions}>
                    <AdminButton
                      variant="primary"
                      className={styles.smBtn}
                      onClick={() => { setViewingApplicationsJob(job); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      disabled={!applicationCounts[job.id]}
                    >
                      Candidatos
                    </AdminButton>
                    <AdminButton variant="secondary" className={styles.smBtn} onClick={() => handleEdit(job)}>
                      Editar
                    </AdminButton>
                    <button className={styles.deleteIconBtn} title="Excluir" onClick={() => handleDelete(job.id)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className={styles.emptyState}>
                  Nenhuma vaga encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
