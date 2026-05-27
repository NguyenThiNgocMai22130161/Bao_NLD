import apiClient from './axios.client';

import { ApiResponse, Comment, CommentRequest } from '@/types';

export const commentService = {
  getCommentsByPost: async (postId: string) => {
    // API: GET /api/posts/{postId}/comments
    const response = await apiClient.get<ApiResponse<Comment[]>>(
      `/posts/${postId}/comments`
    );

    return response.data;
  },

  //Login required -> Token required
  createComment: async (postId: string, req: CommentRequest) => {
    const response = await apiClient.post<ApiResponse<Comment>>(
      `/posts/${postId}/comments`,
      req
    );

    return response.data;
  },
};
