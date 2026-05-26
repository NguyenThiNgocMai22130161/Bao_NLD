import { Post } from "@/types";
import { useNavigate } from "react-router-dom";

interface Props {
  post: Post;
}

export default function FeaturedBlock({ post }: Props) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      {/* BÀI NỔI BẬT */}
      <div
        className="col-span-2 grid grid-cols-2 gap-6 cursor-pointer"
        onClick={() => navigate(`/bai-viet/${post.slug}`)}
      >
        <img
          src={post.thumbnail}
          className="w-full h-[300px] object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold leading-snug">
            {post.title}
          </h2>
          <p className="text-gray-600 mt-3 line-clamp-4">
            {post.summary}
          </p>
        </div>
      </div>

      {/* QUẢNG CÁO / SIDEBAR */}
      <div className="bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
        CHỈ BẠN<br />CÓ THỂ
      </div>
    </div>
  );
}
