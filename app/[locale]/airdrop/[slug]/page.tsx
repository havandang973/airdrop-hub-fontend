'use client';

import { Avatar, Card, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useGetAirdrop, useGetAirdrops } from '@/lib/hooks/airdrop';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  console.log('🚀 slug:', slug);
  const { data: getAirdrop, isLoading } = useGetAirdrop(slug as string, !!slug);
  console.log('🚀 getAirdrop:', getAirdrop);
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);

  const [data, setData] = useState<any>(getAirdrop);

  useEffect(() => {
    setData(getAirdrop || null);
  }, [getAirdrop]);

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
        {/* Avatar + Name */}
        <div className="flex gap-5 items-center">
          <Avatar
            size={{ xs: 60, sm: 80, md: 80, lg: 100, xl: 100, xxl: 100 }}
            src={
              data?.avatar ??
              'https://img.cryptorank.io/coins/base_vol1759229258847.png'
            }
          />
          <div className="flex flex-col">
            <span className="font-semibold text-xl md:text-2xl">
              {data?.title}
            </span>
            <span className="text-sm text-gray-400">{data?.slug}</span>
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1">
          <span className="text-sm">Status</span>
          <span className="font-semibold text-xl md:text-2xl text-blue-500">
            {data?.status ?? 'N/A'}
          </span>
        </div>

        {/* Raised */}
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500">Total raised</span>
          <span className="font-semibold text-xl md:text-2xl">
            {data?.totalRaise ? `$ ${data?.totalRaise}` : 'N/A'}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-3 gap-4">
        <div>
          <h1 className="font-semibold text-xl md:text-2xl">
            Funding Insights
          </h1>
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: data?.content || '' }}
            onClick={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.tagName === 'IMG') {
                setZoomSrc(target.src);
              }
            }}
          />
        </div>

        {zoomSrc && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out"
            onClick={() => setZoomSrc(null)}
          >
            <img
              src={zoomSrc}
              alt="Zoomed image"
              className="max-w-[95vw] max-h-[95vh] rounded-xl shadow-2xl object-contain transition-transform duration-300"
            />
          </div>
        )}

        {/* <div className="flex gap-10 w-full">
          <div className="flex-3 !space-y-5">
            <Card title="Card title" className="!border-2 !border-gray-200">
              Card content
            </Card>
            <Card title="Card title" className="!border-2 !border-gray-200">
              Card content
            </Card>
            <Card title="Card title" className="!border-2 !border-gray-200">
              Card content
            </Card>
          </div>
          <div className="flex-1">
            <Card title="Card title" className="!border-2 !border-gray-200">
              Card content
            </Card>
          </div>
        </div> */}
      </div>
    </div>
  );
}
