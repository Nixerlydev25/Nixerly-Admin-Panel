import { TUser } from './business';

export interface WorkerUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'WORKER';
  workerProfile: WorkerProfile;
}

export interface WorkerExperience {
  id: string;
  title: string;
  company: string;
  description: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  city: string;
  state: string;
  country: string;
}

export interface WorkerEducation {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  description: string;
  startDate: string;
  endDate: string;
  currentlyStudying: boolean;
  city: string;
  state: string;
  country: string;
}

export interface WorkerLanguage {
  id: string;
  language: string;
  proficiency: string;
}

export interface WorkerProfile {
  id: string;
  userId: string;
  title: string;
  phoneNumber?: string;
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
  user: {
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
  };
  skills: Array<{
    id: string;
    workerId: string;
    skillName: string;
    createdAt: string;
  }>;
  experience: Array<{
    id: string;
    workerId: string;
    title: string;
    company: string;
    country: string;
    city: string;
    state: string;
    startDate: string;
    endDate: string | null;
    currentlyWorking: boolean;
    description: string;
  }>;
}

export interface WorkerProfileResponse {
  id: string;
  userId: string;
  title: string;
  description: string;
  hourlyRate: number;
  availability: boolean;
  city: string;
  state: string;
  country: string;
  totalEarnings: number;
  completedJobs: number;
  avgRating: number;
  onboardingStep: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  skills: string[];
  experience: WorkerExperience[];
  education: WorkerEducation[];
  languages: WorkerLanguage[];
  isBlocked: boolean;
  user: {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
    isVerified: boolean;
    isDeleted: boolean;
    isSuspended: boolean;
    role: 'WORKER';
    provider: string;
    defaultProfile: string;
    firstTimeLogin: boolean;
  };
}

export interface WorkerListResponse {
  data: WorkerProfileResponse[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
  filters: {
    applied: Record<string, unknown>;
  };
}
