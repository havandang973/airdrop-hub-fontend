'use client';

import { Avatar, Card } from 'antd';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function Page() {
  const trans = useTranslations();
  const params = useParams();

  const slug = params?.slug;
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
        {/* Avatar + Name */}
        <div className="flex gap-5 items-center">
          <Avatar
            size={{ xs: 60, sm: 80, md: 80, lg: 100, xl: 100, xxl: 100 }}
            src="https://img.cryptorank.io/coins/base_vol1759229258847.png"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-xl md:text-2xl">BaseVol</span>
            <span className="text-sm text-gray-400">BaseVol</span>
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1">
          <span className="text-sm">Status</span>
          <span className="font-semibold text-xl md:text-2xl text-blue-500">
            Funding Round
          </span>
        </div>

        {/* Raised */}
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500">Total raised</span>
          <span className="font-semibold text-xl md:text-2xl">$ 3M</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-3 gap-4">
        <div>
          <h1 className="font-semibold text-xl md:text-2xl">
            Funding Insights
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Discover fundraising information: Funding Rounds, return on
            investment (ROI), prices of investors, and funds raised by BaseVol.
            Review the white paper, team, and financial overview.
          </p>
          <h1 className="font-semibold text-xl md:text-2xl">Title</h1>
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
