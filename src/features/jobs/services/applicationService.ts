import { Application } from '../types/application';

export const applicationService = {
  getApplications: async (): Promise<Application[]> => {
    const res = await fetch('/api/applications');
    if (!res.ok) throw new Error('Falha ao buscar candidaturas');
    return res.json();
  },

  getApplicationsByJobId: async (jobId: string): Promise<Application[]> => {
    const all = await applicationService.getApplications();
    return all.filter(app => app.jobId === jobId);
  },

  countApplications: async (jobId: string): Promise<number> => {
    const apps = await applicationService.getApplicationsByJobId(jobId);
    return apps.length;
  },

  checkDuplicateCPF: async (jobId: string, cpf: string): Promise<boolean> => {
    const apps = await applicationService.getApplicationsByJobId(jobId);
    const normalizedCPF = cpf.replace(/\D/g, '');
    return apps.some(app => app.cpf?.replace(/\D/g, '') === normalizedCPF);
  },

  apply: async (application: Omit<Application, 'id' | 'createdAt'>): Promise<Application> => {
    // Read file as base64
    let cvBase64: string | undefined = undefined;
    if (application.cvFile) {
      cvBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(application.cvFile as File);
      });
    }

    const payload = { ...application, cvUrl: cvBase64 };

    // Envio para o Banco via API
    const res = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!res.ok) throw new Error('Falha ao salvar candidatura');
    const newApp = await res.json();

    // Envio de e-mail (Trabalhe Conosco) via API
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'job',
          ...application
        })
      });
    } catch (error) {
      console.error('Email notify error:', error);
    }

    return newApp;
  },

  deleteApplication: async (applicationId: string): Promise<boolean> => {
    const res = await fetch(`/api/applications/${applicationId}`, { method: 'DELETE' });
    return res.ok;
  },

  updateApplication: async (applicationId: string, updates: Partial<Application>): Promise<Application | null> => {
    const res = await fetch(`/api/applications/${applicationId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) return null;
    const current = await applicationService.getApplications();
    return current.find(a => a.id === applicationId) || null;
  }
};
