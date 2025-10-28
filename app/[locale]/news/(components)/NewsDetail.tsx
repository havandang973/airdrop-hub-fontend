'use client';

import { Card, Spin } from 'antd';
import { CalendarOutlined, EyeOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import { useGetPost, useGetPosts } from '@/lib/hooks/post';
import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import React, { useEffect, useState } from 'react';

export default function NewsDetailPage() {
  const locale = useLocale();
  const params = useParams() as { params?: string[] };

  // ✅ Nếu params chưa sẵn sàng thì return null để tránh lỗi
  if (!params || !params.params) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  const slug = params.params.length > 1 ? params.params[1] : params.params[0];

  const { data: article, isLoading } = useGetPost(slug, !!slug);
  const { data: recentPosts } = useGetPosts(true);
  const [post, setPost] = useState<any | null>(null);

  useEffect(() => {
    if (!isLoading && article) {
      setPost(article);
    }
  }, [article, isLoading]);

  // ✅ Nếu đang load hoặc chưa có slug
  if (isLoading || !slug) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  // ✅ Nếu không tìm thấy bài viết
  if (!post) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* MAIN ARTICLE */}
      <div className="lg:col-span-2">
        <Link
          href={`/${locale}/news`}
          className="text-blue-500 text-sm mb-4 inline-block"
        >
          ← Tin Tức
        </Link>

        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-gray-500 text-sm mb-6">
          <span>
            <CalendarOutlined className="mr-1" />
            {new Date(post.createdAt).toLocaleDateString('vi-VN')}
          </span>
          {post.view !== undefined && (
            <span>
              <EyeOutlined className="mr-1" />
              {post.view}
            </span>
          )}
        </div>

        {/* {post.thumbnail && (
          <Image
            src={post.thumbnail}
            alt={post.title}
            width={800}
            height={400}
            className="rounded-xl mb-6 object-cover"
          />
        )} */}

        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />

        <div className="mt-10 border-t pt-6 text-sm text-gray-600">
          <p>
            Mua bán USDT dễ dàng và an toàn tại sàn Aliniex. Môi trường giao
            dịch đáng tin cậy và hiệu quả.
          </p>
          <p className="mt-3">Theo dõi các tin tức mới nhất tại:</p>
          <ul className="list-disc list-inside text-blue-600">
            <li>
              <a href="https://t.me/Aliniex">Telegram Aliniex</a>
            </li>
            <li>
              <a href="https://aliniex.com/tin-tuc">Trang tin tức</a>
            </li>
            <li>
              <a href="https://aliniex.com/ho-tro">Trang khách hàng</a>
            </li>
          </ul>
          <p className="mt-6 font-medium">
            Tác giả: {post.createdByUser?.name || 'Ẩn danh'}
          </p>
        </div>
      </div>

      {/* SIDEBAR */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Bài viết mới nhất</h2>
        <div className="space-y-4">
          {recentPosts?.slice(0, 5).map((post: any) => (
            <Card
              key={post.id}
              hoverable
              bordered={false}
              className="flex gap-3 items-center shadow-sm rounded-xl"
            >
              <Image
                src={post.thumbnail || '/default-thumbnail.jpg'}
                alt={post.title}
                width={80}
                height={80}
                className="rounded-md object-cover"
              />
              <div className="flex-1">
                <Link
                  href={
                    post.category?.name
                      ? `/news/${post.category.name}/${post.slug}` // có category
                      : `/news/${post.slug}` // không có category
                  }
                  className="font-medium text-sm hover:text-blue-600 line-clamp-2"
                >
                  {post.title}
                </Link>
                <p className="text-gray-500 text-xs mt-1">
                  <CalendarOutlined className="mr-1" />
                  {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
