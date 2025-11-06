'use client';
import Image from 'next/image';
import { Carousel, ConfigProvider } from 'antd';
import { Divider } from '@heroui/divider';
import { useGetPosts } from '@/lib/hooks/post';
import { Link } from '@heroui/link';
import { useLocale } from 'next-intl';
import { useState } from 'react';

export default function Home() {
  const [filters] = useState({
    title: '',
    category: 'all',
    visibility: 1,
    page: 1,
    size: 10,
  });

  const { data: posts, isLoading } = useGetPosts(filters);
  const locale = useLocale();

  const heroPosts: any = posts?.data
    ?.filter((p: any) => p.pin_to_home && !p.pin)
    ?.slice(0, 5);

  const carouselPosts = posts?.data
    ?.filter((p: any) => p.pin || p.pin_to_home)
    ?.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[300px] text-gray-500 dark:text-gray-400">
        Loading...
      </div>
    );

  return (
    <div className="container mx-auto space-y-6 px-4">
      {/* 📰 Hero section */}
      {heroPosts?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Bài lớn */}
          <Link
            href={
              heroPosts[0].category?.name
                ? `/${locale}/news/${heroPosts[0].category.name}/${heroPosts[0].slug}`
                : `/${locale}/news/${heroPosts[0].slug}`
            }
            key={heroPosts[0].id}
            className="md:col-span-3 relative rounded-2xl overflow-hidden group"
          >
            <Image
              src={heroPosts[0].thumbnail}
              alt={heroPosts[0].title}
              width={800}
              height={400}
              className="object-cover w-full h-[400px] transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-0 p-6 text-white">
              <h2 className="text-2xl font-semibold line-clamp-2">
                {heroPosts[0].title}
              </h2>
            </div>
          </Link>

          {/* 4 bài nhỏ */}
          <div className="grid grid-cols-2 md:col-span-2 gap-4 w-full">
            {heroPosts.slice(1, 5).map((post: any) => (
              <Link
                href={
                  post.category?.name
                    ? `/${locale}/news/${post.category.name}/${post.slug}`
                    : `/${locale}/news/${post.slug}`
                }
                key={post.id}
                className="relative rounded-2xl overflow-hidden group"
              >
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="object-cover w-full h-[190px] transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="text-sm font-medium line-clamp-2">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <Divider className="dark:border-gray-700" />

      {/* 🌀 Carousel section */}
      {carouselPosts?.length > 0 && (
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: '#0f172a', // dark slate
              colorText: '#e2e8f0',
              colorPrimary: '#006fee',
            },
          }}
        >
          <Carousel
            dots
            slidesToShow={4}
            slidesToScroll={1}
            arrows
            infinite
            autoplay
            responsive={[
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
            ]}
          >
            {carouselPosts.map((post: any) => (
              <Link
                href={
                  post.category?.name
                    ? `/${locale}/news/${post.category.name}/${post.slug}`
                    : `/${locale}/news/${post.slug}`
                }
                key={post.id}
                className="px-2 pb-2"
              >
                <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all border border-gray-200 group">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="object-cover w-full h-[200px] transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-3">
                    <h4 className="font-semibold text-base text-gray-800 dark:text-gray-100 line-clamp-2">
                      {post.title}
                    </h4>
                  </div>
                </div>
              </Link>
            ))}
          </Carousel>

          {/* ✅ Style dark mode cho dots */}
          <style jsx global>{`
            .ant-carousel .slick-dots li button {
              background: #94a3b8 !important;
              opacity: 1 !important;
            }
            .ant-carousel .slick-dots li.slick-active button {
              background: #006fee !important;
            }
            .ant-carousel .slick-dots-bottom {
              bottom: -20px !important;
            }
          `}</style>
        </ConfigProvider>
      )}
    </div>
  );
}
