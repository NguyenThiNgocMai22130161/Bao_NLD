import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export enum UserRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  REPORTER = 'REPORTER',
  USER = 'USER',
}
export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
}
export enum PostStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  PUBLISHED = 'PUBLISHED',
  REJECT = 'REJECT',
}
export enum PostType {
  STANDARD = 'STANDARD',
  VIDEO = 'VIDEO',
  GALLERY = 'GALLERY',
  MAGAZINE = 'MAGAZINE',
}
export interface AuthResponse {
  token: string;
  username: string;
  role: UserRole;
}
export interface Category {
  id: string;
  name: string;
  slug: string;
  position: number;
  children?: Category[];
}
export interface Tag {
  id: string;
  name: string;
  slug: string;
}
export interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content?: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: number;
  isFeatured: boolean;
  author: string;
  category: Category;
  tags: Tag[];
}
export interface PostDetail extends Post {
  relatedPosts: Post[];
}
export interface PostFilter {
  pageNo?: number;
  pageSize?: number;
  categoriesSlug?: string[];
  tagsSlug?: string[];
  isFeatured?: boolean | null;
  type?: PostType;
  keyword?: string;
}
export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: string;
  postSlug?: string;
  postTitle?: string;

  replies?: Comment[];
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}
export interface ApiListResponse<T> {
  status: number;
  message: string;
  data: T[];
}

export interface ApiPageResponse<T> {
  status: number;
  message: string;
  data: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface PageData<T> {
  currentPage: number;
  totalElements: number;
  totalPages: number;
  items: T[];
}

export interface CategoryDetailData {
  category: Category;
  posts: PageData<Post>;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface VerifyRequest {
  email: string;
  verificationCode: string;
}
export interface ForgotPasswordRequest {
  email: string;
}
export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}
export type PaginatedApiResponse<T> = ApiResponse<PageData<T>>;

export interface CommentRequest {
  content: string;
  parentId?: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateProfileRequest {
  username: string;
  email: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminPost {
  id: string;
  title: string;
  slug: string;
  status: PostStatus;
  isFeatured: boolean;
  type: PostType;
  author?: string | null;
  category?: string | null;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminUserUpdateRequest {
  role: UserRole;
  status: UserStatus;
}

export interface AdminPostUpdateRequest {
  status: PostStatus;
  isFeatured: boolean;
}
