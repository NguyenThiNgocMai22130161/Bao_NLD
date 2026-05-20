import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Post } from '@/types';

interface SidebarNewsListProps {
  title: string;
  posts: Post[];
}

export const SidebarNewsList: React.FC<SidebarNewsListProps> = ({
  title,
  posts,
}) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold uppercase mb-4 flex items-center">
        <span className="bg-red-600 w-1 h-4 mr-2 inline-block" />
        {title}
      </h3>
      <ul className="divide-y divide-gray-200">
        {posts.map((post) => (
          <li key={post.id} className="py-3">
            <a
              className="text-base font-medium hover:text-blue-600 cursor-pointer font-serif leading-snug line-clamp-2"
              href={`/post/${post.slug}`}
            >
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
