import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from '@heroui/react';
import { MessageSquare, ArrowRight } from 'lucide-react';

import { userService } from '@/services/user.service';

interface AnyComment {
  id: number | string;
  content: string;
  createdAt?: string;
  createdDate?: string;

  postSlug?: string;
  postTitle?: string;
  post_slug?: string;
  post_title?: string;
  post?: {
    slug?: string;
    title?: string;
    id?: number | string;
  };
}

export default function UserCommentsPage() {
  const [comments, setComments] = useState<AnyComment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await userService.getMyComments();

        console.log('🔥 Dữ liệu Backend trả về:', res);
        let finalData: AnyComment[] = [];

        if (Array.isArray(res)) {
          finalData = res;
        } else if ((res as any).data && Array.isArray((res as any).data)) {
          finalData = (res as any).data;
        }

        setComments(finalData);
      } catch (error) {
        console.error('Lỗi tải bình luận:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <Spinner size="lg" />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen max-w-4xl">
      <div className="flex items-center gap-3 mb-8 border-b-2 border-blue-600 pb-4">
        <MessageSquare className="text-blue-600" size={32} />
        <h1 className="text-3xl font-bold uppercase text-gray-800">
          Hoạt động bình luận
        </h1>
      </div>

      {comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment, index) => {
            // check Slug
            const slug =
              comment.postSlug ||
              comment.post_slug ||
              comment.post?.slug ||
              '#';

            // check Title
            const title =
              comment.postTitle ||
              comment.post_title ||
              comment.post?.title ||
              'Bài viết (Không xác định)';

            // check Date
            const dateString = comment.createdAt || comment.createdDate;
            const displayDate = dateString
              ? new Date(dateString).toLocaleDateString('vi-VN')
              : '';

            return (
              <div
                key={comment.id || index}
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3 text-sm">
                  <span className="text-gray-500 font-medium">
                    Bạn đã bình luận:
                  </span>
                  <span className="text-gray-400 text-xs">{displayDate}</span>
                </div>

                <Link
                  className={`font-bold text-lg flex items-center gap-2 mb-3 group ${slug !== '#' ? 'text-gray-800 hover:text-blue-600 cursor-pointer' : 'text-gray-400 cursor-default'}`}
                  to={slug !== '#' ? `/post/${slug}` : '#'}
                >
                  {title}
                  {slug !== '#' && (
                    <ArrowRight
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      size={16}
                    />
                  )}
                </Link>

                <div className="bg-gray-50 p-4 rounded-lg text-gray-700 italic border-l-4 border-blue-400">
                  &quot;{comment.content}&quot;
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <MessageSquare className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <p className="text-gray-500 text-lg">Bạn chưa có bình luận nào.</p>
        </div>
      )}
    </div>
  );
}
