# Hướng dẫn dùng axios gọi api
- Đối với từng domain ví dụ như post, user, auth...khi cần call api, ta sẽ định nghĩa nó thành các method và đặt trong thư mục `/src/service`
- Ví dụ: `post.service.ts`

```TypeScript
import apiClient from "./axios.client";
import { ApiResponse, PageData, Post, PostDetail, PostFilter } from "@/types";

export const postService = {
  getPosts: async (filter: PostFilter) => {
    const response = await apiClient.post<ApiResponse<PageData<Post>>>(
      "/posts", //enpoint của api
      filter, //body của api
    );

    return response.data;
  },

  getPostDetail: async (slug: string) => {
    const response = await apiClient.get<ApiResponse<PostDetail>>(
      `/posts/${slug}`,
    );

    return response.data;
  },
};
```
- `apiClient.get` hoặc `.post`, đó là method của http

- Sau khi định nghĩa được method rồi, sau đây là ví dụ sử dụng:
```TypeScript
import { useEffect, useState } from 'react';
import { postService } from '@/services/post.service';
import { PostSummary } from '@/types/post.types';

const HomePage = () => {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Gọi API qua service, không gọi axios trực tiếp
        const res = await postService.getPosts({
          pageNo: 1,
          pageSize: 10,
          isFeatured: null, // Lấy tất cả
          type: 'STANDARD'
        });
        
        // Backend trả về: data -> data -> items
        // Cần chú ý cấu trúc res.data.data.items tùy vào axios client setup
        if(res.data) {
             setPosts(res.data.items);
        }
      } catch (error) {
        console.error("Lỗi lấy bài viết:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
           <img src={post.thumbnail} alt={post.title} />
           <h3>{post.title}</h3>
           <p>Author: {post.author}</p>
        </div>
      ))}
    </div>
  );
};
```