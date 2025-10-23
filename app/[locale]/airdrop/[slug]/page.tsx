'use client';

import { Avatar, Card, Spin } from 'antd';
import { Avatar as HeroAvatar, AvatarGroup } from '@heroui/avatar';
import { useEffect, useState } from 'react';
import { useGetAirdrop, useGetAirdropPost } from '@/lib/hooks/airdrop';
import { useParams } from 'next/navigation';
import { IconPointFilled } from '@tabler/icons-react';
import { Tooltip } from '@heroui/tooltip';
import { Link } from '@heroui/link';
import { useLocale } from 'next-intl';

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
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
        {/* Logo + Tên airdrop */}
        <div className="flex gap-5 items-center">
          <Avatar
            size={{ xs: 60, sm: 80, md: 80, lg: 100, xl: 100, xxl: 100 }}
            src={
              selectedAirdrop?.logo ??
              'https://img.cryptorank.io/coins/base_vol1759229258847.png'
            }
          />
          <div className="flex flex-col">
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
          <span className="text-sm">Status</span>
          <span className="font-semibold text-xl md:text-2xl text-blue-500 capitalize">
            {selectedAirdrop?.status ?? 'N/A'}
          </span>
        </div>

        {/* Tổng số vốn raise */}
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500">Total raised</span>
          <span className="font-semibold text-xl md:text-2xl">
            {selectedAirdrop?.raise ? `$ ${selectedAirdrop.raise}` : 'N/A'}
          </span>
        </div>

        {/* Danh sách quỹ */}
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-500">Funds and Investors</span>
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
        <h1 className="font-semibold text-xl md:text-2xl">Airdrop Posts</h1>

        {!airdropPosts.length ? (
          <div className="text-gray-500 italic">No posts available.</div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* LEFT - Danh sách post */}
            <div className="w-full lg:w-[30%] !space-y-4 sticky top-5 h-fit">
              {airdropPosts.map((post: any) => (
                <Card
                  key={post.id}
                  hoverable
                  onClick={() => {
                    const el = document.getElementById(`post-${post.id}`);
                    if (el)
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="!border-gray-200 border transition-all hover:!border-blue-400"
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg">{post.name}</h3>
                    <div className="flex justify-between text-gray-500 mt-1">
                      <div className="flex items-center">
                        <IconPointFilled
                          size={18}
                          className={
                            post.status === 'Compeleted'
                              ? 'text-green-500'
                              : 'text-red-500'
                          }
                        />
                        <span>{post.status ?? 'N/A'}</span>
                      </div>
                      <span>
                        📅{' '}
                        {post.date
                          ? new Date(post.date).toLocaleDateString()
                          : 'No date'}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* RIGHT - Nội dung post */}
            <div className="w-full lg:w-[70%] space-y-6">
              {airdropPosts.map((post: any) => (
                <div
                  key={post.id}
                  id={`post-${post.id}`}
                  className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm scroll-mt-24"
                >
                  <h2 className="text-xl font-semibold mb-3">{post.name}</h2>
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content || '' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
