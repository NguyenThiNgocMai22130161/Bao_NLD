import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

import { postService } from '@/services/post.service';
import { Post, PostFilter } from '@/types';

const PLACEHOLDER = 'https://via.placeholder.com/600x400?text=News';

export const ReadMoreNews = ({ currentPostId }: { currentPostId: string }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const filter: PostFilter = { pageNo: 0, pageSize: 30 };
        const res = await postService.getPosts(filter);

        if (res?.data?.items) {
          const otherPosts = res.data.items.filter(
            (p) => p.id !== currentPostId
          );

          setPosts(otherPosts);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, [currentPostId]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  if (posts.length === 0) return null;

  return (
    <div className="mt-12 pt-10 border-t-4 border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <span className="w-1.5 h-6 bg-blue-600 block" />
        <h3 className="text-xl font-bold text-blue-700 uppercase tracking-wide">
          ĐỌC THÊM
        </h3>
      </div>

      {/* List Items */}
      <div className="flex flex-col gap-8">
        {posts.slice(0, visibleCount).map((post) => (
          <Link
            key={post.id}
            className="group flex flex-col md:flex-row gap-6 items-start border-b border-gray-100 pb-8 last:border-0 last:pb-0"
            to={`/post/${post.slug}`}
          >
            {/* Thumbnail */}
            <div className="w-full md:w-[280px] shrink-0 overflow-hidden rounded-lg aspect-video md:h-44 relative bg-gray-100">
              <img
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={post.thumbnail || PLACEHOLDER}
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h4 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-blue-600 leading-snug mb-3 transition-colors">
                {post.title}
              </h4>
              <div className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-4">
                (NLĐO) - {post.summary}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {visibleCount < posts.length && (
        <div className="mt-10 text-center">
          <button
            className="px-8 py-3 bg-white border border-gray-300 text-gray-600 font-semibold rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center gap-2 mx-auto shadow-sm active:scale-95"
            onClick={handleLoadMore}
          >
            Xem thêm bài khác <ChevronDown size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
