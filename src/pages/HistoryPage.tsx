import { useEffect, useState } from 'react';
import { Spinner } from '@heroui/react';
import { Clock } from 'lucide-react';

import { userService } from '@/services/user.service';
import { Post } from '@/types';
import { PostCard } from '@/components/index/PostCard';

export default function HistoryPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await userService.getHistory();

        setPosts(res.data || (res as any));
      } catch (error) {
        console.error('Lỗi tải lịch sử:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <Spinner color="primary" size="lg" />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8 border-b-2 border-blue-600 pb-4">
        <Clock className="text-blue-600" size={32} />
        <h1 className="text-3xl font-bold uppercase text-gray-800">
          Lịch sử đã xem
        </h1>
      </div>
      {/* list post */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <Clock className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <p className="text-gray-500 text-lg">
            Bạn chưa xem bài viết nào gần đây.
          </p>
        </div>
      )}
    </div>
  );
}
