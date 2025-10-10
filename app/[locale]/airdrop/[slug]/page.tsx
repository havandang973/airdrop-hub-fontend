'use client';

import { Avatar, Card, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { getAirdrop } from '../../../../lib/api/airdrop/getAirdrop';
import { useGetAirdrops } from '@/lib/hooks/airdrop';

export default function Page() {
  const { data: getAirdrop, isLoading } = useGetAirdrops();

  const [data, setData] = useState<any>(getAirdrop);
  console.log('getAirdrop', getAirdrop);

  useEffect(() => {
    setData(getAirdrop?.[0] || null);
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
          <div dangerouslySetInnerHTML={{ __html: data?.content }} />
        </div>

        <div className="flex gap-10 w-full">
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
        </div>
      </div>
    </div>
  );
}
