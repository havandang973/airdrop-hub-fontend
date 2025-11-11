'use client';

import { Input } from '@heroui/input';

export default function NewsSearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex justify-center">
      <Input
        type="text"
        placeholder="Tìm kiếm từ khóa"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size="md"
        radius="lg"
        className="max-w-md "
        classNames={{
          inputWrapper:
            'dark:bg-gray-800 dark:text-white dark:border-gray-700 border border-gray-300',
          input: 'dark:text-white text-black ',
        }}
        endContent={
          <button
            onClick={() => console.log('Tìm kiếm:', value)}
            className="w-1/3 h-full -mr-3 text-sm font-medium bg-blue-500 text-white rounded-r-md hover:bg-blue-700 cursor-pointer"
          >
            Tìm kiếm
          </button>
        }
      />
    </div>
  );
}
