import apiClient from './axios.client';

import { ApiListResponse, ApiResponse, Category, CategoryDetailData } from '@/types';

export const categoryService = {
  getAll: async () => {
    const res = await apiClient.get<ApiListResponse<Category>>('/api/categories');

    return res;
  },

  getBySlug: async (slug: string) => {
    const res = await apiClient.get<ApiResponse<Category>>(`/api/categories/${slug}`);

    return res;
  },

  getDetail: async (slug: string, page = 1, size = 10) => {
    const res = await apiClient.get<ApiResponse<CategoryDetailData>>(
      `/api/categories/${slug}/detail`,
      {
        params: { page, size },
      }
    );

    return res;
  },
};
