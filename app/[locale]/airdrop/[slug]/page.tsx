'use client';

import { Avatar, Spin } from 'antd';
import { Avatar as HeroAvatar, AvatarGroup } from '@heroui/avatar';
import { useEffect, useState } from 'react';
import { useGetAirdrop, useGetAirdropPost } from '@/lib/hooks/airdrop';
import { useParams } from 'next/navigation';
import { IconPointFilled } from '@tabler/icons-react';
import { Tooltip } from '@heroui/tooltip';
import { Link } from '@heroui/link';
import { useLocale } from 'next-intl';
import { ScrollShadow } from '@heroui/scroll-shadow';
import { Divider } from '@heroui/divider';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Chip } from '@heroui/chip';

interface AirdropPost {
  id: number;
  name: string;
  status: string;
  date: string | null;
  content: string;
}

export default function AirdropDetailPage() {
  const params = useParams();
  const locale = useLocale();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);

  // Lấy dữ liệu Airdrop chính
  const { data: airdrop, isLoading } = useGetAirdrop(slug as string, !!slug);
  const [selectedAirdrop, setSelectedAirdrop] = useState<any>(airdrop);

  useEffect(() => {
    setSelectedAirdrop(airdrop || null);
  }, [airdrop]);

  // Lấy danh sách bài post của Airdrop
  const { data: airdropPostData } = useGetAirdropPost(
    selectedAirdrop?.id as number,
    !!selectedAirdrop?.id
  );

  const [airdropPosts, setAirdropPosts] = useState<AirdropPost[]>([]);

  useEffect(() => {
    setAirdropPosts(
      Array.isArray(airdropPostData?.posts) ? airdropPostData.posts : []
    );
  }, [airdropPostData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <Link
        href={`/${locale}/airdrop`}
        className="text-blue-500 text-sm inline-block mb-5"
      >
        ← Airdrop
      </Link>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
        {/* Logo + Tên airdrop */}

        <div className="flex gap-5 items-center">
          <div>
            <Avatar
              size={{ xs: 60, sm: 80, md: 80, lg: 100, xl: 100, xxl: 100 }}
              src={
                selectedAirdrop?.logo ??
                'https://img.cryptorank.io/coins/base_vol1759229258847.png'
              }
            />
          </div>

          <div className="flex flex-col w-[600px]">
            <span className="font-semibold text-xl md:text-2xl">
              {selectedAirdrop?.name}
            </span>
            <span className="text-sm text-gray-400">
              {selectedAirdrop?.description}
            </span>
          </div>
        </div>

        {/* Trạng thái */}
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500">Trạng thái</span>
          <span className="font-semibold text-xl md:text-2xl text-blue-500 capitalize">
            {selectedAirdrop?.status ?? 'N/A'}
          </span>
        </div>

        {/* Tổng số vốn raise */}
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500">Vốn huy động</span>
          <span className="font-semibold text-xl md:text-2xl">
            {selectedAirdrop?.raise ? `$ ${selectedAirdrop.raise}M` : 'N/A'}
          </span>
        </div>

        {/* Danh sách quỹ */}
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-500">Quỹ và nhà đầu tư</span>
          <div className="flex items-center gap-2 max-w-[250px] ml-2.5">
            <AvatarGroup isBordered max={5} size="sm">
              {selectedAirdrop?.funds?.length ? (
                selectedAirdrop.funds.map((fund: any) => (
                  <Tooltip key={fund.id} content={fund?.name || 'Unknown'}>
                    <Link href={`/${locale}/funds/${fund?.slug || ''}`}>
                      <HeroAvatar
                        src={fund?.logo}
                        name={fund?.name?.[0] || '?'}
                        size="sm"
                        alt={fund?.name}
                      />
                    </Link>
                  </Tooltip>
                ))
              ) : (
                <span>N/A</span>
              )}
            </AvatarGroup>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col gap-6">
        <h1 className="font-semibold text-xl md:text-2xl text-gray-700">
          Hướng dẫn hoàn thành nhiệm vụ và hoạt động cho {selectedAirdrop?.name}
        </h1>

        {!airdropPosts.length ? (
          <div className="text-gray-500 italic">No posts available.</div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* LEFT - Danh sách post */}
            <ScrollShadow
              orientation="horizontal"
              className="flex gap-3 w-full overflow-x-auto lg:w-[30%] lg:flex-col h-fit max-h-[80vh] lg:sticky top-5"
            >
              {airdropPosts
                .sort(
                  (a: any, b: any) =>
                    Date.parse(b.createdAt) - Date.parse(a.createdAt)
                )
                .map((post) => (
                  <Card
                    key={post.id}
                    isPressable
                    onPress={() => {
                      const el = document.getElementById(`post-${post.id}`);
                      if (el)
                        el.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        });
                    }}
                    className={`min-w-[300px] transition-all border border-default-200 hover:border-primary p-2  ${
                      post.status === 'Closed' ? 'opacity-50' : ''
                    }`}
                  >
                    <CardHeader className="flex flex-col items-start gap-5">
                      <h3 className="font-semibold text-lg">{post.name}</h3>
                      <div className="flex justify-between items-center w-full text-sm text-default-500">
                        <div className="flex items-center gap-1">
                          <IconPointFilled
                            size={16}
                            className={
                              post.status === 'Open'
                                ? 'text-success'
                                : 'text-danger'
                            }
                          />
                          <Chip
                            size="sm"
                            color={
                              post.status === 'Open' ? 'success' : 'danger'
                            }
                            variant="flat"
                          >
                            {post.status ?? 'N/A'}
                          </Chip>
                        </div>
                        <span>
                          📅{' '}
                          {post.date
                            ? new Date(post.date).toLocaleDateString()
                            : 'No date'}
                        </span>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
            </ScrollShadow>

            {/* RIGHT - Nội dung post */}
            <div className="w-full lg:w-[70%] space-y-6">
              {airdropPosts.map((post) => (
                <Card
                  key={post.id}
                  id={`post-${post.id}`}
                  className={`border border-default-200 shadow-sm scroll-mt-24 p-4 ${
                    post.status === 'Closed' ? 'opacity-50' : ''
                  }`}
                >
                  <CardHeader>
                    <h2 className="text-xl font-semibold">{post.name}</h2>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <div
                      className="prose prose-sm dark:prose-invert max-w-none"
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
                  </CardBody>

                  {/* Overlay Zoom Image */}
                  {zoomSrc && (
                    <div
                      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/10 backdrop-blur-sm cursor-zoom-out transition-opacity duration-300"
                      onClick={() => setZoomSrc(null)}
                    >
                      <img
                        src={zoomSrc}
                        alt="Zoomed"
                        className="max-w-[80vw] max-h-[80vh] rounded-xl shadow-2xl object-contain transform scale-100 transition-transform duration-300 ease-in-out hover:scale-[1.02]"
                      />
                      {/* nút đóng nhỏ góc trên phải */}
                      <button
                        className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2"
                        onClick={() => setZoomSrc(null)}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
