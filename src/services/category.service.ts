import apiClient from './axios.client';

import { ApiListResponse, Category } from '@/types';

export const categoryService = {
  getAll: async () => {
    const res = await apiClient.get<ApiListResponse<Category>>('/categories');

    return res;
  },
};
