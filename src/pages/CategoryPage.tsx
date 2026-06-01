import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "@heroui/react";
import { Clock } from "lucide-react";

import { postService } from "@/services/post.service";
import { Post, PostFilter, PostType } from "@/types";
import { useCategories } from "@/contexts/CategoryContext";

import Pagination from "@/components/common/Pagination";
import { RelatedPosts } from "@/components/detail/RelatedPosts";
import { CategoryNews } from "@/components/detail/CategoryNews";
import { ReadMoreNews } from "@/components/detail/ReadMoreNews";

const PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%25" height="100%25" fill="%23eee"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="24">No Image</text></svg>';

const TYPE_ROUTE_MAP: Record<string, PostType> = {
  video: PostType.VIDEO,
  photo: PostType.GALLERY,
  longform: PostType.MAGAZINE,
  infographic: PostType.STANDARD,
};

export default function CategoryPage() {
  const { categorySlug, childSlug } = useParams<{
    categorySlug?: string;
    childSlug?: string;
  }>();

  const { flatCategories, loading: categoriesLoading } = useCategories();

  const effectiveSlug = childSlug ?? categorySlug;
  const routeType =
    !childSlug && categorySlug ? TYPE_ROUTE_MAP[categorySlug] : undefined;

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const category = useMemo(() => {
    if (!effectiveSlug) return undefined;
    return flatCategories.find((c) => c.slug === effectiveSlug);
  }, [flatCategories, effectiveSlug]);

  const pageTitle = useMemo(() => {
    if (routeType) return categorySlug?.toUpperCase();
    if (category?.name) return category.name;
    return "TIN TỨC";
  }, [routeType, categorySlug, category]);

  useEffect(() => {
    setPage(1);
  }, [categorySlug, childSlug, routeType]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const filter: PostFilter = {
          pageNo: Math.max(page - 1, 0),
          pageSize: 10,
        };

        if (routeType) {
          filter.type = routeType;
        } else if (effectiveSlug) {
          filter.categoriesSlug = [effectiveSlug];
        }

        const res = await postService.getPosts(filter);
        setPosts(res.data?.items ?? []);
        setTotalPages(res.data?.totalPages ?? 0);
      } catch (e) {
        console.error("Fetch category posts error:", e);
        setPosts([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    if (!routeType && effectiveSlug && categoriesLoading) return;

    fetchPosts();
  }, [effectiveSlug, routeType, page, categoriesLoading]);

  if (!routeType && effectiveSlug && !categoriesLoading && !category) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Không tìm thấy chuyên mục
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <Spinner size="lg" />
      </div>
    );
  }

  const firstPost = posts[0];

  return (
    <section className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="border-b pb-4 mb-8">
        <h1 className="text-4xl font-bold uppercase">{pageTitle}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {posts.length > 0 ? (
            <div className="flex flex-col gap-8">
              {posts.map((post) => (
                <article key={post.id} className="flex gap-6 border-b pb-8">
                  <Link
                    to={`/post/${post.slug}`}
                    className="w-1/3 overflow-hidden rounded-lg aspect-video"
                  >
                    <img
                      src={post.thumbnail || PLACEHOLDER}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex flex-col justify-between flex-1">
                    <Link to={`/post/${post.slug}`}>
                      <h3 className="text-xl font-bold mb-2 hover:underline">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-sm text-gray-600 line-clamp-3">
                      {post.summary}
                    </p>

                    <span className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                      <Clock size={12} />
                      {post.publishedAt &&
                        new Date(post.publishedAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              Chưa có bài viết
            </div>
          )}

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>

        <div className="lg:col-span-1">
          {posts.length > 0 && (
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-bold mb-4">XEM NHIỀU NHẤT</h3>
              <ul className="space-y-3">
                {posts.slice(0, 5).map((p) => (
                  <li key={p.id}>
                    <Link
                      to={`/post/${p.slug}`}
                      className="text-sm hover:underline"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {firstPost?.category && (
        <div className="mt-12">
          <RelatedPosts
            categoryId={firstPost.category}
            currentPostId={firstPost.id}
          />
          <CategoryNews categoriesSlug={firstPost.category.slug} />
          <ReadMoreNews currentPostId={firstPost.id} />
        </div>
      )}
    </section>
  );
}
