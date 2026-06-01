import apiClient from './axios.client';

import { ApiResponse, PageData, Post, PostDetail, PostFilter } from '@/types';

export const postService = {
  getPosts: async (
    filter: PostFilter
  ): Promise<ApiResponse<PageData<Post>>> => {
    const response = await apiClient.post<ApiResponse<PageData<Post>>>(
      '/api/posts',
      filter
    );

    return response.data;
  },

  getPostDetail: async (slug: string): Promise<ApiResponse<PostDetail>> => {
    const response = await apiClient.get<ApiResponse<PostDetail>>(
      `/api/posts/${slug}`
    );

    return response.data;
  },
};
