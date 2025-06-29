export interface WorkerReportBusiness {
  id: string;
  userId: string;
  companyName: string;
  description: string;
  industry: string;
  phoneNumber: string | null;
  city: string;
  state: string;
  country: string;
  website: string | null;
  employeeCount: number;
  yearFounded: number;
  totalSpent: number;
  postedJobs: number;
  onboardingStep: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
  isBlocked: boolean;
  lastActive: string;
}

export interface WorkerReportTarget {
  id: string;
  userId: string;
  title: string;
  phoneNumber: string;
  description: string;
  city: string;
  state: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  hourlyRate: number;
  availability: boolean;
  totalEarnings: number;
  completedJobs: number;
  avgRating: number;
  onboardingStep: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  isBlocked: boolean;
  lastActive: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface WorkerReport {
  id: string;
  reportedWorkerId: string;
  reporterBusinessId: string;
  reason: string;
  description: string;
  status: 'PENDING' | 'RESOLVED' | 'REJECTED' | 'UNDER_REVIEW';
  createdAt: string;
  updatedAt: string;
  reportedWorker: {
    user: {
      firstName: string;
      lastName: string;
      email: string;
    }
  };
  reporterBusiness: {
    companyName: string;
    user: {
      email: string;
    }
  };
}

export interface WorkerReportPagination {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
}

export interface WorkerReportResponse {
  reports: WorkerReport[];
  pagination: WorkerReportPagination;
}
