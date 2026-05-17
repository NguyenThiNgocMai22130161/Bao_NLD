import apiClient from "./axios.client";

import { ApiResponse, PageData, Post, PostDetail, PostFilter } from "@/types";

export const postService = {
  getPosts: async (filter: PostFilter) => {
    const response = await apiClient.post<ApiResponse<PageData<Post>>>(
      "/posts",
      filter,
    );

    console.log(response);

    return response.data;
  },

  getPostDetail: async (slug: string) => {
    const response = await apiClient.get<ApiResponse<PostDetail>>(
      `/posts/${slug}`,
    );

    return response.data;
  },
};
