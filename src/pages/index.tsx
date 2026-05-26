import { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";
import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";

import { postService } from "@/services/post.service";
import { Post, PostFilter } from "@/types";
import { TopStoryCard } from "@/components/index/TopStoryCard";
import { PostCard } from "@/components/index/PostCard";
import { SidebarNewsList } from "@/components/index/SidebarNewsList";

const PLACEHOLDER = "https://via.placeholder.com/600x400";

export default function IndexPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postService
      .getPosts({ pageNo: 1, pageSize: 100 } as PostFilter)
      .then(res => {
        setPosts(res.data.items || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const hero = posts[0];
  const subFeatured = posts.slice(1, 4);
  const sidebarHot = posts.slice(4, 9);
  const mainStream = posts.slice(9);

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <main className="pb-20">
      <section className="bg-gray-50 py-3 border-b">
        <div className="container mx-auto px-4 flex gap-4 items-center">
          <TrendingUp className="text-red-600" size={18} />
          <span className="font-bold">TIÊU ĐIỂM</span>
        </div>
      </section>

      <section className="container mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-9">
          {hero && <TopStoryCard post={hero} />}

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {subFeatured.map(p => (
              <Link key={p.id} to={`/post/${p.slug}`}>
                <img
                  src={p.thumbnail || PLACEHOLDER}
                  className="h-36 w-full object-cover rounded"
                />
                <h3 className="font-bold mt-2 text-sm">{p.title}</h3>
              </Link>
            ))}
          </div>

          <h2 className="text-xl font-bold mt-12 mb-6">
            Tin mới cập nhật
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {mainStream.map(p => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          {sidebarHot.length > 0 && (
            <SidebarNewsList posts={sidebarHot} title="ĐÁNG CHÚ Ý" />
          )}
        </div>
      </section>
    </main>
  );
}
