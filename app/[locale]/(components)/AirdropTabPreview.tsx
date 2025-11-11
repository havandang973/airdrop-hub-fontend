'use client';

import { useGetAirdrop, useGetAirdrops } from '@/lib/hooks/airdrop';
import { IconGift } from '@tabler/icons-react';

export default function AirdropTabPreview() {
  const { data, isLoading } = useGetAirdrops({
    page: 1,
    size: 1000,
  });

  const list = data?.data || [];
  const ongoing = list.filter((x: any) => x.status === 'active').length;
  const upcoming = list.filter((x: any) => x.status === 'inactive').length;
  const top = list[0]?.title || 'Đang cập nhật...';

  return (
    <div className="flex gap-2 flex-col p-4 rounded-2xl bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:border-green-500/40 hover:shadow-md transition-all duration-300 min-h-[140px]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <IconGift size={16} className="text-green-500" />
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Danh sách Airdrop
          </h3>
        </div>
        <span className="relative flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 ">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Live
        </span>
      </div>

      {isLoading ? (
        <div className="space-y-2 mt-2">
          <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2 text-sm mt-1">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                Đang diễn ra
              </p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {ongoing}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                Sắp tới
              </p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {upcoming}
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Nổi bật: <span className="text-green-500">{top}</span>
          </p>
        </>
      )}
    </div>
  );
}
