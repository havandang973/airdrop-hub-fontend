'use client';
import Image from 'next/image';
import { IconCalendar } from '@tabler/icons-react';

export default function NewsCard({ post }: { post: any }) {
  return (
    <div className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition">
      <Image
        src={post.image}
        alt={post.title}
        width={400}
        height={220}
        className="object-cover w-full h-[200px]"
      />
      <div className="p-3">
        <h4 className="font-medium text-base line-clamp-2">{post.title}</h4>
        <div className="flex items-center text-gray-500 text-sm mt-2">
          <IconCalendar size={16} className="mr-1" />
          {post.date}
        </div>
      </div>
    </div>
  );
}
