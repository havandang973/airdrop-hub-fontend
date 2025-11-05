'use client';

import { Card, ConfigProvider, Spin } from 'antd';
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
  const { data: recentPosts } = useGetPosts({
    page: 1,
    size: 5,
    category: 'all',
    visibility: 1,
  });
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
    <div className="w-full mx-auto  py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
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
          {/* {post.view !== undefined && (
            <span>
              <EyeOutlined className="mr-1" />
              {post.view}
            </span>
          )} */}
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
      </div>

      {/* SIDEBAR */}
      <div className="lg:col-span-1">
        <div className="sticky top-20">
          <h2 className="text-lg font-semibold mb-4">Bài viết mới nhất</h2>
          <div className="!space-y-5">
            {recentPosts?.data.map((post: any) => (
              <ConfigProvider
                key={post.id}
                theme={{
                  components: {
                    Card: {
                      bodyPadding: 10,
                    },
                  },
                }}
              >
                <Card
                  hoverable
                  bordered={false}
                  className="flex items-center shadow-sm rounded-xl"
                >
                  <div className="flex gap-4">
                    <Image
                      src={post.thumbnail || '/default-thumbnail.jpg'}
                      alt={post.title}
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                    />

                    <div className="flex-1">
                      <Link
                        href={
                          post.category?.name
                            ? `/${locale}/news/${post.category.name}/${post.slug}`
                            : `/${locale}/news/${post.slug}`
                        }
                        className="font-medium text-base hover:text-blue-600 line-clamp-2"
                      >
                        {post.title}
                      </Link>
                      <p className="text-gray-500 text-sm mt-1">
                        <CalendarOutlined className="mr-1" />
                        {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                </Card>
              </ConfigProvider>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
