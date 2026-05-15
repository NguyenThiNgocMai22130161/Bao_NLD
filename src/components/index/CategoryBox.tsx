import React from 'react';

import { Post } from '@/types';

interface CategoryBoxProps {
  title: string;
  icon: React.ReactNode;
  posts: Post[];
  color?: string;
}

export const CategoryBox: React.FC<CategoryBoxProps> = ({
  title,
  icon,
  posts,
  color = 'text-blue-700',
}) => {
  if (!posts || posts.length === 0) return null;

  const mainPost = posts[0];
  const subPosts = posts.slice(1, 4);

  return (
    <div className="mb-8 border-t-2 border-gray-200 pt-4">
      <div className="flex items-center gap-2 mb-4">
        <span className={`${color}`}>{icon}</span>
        <h3 className={`font-bold text-lg uppercase ${color}`}>{title}</h3>
        <div className="flex-1 h-[1px] bg-gray-100 ml-2" />
      </div>

      <div className="mb-4 group cursor-pointer">
        <div className="overflow-hidden rounded-lg mb-2">
          <img
            alt={mainPost.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            src={mainPost.thumbnail || 'https://via.placeholder.com/300'}
          />
        </div>
        <h4 className="font-bold text-md leading-tight group-hover:text-blue-600 transition-colors">
          <a href={`/post/${mainPost.id}`}>{mainPost.title}</a>
        </h4>
        <p className="text-gray-500 text-xs mt-1 line-clamp-2">
          {mainPost.summary}
        </p>
      </div>

      <ul className="space-y-3">
        {subPosts.map((post) => (
          <li key={post.id} className="relative pl-4">
            <span
              className={`absolute left-0 top-2 w-1.5 h-1.5 rounded-full ${color.replace('text-', 'bg-')}`}
            />
            <a
              className="text-sm text-gray-700 hover:text-blue-600 hover:underline line-clamp-2"
              href={`/post/${post.id}`}
            >
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
