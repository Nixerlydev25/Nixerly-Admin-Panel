export interface JobReportJob {
  id: string;
  title: string;
  description: string;
  requirements: string;
  employmentType: string;
  numberOfPositions: number;
  budget: number | null;
  hourlyRateMin: number;
  hourlyRateMax: number;
  status: string;
  jobType: string;
  startDate: string;
  numberOfWorkersRequired: number;
  isBlocked: boolean;
  businessProfile: {
    companyName: string;
    user: {
      email: string;
    };
  };
} 