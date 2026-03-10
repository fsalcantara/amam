export interface ScreeningQuestion {
  id: string;
  text: string;
  options: [string, string, string, string];
  correctOptionIndex?: number; // HR reference only, never shown to candidate
}

export interface Job {
  id: string;
  title: string;
  area: string; // 'admin', 'production', 'logistics', 'commercial'
  description: string;
  requirements: string[];
  location: string;
  isActive: boolean;
  createdAt: string;
  screeningQuestions?: ScreeningQuestion[];
}

export type JobArea = 'admin' | 'production' | 'logistics' | 'commercial';

export const JOB_AREAS: { id: JobArea; label: string }[] = [
  { id: 'admin', label: 'Administrativo' },
  { id: 'production', label: 'Produção' },
  { id: 'logistics', label: 'Logística' },
  { id: 'commercial', label: 'Comercial' },
];
