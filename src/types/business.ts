export type OnboardingStepBusinessProfileB = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export interface TUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  defaultProfile: string;
}

export interface TBusinessProfile {
  companyName?: string | null;
  description?: string | null;
  industry?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  website?: string | null;
  employeeCount?: number | null;
  yearFounded?: number | null;
  phoneNumber?: string | null;
  totalJobs?: number;
  logoUrl?: string | null;
  onboardingStep?: OnboardingStepBusinessProfileB;
}

export interface TJob {
  id: string;
  title: string;
  description: string;
  requirements: string;
  employmentType: string;
  numberOfPositions: number;
  budget: number;
  hourlyRateMin: number;
  hourlyRateMax: number;
  status: string;
}

export interface TBusinessProfileResponse {
  id: string;
  companyName: string | null;
  description: string | null;
  industry: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  website: string | null;
  employeeCount: number | null;
  yearFounded: number | null;
  phoneNumber: string | null;
  createdAt: string;
  updatedAt: string;
  isBlocked: boolean;
  user: TUser;
  _count: {
    jobs: number;
  };
  totalJobs: number;
}

export interface TBusinessDetails {
  jobs: TJob[];
  user: TUser;
  companyName?: string | null;
  description?: string | null;
  industry?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  website?: string | null;
  employeeCount?: number | null;
  yearFounded?: number | null;
  phoneNumber?: string | null;
  totalJobs?: number;
  logoUrl?: string | null;
  createdAt: Date;
}

export interface BusinessListResponse {
  pagination: {
    totalCount: number;
    totalPages: number;
    currentPage: string;
    hasMore: boolean;
  };
  businesses: TBusinessProfileResponse[];
}