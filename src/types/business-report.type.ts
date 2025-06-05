import { TUser } from './business';

// User type
export interface User {
  firstName?: string;
  lastName?: string;
  email: string;
  createdAt: string;
  isVerified?: boolean;
}

// Skill type
export interface Skill {
  id: string;
  workerId: string;
  skillName: string;
  createdAt: string;
}

// Job type
export interface Job {
  title: string;
  status: string;
  createdAt: string;
}

// Worker Profile type
export interface WorkerProfile {
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
  onboardingStep: string;
  isBlocked: boolean;
  lastActive: string;
  user: User;
  skills: Skill[];
}

// Business Profile type
export interface BusinessProfile {
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
  onboardingStep: string;
  createdAt: string;
  updatedAt: string;
  isBlocked: boolean;
  lastActive: string;
  user: User;
  jobs: Job[];
}

// Business Report type
export interface BusinessReport {
  id: string;
  reportedBusinessId: string;
  reporterWorkerId: string;
  reason: string;
  description: string;
  status: 'PENDING' | 'RESOLVED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
  reportedBusiness: BusinessProfile;
  reporterWorker: WorkerProfile;
}

// Business Report Response type
export interface BusinessReportResponse {
  success: boolean;
  message: string;
  data: BusinessReport;
}

// Business Report List Response type
export interface BusinessReportListResponse {
  reports: BusinessReport[];
  pagination: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    hasMore: boolean;
  };
}
