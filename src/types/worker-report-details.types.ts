export interface WorkerReportDetailsSkill {
  id: string;
  workerId: string;
  skillName: string;
  createdAt: string;
}

export interface WorkerReportDetailsExperience {
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
}

export interface WorkerReportDetailsLanguage {
  id: string;
  workerId: string;
  language: string;
  proficiency: string;
}

export interface WorkerReportDetailsUser {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  isVerified: boolean;
}

export interface WorkerReportDetailsWorker {
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
  user: WorkerReportDetailsUser;
  skills: WorkerReportDetailsSkill[];
  experience: WorkerReportDetailsExperience[];
  education: any[];
  languages: WorkerReportDetailsLanguage[];
  profilePicture: string | null;
}

export interface WorkerReportDetailsBusiness {
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
  user: {
    email: string;
    createdAt: string;
    isVerified: boolean;
  };
}

export interface WorkerReportDetails {
  id: string;
  reportedWorkerId: string;
  reporterBusinessId: string;
  reason: string;
  description: string;
  status: 'PENDING' | 'RESOLVED' | 'REJECTED' | 'UNDER_REVIEW';
  createdAt: string;
  updatedAt: string;
  reportedWorker: WorkerReportDetailsWorker;
  reporterBusiness: WorkerReportDetailsBusiness;
}

export interface WorkerReportDetailsResponse {
  success: boolean;
  message: string;
  data: WorkerReportDetails;
} 