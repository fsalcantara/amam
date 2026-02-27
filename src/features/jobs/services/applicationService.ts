import { Application } from '../types/application';

// Mock storage key
const STORAGE_KEY = 'amam_applications';

export const applicationService = {
  getApplications: async (): Promise<Application[]> => {
    // Simulate API delay
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

  apply: async (application: Omit<Application, 'id' | 'createdAt'>): Promise<Application> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const apps = await applicationService.getApplications();
    
    const newApp: Application = {
      ...application,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      // Mock CV upload - in real app this would return a URL from cloud storage
      cvUrl: application.cvFile ? URL.createObjectURL(application.cvFile) : undefined
    };

    // Remove file object before storing in localStorage (it can't verify/serialize File objects)
    const { cvFile, ...storedApp } = newApp;
    
    const updatedApps = [...apps, storedApp];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedApps));
    
    return newApp;
  }
};
