export interface TJob {
  id: string;
  title: string;
  description: string;
  requirements: string;
  employmentType: string;
  numberOfPositions: number;
  budget?: number;
  hourlyRateMin?: number;
  hourlyRateMax?: number;
  salary?: number;
  status: string;
  isBlocked: boolean;
  applications: any[];
}



export interface JobListResponse {
  pagination: {
    totalCount: number;
    totalPages: number;
    currentPage: string;
    hasMore: boolean;
  };
  jobs: TJob[];
}
