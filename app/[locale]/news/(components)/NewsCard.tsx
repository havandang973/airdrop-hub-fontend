'use client';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';
import { Image } from '@heroui/image';
import { IconCalendar } from '@tabler/icons-react';

export default function NewsCard({ post }: { post: any }) {
  return (
    <Card
      isPressable
      className="bg-white dark:bg-gray-900 hover:shadow-lg dark:hover:shadow-blue-500/10 transition-all flex flex-col"
    >
      <Image
        removeWrapper
        src={post.image}
        alt={post.title}
        className="object-cover aspect-[16/9] w-full rounded-t-lg"
      />
      <CardBody className="flex flex-col flex-grow p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 mb-2">
          {post.title}
        </h3>

        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-auto">
          <IconCalendar size={16} className="mr-1" />
          {post.date}
        </div>
      </CardBody>
    </Card>
  );
}
