export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface Author {
  id: number;
  name: string;
  avatar?: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Like {
  id: number;
  userId: number;
  lpId: number;
}

export interface Lp {
  id: number;
  title: string;
  content: string;
  thumbnail?: string;
  published: boolean;
  authorId: number;
  author?: Author;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  likes: Like[];
}

export interface LpListData {
  data: Lp[];
  nextCursor: number | null;
  hasNext: boolean;
}

export interface Comment {
  id: number;
  content: string;
  lpId: number;
  userId: number;
  user?: Author;
  createdAt: string;
  updatedAt: string;
}

export interface CommentListData {
  data: Comment[];
  nextCursor: number | null;
  hasNext: boolean;
}

export interface SignupFormData {
  email: string;
  password: string;
  name: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}
