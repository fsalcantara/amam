export interface Application {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone: string;
  linkedin?: string;
  cvFile?: File; // For form handling
  cvUrl?: string; // For storage/display
  createdAt: string;
}
