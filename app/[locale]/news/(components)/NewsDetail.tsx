'use client';

import { Card, ConfigProvider, Spin } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import { useGetPost, useGetPosts } from '@/lib/hooks/post';
import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import React, { useEffect, useState } from 'react';

export default function NewsDetailPage() {
  const locale = useLocale();
  const params = useParams() as { params?: string[] };
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);

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
    size: 6,
    category: 'all',
    visibility: 1,
  });
  const [post, setPost] = useState<any | null>(null);

  useEffect(() => {
    if (!isLoading && article) {
      setPost(article);
    }
  }, [article, isLoading]);

  if (isLoading || !slug) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 text-gray-900 dark:text-gray-100">
      {/* MAIN ARTICLE */}
      <div className="lg:col-span-2">
        <Link
          href={`/${locale}/news`}
          className="text-blue-500 dark:text-blue-400 text-sm mb-4 inline-block hover:underline"
        >
          ← Tin Tức
        </Link>

        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm mb-6">
          <span>
            <CalendarOutlined className="mr-1" />
            {new Date(post.createdAt).toLocaleDateString('vi-VN')}
          </span>
        </div>

        <div
          className="prose prose-sm max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
          onClick={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.tagName === 'IMG') {
              e.preventDefault();
              e.stopPropagation();
              setZoomSrc(target.src);
            }
          }}
        />

        {zoomSrc && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm cursor-zoom-out transition-opacity duration-300"
            onClick={() => setZoomSrc(null)}
          >
            <img
              src={zoomSrc}
              alt="Zoomed"
              className="max-w-[80vw] max-h-[80vh] rounded-xl shadow-2xl object-contain transform transition-transform duration-300 ease-in-out hover:scale-[1.02]"
            />
            <button
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2"
              onClick={() => setZoomSrc(null)}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* SIDEBAR */}
      <div className="lg:col-span-1">
        <div className="sticky top-20">
          <h2 className="text-lg font-semibold mb-4">Bài viết mới nhất</h2>
          <div className="!space-y-5">
            {recentPosts?.data
              .filter((p: any) => p.id !== post.id)
              .map((post: any) => (
                <ConfigProvider
                  key={post.id}
                  theme={{
                    token: {
                      colorBgContainer: 'transparent',
                      colorText: '#fff',
                    },
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
                    className="flex items-center shadow-sm rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700"
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
                          className="font-medium text-base hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2"
                        >
                          {post.title}
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
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
