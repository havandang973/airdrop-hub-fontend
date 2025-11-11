'use client';

import { IconStack } from '@tabler/icons-react';
import { useGetCategories } from '@/lib/hooks/category';
import { Spinner } from '@heroui/spinner';
import { Tabs, Tab } from '@heroui/tabs';
export default function NewsFilterTabs({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const { data: categories, isLoading } = useGetCategories();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Spinner />
      </div>
    );
  }

  // 🟢 Mặc định luôn có tab "Tất cả"
  const tabs = [
    { key: 'all', label: 'Tất cả', icon: <IconStack size={18} /> },
    ...(categories?.map((cat: any) => ({
      key: cat.slug || cat.name,
      label: cat.name,
      icon: <IconStack size={18} />,
    })) || []),
  ];

  return (
    <div className="flex justify-center">
      <Tabs
        aria-label="News categories"
        selectedKey={value}
        onSelectionChange={(key: any) => onChange(key as string)}
        color="primary"
        variant="underlined"
        classNames={{
          tabList: 'gap-6',
          tab: 'text-gray-700 dark:text-gray-300 data-[selected=true]:text-blue-600 dark:data-[selected=true]:text-blue-400',
          cursor: 'bg-blue-600 dark:bg-blue-400',
        }}
      >
        {tabs.map((item) => (
          <Tab
            key={item.key}
            title={
              <div className="flex items-center gap-1">
                {item.icon}
                <span>{item.label}</span>
              </div>
            }
          />
        ))}
      </Tabs>
    </div>
  );
}
