import apiClient from './axios.client';

import { ApiResponse, Post } from '@/types';

export const userService = {
  toggleSavePost: async (slug: string) => {
    const res = await apiClient.post<ApiResponse<void>>(
      `/users/saved-posts/${slug}`
    );

    return res.data;
  },
  getSavedPosts: async () => {
    const res = apiClient.get<ApiResponse<Post[]>>('/users/saved-posts');

    return (await res).data;
  },
  getHistory: async (): Promise<ApiResponse<Post[]>> => {
    const response = await apiClient.get<ApiResponse<Post[]>>('/users/history');

    return response.data;
  },
  getMyComments: async () => {
    const response = await apiClient.get('/users/comments');

    return response.data;
  },
};
