export interface QuestionAnswer {
  questionId: string;
  selectedOptionIndex: number;
  timeSpentMs: number;
}

export interface ProctoringData {
  tabSwitchCount: number;
  pasteAttemptCount: number;
  totalTimeMs: number;
  flagged: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  linkedin?: string;
  cvFile?: File;
  cvUrl?: string;
  answers?: QuestionAnswer[];
  proctoring?: ProctoringData;
  createdAt: string;
  aiAnalysis?: {
    score: number;
    evaluation: string;
    recommendation: string;
  };
}
