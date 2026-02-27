import { Job } from '../types/job';

let MOCKED_JOBS: Job[] = [
  {
    id: '1',
    title: 'Analista Financeiro',
    area: 'admin',
    description: 'Responsável por análise de fluxo de caixa e relatórios gerenciais.',
    requirements: ['Superior completo em Contabilidade ou Economia', 'Excel Avançado'],
    location: 'Matriz - Salvador/BA',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Auxiliar de Padaria',
    area: 'production',
    description: 'Auxiliar na produção de pães e massas.',
    requirements: ['Ensino fundamental completo', 'Disponibilidade de horário'],
    location: 'Fábrica - Lauro de Freitas/BA',
    isActive: true,
    createdAt: new Date().toISOString(),
  }
];

export const jobService = {
  getJobs: async (): Promise<Job[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...MOCKED_JOBS];
  },

  getJobById: async (id: string): Promise<Job | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCKED_JOBS.find(j => j.id === id);
  },

  createJob: async (job: Omit<Job, 'id' | 'createdAt'>): Promise<Job> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const newJob: Job = {
      ...job,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    MOCKED_JOBS.push(newJob);
    return newJob;
  },

  updateJob: async (id: string, updates: Partial<Job>): Promise<Job | null> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const index = MOCKED_JOBS.findIndex(j => j.id === id);
    if (index === -1) return null;
    
    MOCKED_JOBS[index] = { ...MOCKED_JOBS[index], ...updates };
    return MOCKED_JOBS[index];
  },

  deleteJob: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    MOCKED_JOBS = MOCKED_JOBS.filter(j => j.id !== id);
    return true;
  }
};
