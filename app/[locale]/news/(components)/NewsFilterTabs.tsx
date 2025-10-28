'use client';

import { Tabs, Spin } from 'antd';
import { IconStack } from '@tabler/icons-react';
import { useGetCategories } from '@/lib/hooks/category';

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
        <Spin />
      </div>
    );
  }

  // 🟢 Mặc định luôn có tab "Tất cả"
  const tabs = [
    { key: 'all', label: 'Tất cả', icon: <IconStack size={18} /> },
    ...(categories?.map((cat: any) => ({
      key: cat.slug || cat.name, // dùng slug nếu có
      label: cat.name,
      icon: <IconStack size={18} />,
    })) || []),
  ];

  return (
    <Tabs
      centered
      items={tabs.map((item) => ({
        key: item.key,
        label: (
          <div className="flex items-center gap-1">
            {item.icon}
            {item.label}
          </div>
        ),
      }))}
      activeKey={value}
      onChange={onChange}
    />
  );
}
