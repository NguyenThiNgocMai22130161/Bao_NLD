import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Spinner } from '@heroui/react';
import { Bookmark, BookmarkCheck, Tag as TagIcon } from 'lucide-react';

import { postService } from '@/services/post.service';
import { PostDetail } from '@/types';
import { RelatedPosts } from '@/components/detail/RelatedPosts';
import { CategoryNews } from '@/components/detail/CategoryNews';
import { CommentSection } from '@/components/detail/CommentSection';
import { ReadMoreNews } from '@/components/detail/ReadMoreNews';
import { useAuth } from '@/contexts/AuthContext';
import { userService } from '@/services/user.service';



export default function PostDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostDetail | null>(null);
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchPostDetail = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setPost(null);

        if (response && response.data) {
          const currentPost = response.data;

          setPost(currentPost);
          if (isLoggedIn) {
            const saveRes = await userService.getSavedPosts();
            const alreadySaved = saveRes.data.some(
              (p) => p.id == currentPost.id
            );

            setIsSaved(alreadySaved);
          }
        }
      } catch (error) {
        console.error('Lỗi tải bài viết:', error);
        const response = await postService.getPostDetail(slug);
        setPost(response.data)
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
    window.scrollTo(0, 0);
  }, [slug, isLoggedIn]);

  const handleToggleSave = async () => {
    if (!isLoggedIn) {
      alert('Vui lòng đăng nhập để sử dụng chức năng này');

      return;
    }
    try {
      await userService.toggleSavePost(slug!);
      setIsSaved(!isSaved);
    } catch (error) {
      alert('Có lỗi xảy ra khi lưu bài viết!');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Không tìm thấy bài viết!
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8 max-w-7xl font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between border-b pb-3 mb-4">
            <span className="text-[#d80f1e] font-bold uppercase text-sm">
              {post.category?.name}
            </span>
            <div className="flex items-center gap-4">
              <button
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
                onClick={handleToggleSave}
              >
                {isSaved ? (
                  <BookmarkCheck
                    className="text-blue-600 fill-blue-600"
                    size={24}
                  />
                ) : (
                  <Bookmark size={24} />
                )}
                <span className="text-sm font-medium">
                  {isSaved ? 'Đã lưu' : 'Lưu bài'}
                </span>
              </button>
              <span className="text-gray-500 text-xs">
                {new Date(post.publishedAt).toLocaleDateString('vi-VN')}
              </span>
            </div>
          

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {post.title}
          </h1>

          <p className="font-bold text-lg mb-6 text-gray-700">
            {post.summary}
          </p>

          <img
            src={post.thumbnail || "https://via.placeholder.com/800x400"}
            className="w-full rounded mb-6"
          />

          <div
            className="content-body text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />

          <div className="mt-8 font-bold text-right">
            Theo {post.author || "Người Lao Động"}
          </div>

          {post.tags?.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2 border-t pt-6">
              <TagIcon size={18} />
              {post.tags.map(tag => (
                <Link
                  key={tag.id}
                  to={`/tag/${tag.slug}`}
                  className="px-3 py-1 bg-gray-100 rounded text-sm"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          )}

          <div className="mt-8">
            <CommentSection postId={post.id} />
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="lg:col-span-1">
          {post.relatedPosts?.length > 0 && (
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-bold mb-4">TIN LIÊN QUAN</h3>
              <ul className="space-y-3">
                {post.relatedPosts.map(r => (
                  <li key={r.id}>
                    <Link to={`/post/${r.slug}`} className="text-sm">
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <RelatedPosts categoryId={post.category} currentPostId={post.id} />
        <CategoryNews categoriesSlug={post.category?.slug} />
        <ReadMoreNews currentPostId={post.id} />
      </div>
    </section>
  );
}
