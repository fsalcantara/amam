import { Application } from '../types/application';

const STORAGE_KEY = 'amam_applications';

export const applicationService = {
  getApplications: async (): Promise<Application[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (typeof window === 'undefined') return [];
    
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  getApplicationsByJobId: async (jobId: string): Promise<Application[]> => {
    const all = await applicationService.getApplications();
    return all.filter(app => app.jobId === jobId);
  },

  countApplications: async (jobId: string): Promise<number> => {
    const apps = await applicationService.getApplicationsByJobId(jobId);
    return apps.length;
  },

  /**
   * Checks if a CPF has already been used to apply for a specific job.
   * Returns true if duplicate exists.
   */
  checkDuplicateCPF: async (jobId: string, cpf: string): Promise<boolean> => {
    const apps = await applicationService.getApplicationsByJobId(jobId);
    const normalizedCPF = cpf.replace(/\D/g, '');
    return apps.some(app => app.cpf?.replace(/\D/g, '') === normalizedCPF);
  },

  apply: async (application: Omit<Application, 'id' | 'createdAt'>): Promise<Application> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const apps = await applicationService.getApplications();
    
    // Read file as base64 to persist in localStorage
    let cvBase64: string | undefined = undefined;
    if (application.cvFile) {
      cvBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(application.cvFile as File);
      });
    }
    
    const newApp: Application = {
      ...application,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      cvUrl: cvBase64
    };

    // Remove file object before storing in localStorage so JSON.stringify doesn't fail
    const { cvFile, ...storedApp } = newApp;
    
    const updatedApps = [...apps, storedApp];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedApps));
    
    return newApp;
  },

  deleteApplication: async (applicationId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const apps = await applicationService.getApplications();
    const updatedApps = apps.filter(app => app.id !== applicationId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedApps));
    return true;
  },

  updateApplication: async (applicationId: string, updates: Partial<Application>): Promise<Application | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const apps = await applicationService.getApplications();
    const index = apps.findIndex(app => app.id === applicationId);
    if (index === -1) return null;
    
    apps[index] = { ...apps[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
    return apps[index];
  }
};
