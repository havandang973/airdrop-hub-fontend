'use client';

import { IconTrendingUp } from '@tabler/icons-react';

export default function MarketTabPreview() {
  const market = [
    { name: 'BTC', price: '67,245.12', change: '+2.35%' },
    { name: 'ETH', price: '3,245.76', change: '-1.12%' },
    { name: 'BNB', price: '589.22', change: '+0.83%' },
  ];

  const top = market[0];
  const totalUp = market.filter((x) => x.change.startsWith('+')).length;
  const totalDown = market.filter((x) => x.change.startsWith('-')).length;

  return (
    <div className="flex gap-2 h-full flex-col p-4 rounded-2xl bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:border-blue-500/40 hover:shadow-md transition-all duration-300 min-h-[140px]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <IconTrendingUp size={16} className="text-green-500" />
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Tổng quan thị trường
          </h3>
        </div>
        <span className="relative flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 ">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          Live
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm mt-1">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-xs">Tăng</p>
          <p className="font-semibold text-green-500">{totalUp}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-xs">Giảm</p>
          <p className="font-semibold text-red-500">{totalDown}</p>
        </div>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Nổi bật:{' '}
        <span className="text-blue-500 font-medium">
          {top.name} ${top.price} ({top.change})
        </span>
      </p>
    </div>
  );
}
