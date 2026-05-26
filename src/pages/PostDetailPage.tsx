import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Spinner } from '@heroui/react';
import { Tag as TagIcon } from 'lucide-react';

import { postService } from '@/services/post.service';
import { PostDetail } from '@/types';
import { RelatedPosts } from '@/components/detail/RelatedPosts';
import { CategoryNews } from '@/components/detail/CategoryNews';
import { CommentSection } from '@/components/detail/CommentSection';
import { ReadMoreNews } from '@/components/detail/ReadMoreNews';

export default function PostDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetail = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const response = await postService.getPostDetail(slug);

        if (response && response.data) {
          setPost(response.data);
        }
      } catch (error) {
        console.error('Lỗi tải bài viết:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
    window.scrollTo(0, 0);
  }, [slug]);

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
        {/* LERF */}
        <div className="lg:col-span-2">
          {/* 1. Header */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
            <span className="text-[#d80f1e] font-bold uppercase text-sm">
              {post.category?.name || 'Tin tức'}
            </span>
            <span className="text-gray-500 text-xs">
              {new Date(post.publishedAt).toLocaleDateString('vi-VN')}
            </span>
          </div>

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

          {/*3. TAGS */}
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

          <div className="mt-8">
            <CommentSection postId={post.id} />
          </div>
        </div>

        {/*SIDEBAR */}
        <div className="lg:col-span-1">
          <div className="mb-8 sticky top-4">
            <div className="mb-8">
              <img
                alt="QC"
                className="w-full mx-auto rounded"
                src="https://adi.admicro.vn/adt/wd/2023/10/banner-300x600.jpg"
              />
            </div>

            {post.relatedPosts && post.relatedPosts.length > 0 && (
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <h3 className="text-lg font-bold text-[#d80f1e] mb-4 border-b border-gray-300 pb-2">
                  TIN LIÊN QUAN
                </h3>
                <ul className="space-y-4">
                  {post.relatedPosts.map((related) => (
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

      <div className="mt-12">
        <RelatedPosts categoryId={post.category} currentPostId={post.id} />
        <CategoryNews categoriesSlug={post.category?.slug} />
        <ReadMoreNews currentPostId={post.id} />
      </div>
    </section>
  );
}
