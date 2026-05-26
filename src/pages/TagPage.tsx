import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Spinner } from '@heroui/react';
import { Tag as TagIcon, Clock } from 'lucide-react';

import { postService } from '@/services/post.service';
import { Post, PostFilter } from '@/types';
import { RelatedPosts } from '@/components/detail/RelatedPosts';
import { CategoryNews } from '@/components/detail/CategoryNews';
import { ReadMoreNews } from '@/components/detail/ReadMoreNews';

const PLACEHOLDER = 'https://via.placeholder.com/600x400?text=News';

export default function TagPage() {
  const { slug } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostsByTag = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        // Create filter object to query posts by tag
        const filter: PostFilter = {
          pageNo: 0,
          pageSize: 20,
          tagsSlug: [slug],
        };
        const response = await postService.getPosts(filter);

        if (response?.data?.items) {
          setPosts(response.data.items);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error('Error fetching posts by tag:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsByTag();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <Spinner size="lg" />
      </div>
    );

  const firstPost = posts.length > 0 ? posts[0] : null;

  return (
    <section className="container mx-auto px-4 py-8 max-w-7xl font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/*LEFT*/}
        <div className="lg:col-span-2">
          {/* 1. Tag Header */}
          <div className="flex items-center gap-3 border-b-2 border-[#d80f1e] pb-4 mb-8">
            <div className="p-3 bg-red-50 rounded-full text-[#d80f1e]">
              <TagIcon size={24} />
            </div>
            <div>
              <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                TAGS
              </span>
              <h1 className="text-3xl font-bold text-gray-900 capitalize leading-none mt-1">
                {slug?.replace(/-/g, ' ')}
              </h1>
            </div>
          </div>

          {/* 2. List of Posts */}
          {posts.length > 0 ? (
            <div className="flex flex-col gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group flex flex-col sm:flex-row gap-6 border-b border-gray-100 pb-8 last:border-0"
                >
                  <Link
                    className="sm:w-1/3 shrink-0 overflow-hidden rounded-lg aspect-video relative block"
                    to={`/post/${post.slug}`}
                  >
                    <img
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={post.thumbnail || PLACEHOLDER}
                    />
                  </Link>

                  {/* Content on the right */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <Link to={`/post/${post.slug}`}>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#d80f1e] leading-snug transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-3">
                        {post.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-400 mt-auto">
                      <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {post.category?.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(post.publishedAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded text-gray-500">
              No posts found for this topic.
            </div>
          )}
        </div>

        {/*RIGHT SIDEBAR */}
        <div className="lg:col-span-1">
          <div className="mb-8 sticky top-4">
            <div className="mb-8">
              <img
                alt="QC"
                className="w-full mx-auto rounded"
                src="https://adi.admicro.vn/adt/wd/2023/10/banner-300x600.jpg"
              />
            </div>

            {posts.length > 0 && (
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <h3 className="text-lg font-bold text-[#d80f1e] mb-4 border-b border-gray-300 pb-2">
                  TIN LIÊN QUAN
                </h3>
                <ul className="space-y-4">
                  {posts.slice(0, 5).map((related) => (
                    <li
                      key={related.id}
                      className="group border-b border-gray-100 last:border-0 pb-2 last:pb-0"
                    >
                      <Link
                        className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 leading-snug block"
                        to={`/post/${related.slug}`}
                      >
                        {related.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {firstPost && (
        <div className="mt-12 pt-8">
          <RelatedPosts
            categoryId={firstPost.category}
            currentPostId={firstPost.id}
          />
          <CategoryNews categoriesSlug={firstPost.category?.slug} />
          <ReadMoreNews currentPostId={firstPost.id} />
        </div>
      )}
    </section>
  );
}
