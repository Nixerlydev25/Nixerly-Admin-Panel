import { WorkerProfile } from './worker';
import { TBusinessProfile } from './business';

export interface TJob {
  id: string;
  title: string;
  description: string;
  requirements: string;
  employmentType: string;
  numberOfPositions: number;
  budget: number;
  hourlyRateMin: number | null;
  hourlyRateMax: number | null;
  salary: number | null;
  businessProfileId: string;
  status: string;
  jobType: string;
  startDate: string;
  numberOfWorkersRequired: number;
  createdAt: string;
  updatedAt: string;
  expiresAt: string | null;
  isBlocked: boolean;
}

export interface TJobReport {
  id: string;
  targetJobId: string;
  reporterWorkerId: string;
  reporterBusinessId: string | null;
  reason: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  reporterWorker: WorkerProfile;
  reporterBusiness: TBusinessProfile | null;
  job: TJob;
}

export interface JobReportPagination {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
}

export interface JobReportResponse {
  reports: TJobReport[];
  pagination: JobReportPagination;
}
