import apiClient from './axios.client';

import { ApiResponse, Post, UpdateProfileRequest } from '@/types';

export const userService = {
  toggleSavePost: async (slug: string) => {
    const res = await apiClient.post<ApiResponse<void>>(
      `/api/users/saved-posts/${slug}`
    );

    return res.data;
  },
  getSavedPosts: async () => {
    const res = apiClient.get<ApiResponse<Post[]>>('/api/users/saved-posts');

    return (await res).data;
  },
  getHistory: async (): Promise<ApiResponse<Post[]>> => {
    const response =
      await apiClient.get<ApiResponse<Post[]>>('/api/users/history');

    return response.data;
  },
  getMyComments: async () => {
    const response = await apiClient.get('/api/users/comments');

    return response.data;
  },

  getMe: async () => {
    const res = await apiClient.get('/api/users/get-me');

    return res.data;
  },

  updateProfile: async (data: UpdateProfileRequest) => {
    const res = await apiClient.put('/api/users/profile', data);

    return res.data;
  },
};
