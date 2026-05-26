import axios from 'axios';

import { ApiResponse, Comment, CommentRequest } from '@/types';

const API_URL = 'http://localhost:8080/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('accessToken');

  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const commentService = {
  getCommentsByPost: async (postId: string) => {
    // API: GET /api/posts/{postId}/comments
    const response = await axios.get<ApiResponse<Comment[]>>(
      `${API_URL}/posts/${postId}/comments`
    );

    return response.data;
  },

  //Login required -> Token required
  createComment: async (postId: string, req: CommentRequest) => {
    const response = await axios.post<ApiResponse<Comment>>(
      `${API_URL}/posts/${postId}/comments`,
      req,
      { headers: getAuthHeader() }
    );

    return response.data;
  },
};
