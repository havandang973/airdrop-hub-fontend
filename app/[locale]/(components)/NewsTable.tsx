'use client';

import { useGetPosts } from '@/lib/hooks/post';
import { Link } from '@heroui/link';
import { Card, Skeleton, Tag } from 'antd';
import Image from 'next/image';
import { useLocale } from 'next-intl';

export default function NewsTable() {
  const { data, isLoading } = useGetPosts(true, 'all');

  if (isLoading) {
    return (
      <Card className="p-6 dark:!bg-black">
        <Skeleton active paragraph={{ rows: 6 }} />
      </Card>
    );
  }

  const latestNews = (data || []).slice(0, 10);
  const locale = useLocale();
  return (
    // <Card className="p-6 dark:!bg-black">
    <div className="flex flex-col gap-4">
      {latestNews.map((item: any) => (
        <Card key={item.id} className="w-full">
          <Link
            href={`/${locale}/news/${item.slug}`}
            className="flex items-center gap-4 rounded-lg transition-all duration-200 cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="w-20 h-20 relative flex-shrink-0 rounded-md overflow-hidden">
              <Image
                src={item.thumbnail || '/default-thumb.jpg'}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Nội dung tin */}
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white line-clamp-2 transition-colors">
                {item.title}
              </p>

              <div className="flex justify-between items-center mt-2 text-xs">
                <Tag color="blue" className="m-0 text-xs px-2 py-0.5 rounded">
                  {item.category?.name || 'Uncategorized'}
                </Tag>
                <span className="text-gray-500 dark:text-gray-400">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString('vi-VN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })
                    : ''}
                </span>
              </div>
            </div>
          </Link>
        </Card>
      ))}

      {latestNews.length === 0 && (
        <p className="text-center text-gray-400">Không có tin nào.</p>
      )}
    </div>
    // </Card>
  );
}
