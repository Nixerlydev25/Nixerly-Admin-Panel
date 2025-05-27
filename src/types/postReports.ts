export type PaginatedPostReportsResponse = {
    data: {
      reporter: string;
      reportedPost: string;
      reason: string;
      status: string;
      option: string;
      createdDate: string;
      reportId: string;
    }[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    hasMore: boolean;
  };

  interface ImageDetails {
  id: string;
  url: string;
  hasSensitiveContent?: boolean;
  hasExplicitContent?: boolean;
}

export interface OriginalPost {
  id: string;
  title: string;
  caption: string;
  city: string;
  state: string;
  country: string;
  createdAt: string;
  updatedAt?: string;
  images: ImageDetails[];
  tags: string[];
  numberOfLikes: number;
  numberOfComments: number;
  isBlocked: boolean;
  phone_number: string;
  user: {
    id: string;
    username: string;
    email: string;
    isSuspended: boolean;
    role: string;
  };
  sensitiveMeta?: {
    id: string;
    keywords: string;
  };
}

export interface ReportDetails {
  id: string;
  reason: string;
  option: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  images: ImageDetails[];
  reporter: {
    id: string;
    username: string;
    email: string;
    isSuspended: boolean;
    role: string;
  };
}

export interface ReportResponse {
  message: string;
  reportDetails: {
    reportId: string;
    originalPost: OriginalPost;
    reportDetails: ReportDetails;
  };
}
