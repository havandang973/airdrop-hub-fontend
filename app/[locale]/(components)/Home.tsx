'use client';
import Image from 'next/image';
import { Carousel, ConfigProvider } from 'antd';
import { Divider } from '@heroui/divider';
import { useGetPosts } from '@/lib/hooks/post';
import { Link } from '@heroui/link';
import { useLocale } from 'next-intl';

export default function Home() {
  const { data, isLoading } = useGetPosts(true, 'all');
  const posts = data ?? [];
  const locale = useLocale();
  // ✅ Lọc bài viết
  const heroPosts: any = posts
    .filter((p) => p.pin_to_home && !p.pin)
    .slice(0, 5);
  const carouselPosts = posts
    .filter((p) => p.pin || p.pin_to_home)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ); // sắp xếp bài mới nhất lên đầu

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto space-y-8">
      {/* Hero section */}
      {heroPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Bài lớn */}
          <Link
            href={
              heroPosts[0].category?.name
                ? `/${locale}/news/${heroPosts[0].category.name}/${heroPosts[0].slug}` // có category
                : `/${locale}/news/${heroPosts[0].slug}` // không có category
            }
            key={heroPosts.id}
            className="md:col-span-3 relative rounded-2xl overflow-hidden"
          >
            <Image
              src={heroPosts[0].thumbnail}
              alt={heroPosts[0].title}
              width={800}
              height={400}
              className="object-cover w-full h-[400px]"
            />
            <div className="w-full absolute bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
              <h2 className="text-2xl font-semibold">{heroPosts[0].title}</h2>
            </div>
          </Link>

          {/* 4 bài nhỏ */}
          <div className="grid grid-cols-2 md:col-span-2 gap-4 w-full">
            {heroPosts.slice(1, 5).map((post: any) => (
              <Link
                href={
                  post.category?.name
                    ? `/${locale}/news/${post.category.name}/${post.slug}` // có category
                    : `/${locale}/news/${post.slug}` // không có category
                }
                key={post.id}
                className="relative rounded-2xl overflow-hidden"
              >
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="object-cover w-full h-[190px]"
                />
                <div className="w-full absolute bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <h3 className="text-sm font-medium">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <Divider />

      {/* Carousel */}
      {carouselPosts.length > 0 && (
        <ConfigProvider
          theme={{
            components: {
              Carousel: {
                arrowSize: 30,
                arrowOffset: 20,
                dotHeight: 5,
                dotWidth: 20,
                dotGap: 8,
                dotActiveWidth: 32,
              },
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
                breakpoint: 768, // dưới 768px (mobile)
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 1024, // dưới 1024px (tablet)
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
            ]}
          >
            {carouselPosts.map((post) => (
              <Link
                href={
                  post.category?.name
                    ? `/${locale}/news/${post.category.name}/${post.slug}` // có category
                    : `/${locale}/news/${post.slug}` // không có category
                }
                key={post.id}
                className="px-2 pb-2"
              >
                <div className="rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-200">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="object-fill w-full h-[200px]"
                  />
                  <div className="p-3">
                    <h4 className="font-semibold text-base">{post.title}</h4>
                  </div>
                </div>
              </Link>
            ))}
          </Carousel>
          <style jsx global>{`
            .ant-carousel .slick-dots li button {
              background: #d1d5db !important;
              opacity: 1 !important;
            }
            .ant-carousel .slick-dots li.slick-active::after {
              background: #006fee !important;
              border-radius: 8px !important;
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
