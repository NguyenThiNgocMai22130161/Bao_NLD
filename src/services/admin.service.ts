import apiClient from './axios.client';

import {
  AdminPost,
  AdminPostUpdateRequest,
  AdminUser,
  AdminUserUpdateRequest,
  ApiPageResponse,
  ApiResponse,
} from '@/types';

export const adminService = {
  getUsers: async (page: number = 0, size: number = 100): Promise<ApiPageResponse<AdminUser>> => {
    const response = await apiClient.get<ApiPageResponse<AdminUser>>(
      `/api/admin/users?page=${page}&size=${size}&sortBy=createdAt&sortDirection=DESC`
    );

    return response.data;
  },

  updateUser: async (
    id: string,
    data: AdminUserUpdateRequest
  ): Promise<ApiResponse<AdminUser>> => {
    const response = await apiClient.patch<ApiResponse<AdminUser>>(
      `/api/admin/users/${id}`,
      data
    );

    return response.data;
  },

  deleteUser: async (id: string): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(
      `/api/admin/users/${id}`
    );

    return response.data;
  },

  getPosts: async (page: number = 0, size: number = 100): Promise<ApiPageResponse<AdminPost>> => {
    const response = await apiClient.get<ApiPageResponse<AdminPost>>(
      `/api/admin/posts?page=${page}&size=${size}&sortBy=createdAt&sortDirection=DESC`
    );

    return response.data;
  },

  updatePost: async (
    id: string,
    data: AdminPostUpdateRequest
  ): Promise<ApiResponse<AdminPost>> => {
    const response = await apiClient.patch<ApiResponse<AdminPost>>(
      `/api/admin/posts/${id}`,
      data
    );

    return response.data;
  },

  deletePost: async (id: string): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(
      `/api/admin/posts/${id}`
    );

    return response.data;
  },
};
