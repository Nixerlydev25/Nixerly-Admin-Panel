import { TUser } from './business';

export interface TWorkerProfile {
  id: string;
  userId: string;
  title: string;
  phoneNumber: string | null;
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
  user: TUser;
}

export interface TBusinessProfile {
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
  user: TUser;
}

export interface TBusinessReport {
  id: string;
  targetBusinessId: string;
  reporterWorkerId: string;
  reporterBusinessId: string | null;
  reason: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  reporterWorker: TWorkerProfile;
  reporterBusiness: TBusinessProfile | null;
  targetBusiness: TBusinessProfile;
}

export interface BusinessReportPagination {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
}

export interface BusinessReportResponse {
  reports: TBusinessReport[];
  pagination: BusinessReportPagination;
}
