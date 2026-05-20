import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { postService } from '@/services/post.service';
import { Post, PostFilter } from '@/types';

interface RelatedPostsProps {
  categoryId?: any;
  currentPostId?: any;
}

export const RelatedPosts = ({
  categoryId,
  currentPostId,
}: RelatedPostsProps) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const filter: PostFilter = {
          pageNo: 0,
          pageSize: 10,
        };

        const response = await postService.getPosts(filter);

        if (response && response.data && response.data.items) {
          const relatedItems = response.data.items
            .filter((p: Post) => p.id !== currentPostId)
            .slice(0, 6);

          setPosts(relatedItems);
        }
      } catch (error) {
        console.error('Lỗi tải tin liên quan:', error);
      }
    };

    fetchRelated();
  }, [categoryId, currentPostId]);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = 'https://placehold.co/600x400/png?text=News+App';
    e.currentTarget.onerror = null;
  };

  if (posts.length === 0) return null;

  return (
    <div className="w-full mt-12 pt-10 border-t-2 border-gray-100 col-span-full lg:col-span-3">
      <div className="flex items-center mb-8">
        <div className="w-1.5 h-8 bg-red-600 mr-4 rounded-sm shadow-sm" />
        <h2 className="text-2xl font-bold uppercase text-gray-900 tracking-tight">
          KHÔNG THỂ BỎ LỠ
        </h2>
      </div>
      {/* new line */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-x-8 gap-y-10">
        {posts.map((post) => (
          <Link
            key={post.id}
            className="group flex flex-col h-full"
            to={`/post/${post.slug}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {/* image */}
            <div className="relative w-full overflow-hidden rounded-2xl aspect-[16/10] mb-5 bg-gray-200 shadow-sm border border-gray-100">
              <img
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                src={
                  post.thumbnail ||
                  'https://placehold.co/600x400/png?text=News+App'
                }
                onError={handleImageError}
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl group-hover:ring-black/10 transition-all" />
            </div>

            <h3 className="text-xl font-bold text-gray-800 leading-snug group-hover:text-red-600 transition-colors line-clamp-3">
              {post.title}
            </h3>

            <div className="mt-3 text-sm font-medium text-gray-500 flex items-center">
              <span className="w-2 h-2 bg-gray-300 rounded-full mr-2" />
              Xem chi tiết
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
