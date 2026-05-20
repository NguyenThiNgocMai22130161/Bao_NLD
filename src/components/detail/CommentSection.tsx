import { useState, useEffect } from 'react';
import { MessageSquare, Send, ThumbsUp, Reply } from 'lucide-react';
import { Spinner } from '@heroui/react';

import { commentService } from '@/services/comment.service';
import { Comment } from '@/types';

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const CommentItem = ({ comment }: { comment: Comment }) => {
  const initial = comment.user ? comment.user.charAt(0).toUpperCase() : '?';

  return (
    <div className="flex gap-4 animate-fadeIn">
      <div className="shrink-0">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold border border-gray-300 shadow-sm">
          {initial}
        </div>
      </div>
      <div className="flex-1">
        <div className="bg-white p-4 rounded-lg rounded-tl-none shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-gray-900 text-sm">{comment.user}</h4>
            <span className="text-xs text-gray-400">
              {formatDate(comment.createdAt)}
            </span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
            {comment.content}
          </p>
        </div>
        <div className="flex items-center gap-4 mt-2 ml-2">
          <button className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-blue-600 transition-colors">
            <ThumbsUp size={14} /> Thích
          </button>
          <button className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-blue-600 transition-colors">
            <Reply size={14} /> Phản hồi
          </button>
        </div>
        {/* Recursion for replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 pl-4 border-l-2 border-gray-100 space-y-4">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const CommentSection = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 1. Fetch Comments
  useEffect(() => {
    if (!postId) return;
    const loadComments = async () => {
      try {
        setLoading(true);
        const res = await commentService.getCommentsByPost(postId);

        // res.data Comment[]
        if (res && res.data) {
          setComments(res.data);
        }
      } catch (error) {
        console.error('Lỗi tải bình luận:', error);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [postId]);

  // 2. Submit Comment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const token = localStorage.getItem('accessToken');

    if (!token) {
      alert('Bạn cần đăng nhập để bình luận!');

      // window.location.href = '/login';
      return;
    }

    try {
      setSubmitting(true);
      const res = await commentService.createComment(postId, {
        content: newComment,
      });

      if (res && res.data) {
        setComments([res.data, ...comments]);
      }
    } catch (error) {
      console.error('Lỗi gửi bình luận:', error);
      alert('Gửi thất bại. Có thể phiên đăng nhập đã hết hạn.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="bg-gray-50 p-6 rounded-xl border border-gray-100 mt-10"
      id="comments"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-4">
        <MessageSquare className="text-blue-600" size={24} />
        <h3 className="text-xl font-bold text-gray-800">
          Bình luận{' '}
          <span className="text-gray-500 text-base font-normal">
            ({comments.length})
          </span>
        </h3>
      </div>

      {/* Input Form */}
      <form className="mb-8 flex gap-4" onSubmit={handleSubmit}>
        {/* Avatar user */}
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200 shrink-0">
          Me
        </div>

        <div className="flex-1">
          <textarea
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[80px] resize-y bg-white text-sm"
            disabled={submitting}
            placeholder="Chia sẻ ý kiến của bạn..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <button
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors shadow-sm"
              disabled={!newComment.trim() || submitting}
              type="submit"
            >
              {submitting ? (
                <Spinner color="white" size="sm" />
              ) : (
                <>
                  <Send size={16} /> Gửi bình luận
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Loading & List */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-gray-400 italic">
          Chưa có bình luận nào. Hãy là người đầu tiên!
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};
