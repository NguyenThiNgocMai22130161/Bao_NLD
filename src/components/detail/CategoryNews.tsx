import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { postService } from '@/services/post.service';
import { Post, PostFilter } from '@/types';

interface CategoryNewsProps {
  categoriesSlug?: string;
}

export const CategoryNews = ({ categoriesSlug }: CategoryNewsProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const today = new Date();
  const [day, setDay] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = [2025, 2024, 2023];

  const formatDate = (d: number, m: number, y: number) => {
    const mm = m < 10 ? `0${m}` : m;
    const dd = d < 10 ? `0${d}` : d;

    return `${y}-${mm}-${dd}`;
  };

  // FILTER LOGIC
  const fetchCategoryNews = async (searchDate?: string) => {
    if (!categoriesSlug) return;

    setIsLoading(true);
    try {
      const filter: PostFilter = {
        pageNo: 0,
        pageSize: 6,
        categoriesSlug: [categoriesSlug],
      };

      if (searchDate) {
        (filter as any).publishDate = searchDate;
      }

      const response = await postService.getPosts(filter);

      if (response && response.data && response.data.items) {
        setPosts(response.data.items.slice(0, 6));
      } else {
        setPosts([]);
      }
    } catch (error) {
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (categoriesSlug) {
      fetchCategoryNews();
    }
  }, [categoriesSlug]);

  const handleFilterClick = () => {
    const dateString = formatDate(day, month, year);

    fetchCategoryNews(dateString);
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = 'https://placehold.co/600x400/png?text=News+App';
    e.currentTarget.onerror = null;
  };

  return (
    <div className="w-full mt-10 pt-8 border-t border-gray-200 col-span-full lg:col-span-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center">
          <div className="w-1.5 h-6 bg-orange-500 mr-3" />
          <h2 className="text-xl font-bold uppercase text-blue-900">
            Tin tức qua ngày
          </h2>
        </div>

        <div className="flex items-center text-sm gap-2">
          <span className="text-gray-600 hidden sm:inline">Xem theo ngày</span>

          <select
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500 cursor-pointer"
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
          >
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500 cursor-pointer"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          >
            {months.map((m) => (
              <option key={m} value={m}>
                Tháng {m}
              </option>
            ))}
          </select>

          <select
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500 cursor-pointer"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <button
            className={`px-4 py-1.5 rounded font-semibold text-xs md:text-sm transition-colors shadow-sm text-white
              ${isLoading ? 'bg-gray-400 cursor-wait' : 'bg-blue-800 hover:bg-blue-900'}
            `}
            disabled={isLoading}
            onClick={handleFilterClick}
          >
            {isLoading ? '...' : 'XEM'}
          </button>
        </div>
      </div>

      <div
        className={`transition-opacity duration-200 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
      >
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                className="group block"
                to={`/post/${post.slug}`}
                onClick={() => window.scrollTo(0, 0)}
              >
                <div className="relative overflow-hidden aspect-[4/3] mb-3 rounded-md">
                  <img
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={post.thumbnail || 'https://placehold.co/600x400'}
                    onError={handleImageError}
                  />
                </div>
                <h3 className="text-base font-semibold text-gray-800 leading-snug group-hover:text-blue-800 line-clamp-3">
                  {post.title}
                </h3>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 mb-2">
              Không tìm thấy bài viết nào trong ngày {day}/{month}/{year}.
            </p>
            <button
              className="text-blue-600 hover:underline text-sm font-medium"
              onClick={() => fetchCategoryNews()}
            >
              Xem tin mới nhất
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
