// Define the user type
export type User = {
  username: string;
  email: string;
  isSuspended: boolean;
  canCreatePost: boolean;
  canComment: boolean;
};

export type PaginatedUserResponse = {
  data: {
    id: string;
    username: string;
    email: string;
    isSuspended: boolean;
    isVerified: boolean;
    created_at: string;
    updated_at: string;
    firstTimeLogin: boolean;
    role: string;
    age: number;
    isDeleted: boolean;
    reportedUsers: {
      id: string;
      reason: string;
      status: string;
    }[];
    canCreatePost: boolean;
    canComment: boolean;
    notificationsReceived: {
      id: string;
      type: string;
      content: string;
      isRead: boolean;
      createdAt: string;
    }[];
    restrictions?: {
      post: boolean;
      comment: boolean;
    };
    status?: string;
  }[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
};
