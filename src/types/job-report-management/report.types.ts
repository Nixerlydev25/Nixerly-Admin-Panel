import { JobReportJob } from './job.types';
import { JobReportWorker } from './worker.types';

export enum ReportStatus {
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
}

export type ReportReason = 'ILLEGAL' | 'SPAM' | 'INAPPROPRIATE' | 'MISLEADING_DESCRIPTION';

export interface JobReport {
  id: string;
  reportedJobId: string;
  reporterWorkerId: string;
  reason: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  reportedJob: JobReportJob;
  reporterWorker: JobReportWorker;
} 