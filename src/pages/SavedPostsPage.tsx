import { useEffect, useState } from 'react';
import { Spinner } from '@heroui/react';
import { Bookmark } from 'lucide-react';

import { userService } from '@/services/user.service';
import { Post } from '@/types';
import { PostCard } from '@/components/index/PostCard';

export default function SavedPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await userService.getSavedPosts();

        setPosts(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSaved();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <Spinner size="lg" />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <div className="flex items-center gap-3 mb-8 border-b-2 border-blue-600 pb-4">
        <Bookmark className="text-blue-600" size={32} />
        <h1 className="text-3xl font-bold uppercase">Tủ sách của tôi</h1>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg">Bạn chưa lưu bài viết nào.</p>
        </div>
      )}
    </div>
  );
}
