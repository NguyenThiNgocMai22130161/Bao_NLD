import apiClient from './axios.client';

import {
  AdminPost,
  AdminPostUpdateRequest,
  AdminUser,
  AdminUserUpdateRequest,
  ApiListResponse,
  ApiResponse,
} from '@/types';

export const adminService = {
  getUsers: async (): Promise<ApiListResponse<AdminUser>> => {
    const response = await apiClient.get<ApiListResponse<AdminUser>>(
      '/api/admin/users'
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

  getPosts: async (): Promise<ApiListResponse<AdminPost>> => {
    const response = await apiClient.get<ApiListResponse<AdminPost>>(
      '/api/admin/posts'
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
