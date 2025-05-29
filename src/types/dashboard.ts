export interface DashboardStatsResponse {
  message: string;
  statistics: {
    totalJobs: JobStats;
    totalWorkers: WorkerStats;
    totalBusiness: BusinessStats;
    applications: ApplicationStats;
    jobMetrics: JobMetrics;
  };
}

interface JobStats {
  count: number;
  blocked: number;
  open: number;
  closed: number;
  inProgress: number;
  completed: number;
}

interface WorkerStats {
  count: number;
  blocked: number;
  activeLastMonth: number;
}

interface BusinessStats {
  count: number;
  blocked: number;
  activeLastMonth: number;
}

interface ApplicationStats {
  total: number;
  accepted: number;
  acceptanceRate: string;
}

interface JobMetrics {
  completionRate: string;
  openRate: string;
  blockRate: string;
}
