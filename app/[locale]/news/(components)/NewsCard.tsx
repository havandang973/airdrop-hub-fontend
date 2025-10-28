'use client';
import Image from 'next/image';
import { IconCalendar } from '@tabler/icons-react';

export default function NewsCard({ post }: { post: any }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-all h-full flex flex-col">
      <div className="aspect-[16/9] w-full overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
          {post.title}
        </h3>
        <p className="text-sm text-gray-500 mt-auto">{post.date}</p>
      </div>
    </div>
  );
}
