import { Card, CardBody, Image } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import { Post } from "@/types";

interface TopStoryCardProps {
  post: Post;
}

export const TopStoryCard: React.FC<TopStoryCardProps> = ({ post }) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    if (!dateString) return "";

    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  return (
    <Card
      isPressable
      className="w-full mb-8 shadow-none border-b border-gray-200 rounded-none pb-6 hover:opacity-90 transition-opacity"
      onPress={() => navigate(`/post/${post.slug}`)}
    >
      <CardBody className="p-0 overflow-visible grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative h-64 md:h-auto">
          <Image
            alt={post.title}
            className="object-cover w-full h-full rounded-md"
            src={post.thumbnail || "https://via.placeholder.com/600x400"}
            width="100%"
          />
        </div>

        {/* content */}
        <div className="flex flex-col justify-start">
          {post.category && (
            <span className="text-sm text-blue-600 font-bold uppercase mb-2">
              {post.category.name}
            </span>
          )}

          <h1 className="text-2xl md:text-4xl font-bold font-serif leading-tight mb-3 hover:text-blue-800">
            {post.title}
          </h1>
          <p className="text-gray-600 text-base line-clamp-3 mb-4">
            {post.summary}
          </p>
          <small className="text-gray-400 mt-auto">
            {formatDate(post.publishedAt)}
          </small>
        </div>
      </CardBody>
    </Card>
  );
};

