import { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";

import { PostCard } from "@/components/PostCard";
import { TopStoryCard } from "@/components/TopStoryCard";
import { SidebarNewsList } from "@/components/SidebarNewsList";
import { postService } from "@/services/post.service";
import { Post, PostFilter } from "@/types";

export default function IndexPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const filter: PostFilter = {
          pageNo: 0,
          pageSize: 20,
        };

        const response = await postService.getPosts(filter);

        if (response && response.data && response.data.items) {
          setPosts(response.data.items);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Lỗi tải bài viết:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <Spinner size="lg" />
      </div>
    );
  if (posts.length === 0)
    return (
      <div className="text-center mt-20 text-gray-500">
        Chưa có bài viết nào.
      </div>
    );

  const topStory = posts[0];
  const mainPosts = posts.slice(1, 7);
  const sidebarPosts = posts.slice(7, 15);

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {topStory && <TopStoryCard post={topStory} />}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {mainPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="mb-8">
            <img
              alt="Sự kiện"
              className="w-full rounded"
              src="https://nld.mediacdn.vn/thumb_w/300/2023/5/12/sea-games-32-16838609866721552887330.jpg"
            />
          </div>

          {sidebarPosts.length > 0 && (
            <SidebarNewsList posts={sidebarPosts} title="TIN NÓNG" />
          )}

          <div className="bg-gray-100 p-4 text-center text-gray-500 min-h-[200px] flex items-center justify-center">
            Khu vực Quảng Cáo
          </div>
        </div>
      </div>
    </section>
  );
}

