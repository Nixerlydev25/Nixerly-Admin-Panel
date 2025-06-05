import { WorkerProfile } from './worker';

export interface TJob {
  id: string;
  title: string;
  description: string;
  requirements: string;
  employmentType: string;
  numberOfPositions: number;
  budget: number | null;
  hourlyRateMin: number;
  hourlyRateMax: number;
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
  businessProfile: {
    companyName: string;
    user: {
      email: string;
    };
  };
  skills: Array<{
    id: string;
    jobId: string;
    skillName: string;
    createdAt: string;
  }>;
  location: {
    id: string;
    jobId: string;
    street: string | null;
    city: string;
    state: string;
    country: string;
    postalCode: string | null;
    isRemote: boolean;
  };
}

export interface TWorker extends WorkerProfile {}

export interface TJobReport {
  id: string;
  reportedJobId: string;
  reporterWorkerId: string;
  reason: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  reportedJob: TJob;
  reporterWorker: TWorker;
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

// Extended types for the job report details page
export interface ExtendedWorkerProfile extends TWorker {}

export interface ExtendedJobReport extends TJobReport {
  category?: 'ILLEGAL' | 'SPAM' | 'INAPPROPRIATE' | 'MISLEADING_DESCRIPTION';
  reporterBusiness?: {
    companyName: string;
  };
}
