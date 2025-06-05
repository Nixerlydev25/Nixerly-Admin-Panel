import { JobReportUser } from './user.types';

export interface JobReportWorker {
  id: string;
  userId: string;
  title: string;
  phoneNumber?: string;
  description: string;
  city: string;
  state: string;
  country: string;
  hourlyRate: number;
  completedJobs: number;
  isBlocked: boolean;
  user: JobReportUser;
} 