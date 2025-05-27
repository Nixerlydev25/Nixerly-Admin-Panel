import { ReportStatus } from "./types";

export type PaginatedUserReportsResponse = {
  data: {
    reportId: string;
    reporter: string;
    reportedUser: string;
    reason: string;
    status: ReportStatus;
    option: string;
    createdDate: string;
    reportedUserId: string;
    isSuspended: boolean
  }[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
};
