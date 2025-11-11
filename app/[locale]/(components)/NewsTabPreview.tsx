'use client';

import { IconPaperBag } from '@tabler/icons-react';

export default function NewsTabPreview() {
  return (
    <div className="flex h-full flex-col justify-between p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-white dark:from-gray-800/80 dark:to-gray-900 border border-blue-100 dark:border-gray-700 hover:shadow-md hover:border-blue-400/50 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <IconPaperBag size={20} className="text-blue-500" />
          </div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Tin tức thị trường
          </h3>
        </div>
        <span className="relative flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Live
        </span>
      </div>

      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 whitespace-normal break-words min-w-0">
        Cập nhật tin tức thị trường mới nhất trong thời gian thực.
      </p>
    </div>
  );
}
