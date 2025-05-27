export type PaginatedPostResponse = {
  data: {
    id: string;
    title: string;
    author: {
      username: string;
      email: string;
      isVerified: boolean;
      role: string;
    };
    country: string;
    isSuspended: boolean;
    likes: number;
    numberOfReports: number;
    images: {
      id: string;
      hasSensitiveContent: boolean;
      hasExplicitContent: boolean;
    }[];
    sensitiveMeta: {
      field: string;
      keywords: string;
    }[];
    created_at: string;
  }[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
};

export interface Post {
  id: string;
  title: string;
  caption: string;
  phone_number: string | null;
  city: string;
  country: string;
  state: string;
  name: string;
  userId: string;
  email: string | null;
  username: string | null;
  likes: number;
  relatedKeywords: string[];
  created_at: string;
  isBlocked: boolean;
  user: {
    id: string;
    username: string;
    email: string;
  };
  images: {
    id: string;
    url: string;
    hasSensitiveContent: boolean;
    hasExplicitContent: boolean;
  }[];
  _count: {
    comments: number;
  };
  tags: {
    id: string;
    name: string;
  }[];
  sensitiveMeta: {
    field: string;
    keywords: string;
  }[];
  postReports: any[];
  notifications: any[];
  postLikes: {
    userId: string;
  }[];
}
