---
aliases : Frontend Data Models
time : 09-12-2025 02:12:54
---
```TypeScript

// src/types/index.ts
export enum UserRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  REPORTER = 'REPORTER',
  USER = 'USER',
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
  children?: Category[]; // List danh mục con (đệ quy)
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
  content?: string; // Backend có trả về trường này trong summary DTO [cite: 111]
  thumbnail: string;
  publishedAt: string; // LocalDateTime format: "2023-10-25T14:30:00"
  viewCount: number;
  isFeatured: boolean;
  author: string; // Backend trả về username (String), KHÔNG phải Object User
  category: Category;
  tags: Tag[];
}
export interface PostDetail extends Post {
  relatedPosts: Post[]; // Danh sách bài liên quan [cite: 109]
}
export interface PostFilter {
  pageNo?: number;       // Default: 1
  pageSize?: number;     // Default: 10
  categoriesSlug?: string[];
  tagsSlug?: string[];
  isFeatured?: boolean | null;
  type?: PostType;
  keyword?: string;      // Từ khóa tìm kiếm (Mới thêm)
}
export interface Comment {
  id: string;
  content: string;
  createdAt: string; // LocalDateTime ISO String
  user: string;      // Username (String)
  
  // Hai trường này chỉ có data khi gọi API "My Comments", API thường sẽ null
  postSlug?: string;  
  postTitle?: string;

  replies?: Comment[]; // List reply lồng nhau
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
export interface PageData<T> {
  currentPage: number;   // Backend dùng currentPage 
  totalElements: number;
  totalPages: number;
  items: T[];            // Danh sách phần tử của trang hiện tại
}
export type PaginatedApiResponse<T> = ApiResponse<PageData<T>>;

```