import { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { Spinner } from '@heroui/react';
import {
  Tag as TagIcon,
  Bookmark,
  BookmarkCheck,
  ArrowLeft,
  Printer,
} from 'lucide-react';

import { postService } from '@/services/post.service';
import { userService } from '@/services/user.service';
import { useAuth } from '@/contexts/AuthContext';
import { PostDetail } from '@/types';
import { RelatedPosts } from '@/components/detail/RelatedPosts';
import { CategoryNews } from '@/components/detail/CategoryNews';
import { CommentSection } from '@/components/detail/CommentSection';
import { ReadMoreNews } from '@/components/detail/ReadMoreNews';

export default function PostDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: post?.title || 'bai-viet-chi-tiet',
  });

  const { isLoggedIn } = useAuth();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchPostDetail = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const response = await postService.getPostDetail(slug);

        if (response && response.data) {
          const currentPost = response.data;

          setPost(currentPost);

          if (isLoggedIn) {
            try {
              const saveRes = await userService.getSavedPosts();
              const alreadySaved = saveRes.data.some(
                (p: any) => p.id == currentPost.id
              );

              setIsSaved(alreadySaved);
            } catch (err) {
              console.error('Lỗi kiểm tra trạng thái lưu:', err);
            }
          }
        }
      } catch (error) {
        console.error('Lỗi tải bài viết:', error);
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
      console.error(error);
      alert('Có lỗi xảy ra khi lưu bài viết!');
    }
  };

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <Spinner size="lg" />
      </div>
    );

  if (!post)
    return (
      <div className="text-center mt-20 text-gray-500">
        Không tìm thấy bài viết!
      </div>
    );

  return (
    <section className="container mx-auto px-4 py-8 max-w-7xl font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2">
          {/* 1. Header*/}
          <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
            <span className="text-[#d80f1e] font-bold uppercase text-sm">
              {post.category?.name || 'Tin tức'}
            </span>

            <div className="flex items-center gap-4">
              {/*Save Post */}
              <button
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
                title={isSaved ? 'Bỏ lưu' : 'Lưu bài viết'}
                onClick={handleToggleSave}
              >
                {isSaved ? (
                  <BookmarkCheck
                    className="text-blue-600 fill-blue-600"
                    size={20}
                  />
                ) : (
                  <Bookmark size={20} />
                )}
                <span className="text-xs font-medium hidden sm:inline">
                  {isSaved ? 'Đã lưu' : 'Lưu tin'}
                </span>
              </button>

              <span className="text-gray-500 text-xs border-l pl-4">
                {new Date(post.publishedAt).toLocaleDateString('vi-VN')}
              </span>
            </div>
          </div>

          {/* Start IN (Gắn ref) */}
          {/* Wrap Title, Summary, Image, and Content in this div to ensure only this section is captured when printing. */}
          <div ref={contentRef} className="print-section p-4 md:p-0 bg-white">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {post.title}
            </h1>

            <p className="font-bold text-gray-700 text-lg mb-6 leading-relaxed">
              {post.summary}
            </p>

            <figure className="mb-6">
              <img
                alt={post.title}
                className="w-full rounded h-auto object-cover"
                src={post.thumbnail || 'https://via.placeholder.com/800x400'}
              />
            </figure>

            {/* 2. Content HTML */}
            <div
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
              className="content-body text-lg leading-relaxed space-y-4 text-gray-800"
            />

            <div className="mt-8 text-right font-bold text-gray-900">
              Theo {post.author || 'Người Lao Động'}
            </div>
          </div>
          {/*End IN */}

          {/* 3. TAGS */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-6">
              <TagIcon className="text-gray-400 mr-1" size={18} />
              {post.tags.map((tag) => (
                <Link
                  key={tag.id}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded hover:bg-gray-200 transition-colors font-medium"
                  to={`/tag/${tag.slug}`}
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          )}

          {/* 4. Action Buttons: */}
          <div className="mt-8 pt-6 mb-8 border-t border-gray-100 flex flex-wrap gap-4">
            {/* Back to previous page*/}
            <button
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-700 font-medium transition-colors"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} />
              <span>Quay lại trang trước</span>
            </button>

            {/* In*/}
            <button
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-700 font-medium transition-colors"
              onClick={() => handlePrint()}
            >
              <Printer size={18} />
              <span>In bài viết</span>
            </button>
          </div>

          {/* 5. Comment Section */}
          <div className="mt-8">
            <CommentSection postId={post.id} />
          </div>
        </div>

        {/* RIGHT SIDEBAR (Sticky & Styled) */}
        <div className="lg:col-span-1">
          <div className="mb-8 sticky top-4">
            {/* Banner QC */}
            <div className="mb-8">
              <img
                alt="QC"
                className="w-full mx-auto rounded"
                src="https://adi.admicro.vn/adt/wd/2023/10/banner-300x600.jpg"
              />
            </div>

            {/* List Tin liên quan */}
            {post.relatedPosts && post.relatedPosts.length > 0 && (
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <h3 className="text-lg font-bold text-[#d80f1e] mb-4 border-b border-gray-300 pb-2">
                  TIN LIÊN QUAN
                </h3>
                <ul className="space-y-4">
                  {post.relatedPosts.slice(0, 10).map((related) => (
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

      {/* FOOTER RELATED CONTENT */}
      <div className="mt-12">
        <RelatedPosts categoryId={post.category} currentPostId={post.id} />
        <CategoryNews categoriesSlug={post.category?.slug} />
        <ReadMoreNews currentPostId={post.id} />
      </div>
    </section>
  );
}
