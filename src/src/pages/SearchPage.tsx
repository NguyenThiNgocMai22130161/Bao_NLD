import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Spinner } from '@heroui/react';
import { MagnifyingGlassIcon, ClockIcon } from '@heroicons/react/24/outline';

import { postService } from '@/services/post.service';
import { Post, PostFilter } from '@/types';

const PLACEHOLDER = 'https://via.placeholder.com/600x400?text=News';

export default function SearchPage() {
  // 1. Get query parameters from URL (e.g., ?q=keyword)
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  // 2. State management for posts, loading status, and total count
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // 3. Fetch search results whenever the query changes
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      try {
        setLoading(true);
        // Call API with the search keyword
        const filter: PostFilter = {
          pageNo: 0,
          pageSize: 20,
          keyword: query.trim(),
        };

        const response = await postService.getPosts(filter);

        // Update state with fetched data
        if (response?.data?.items) {
          setPosts(response.data.items);
          setTotal(response.data.totalElements || 0);
        } else {
          setPosts([]);
          setTotal(0);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
    window.scrollTo(0, 0); // Scroll to top on new search
  }, [query]);

  return (
    <section className="container mx-auto px-4 py-8 max-w-7xl font-sans min-h-screen">
      {/* HEADER SECTION */}
      <div className="border-b border-gray-200 pb-4 mb-8">
        <div className="flex items-center gap-3 text-gray-600 mb-2">
          <MagnifyingGlassIcon className="w-6 h-6 text-[#d80f1e]" />
          <span className="text-sm font-bold uppercase tracking-wider">
            Kết quả tìm kiếm
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Từ khoá: <span className="text-[#d80f1e]">&quot;{query}&quot;</span>
        </h1>
        {!loading && (
          <p className="text-gray-500 text-sm mt-2">
            Có {posts.length} kết quả phù hợp.
          </p>
        )}
      </div>

      {/* CONTENT SECTION*/}
      {loading ? (
        <div className="flex justify-center mt-20">
          <Spinner size="lg" />
        </div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col h-full bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <Link
                className="aspect-video overflow-hidden block relative"
                to={`/post/${post.slug}`}
              >
                <img
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={post.thumbnail || PLACEHOLDER}
                />
              </Link>

              {/* Post Content */}
              <div className="p-4 flex flex-col flex-1">
                {post.category && (
                  <div className="mb-2">
                    <Link
                      className="text-xs font-bold text-blue-600 uppercase bg-blue-50 px-2 py-1 rounded hover:bg-blue-100"
                      to={`/category/${post.category.slug}`}
                    >
                      {post.category.name}
                    </Link>
                  </div>
                )}

                {/* Post Title */}
                <Link className="block mb-2" to={`/post/${post.slug}`}>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#d80f1e] leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                {/* Post Summary */}
                <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">
                  {post.summary}
                </p>

                {/* Post Meta (Date) */}
                <div className="flex items-center text-xs text-gray-400 mt-auto pt-3 border-t border-gray-50">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {new Date(post.publishedAt).toLocaleDateString('vi-VN')}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* --- EMPTY STATE: Display when no results found --- */
        <div className="text-center py-20 bg-gray-50 rounded text-gray-500">
          <MagnifyingGlassIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">No posts found.</p>
          <p className="text-sm mt-2">
            Please try searching with a different or shorter keyword.
          </p>
        </div>
      )}
    </section>
  );
}
