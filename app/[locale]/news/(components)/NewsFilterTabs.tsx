'use client';
import { Tabs } from 'antd';
import { IconNews, IconCoin, IconBook2, IconStack } from '@tabler/icons-react';

const items = [
  { key: 'all', label: 'Tất cả', icon: <IconStack size={18} /> },
  { key: 'airdrop', label: 'Tin tức Airdrop', icon: <IconNews size={18} /> },
  { key: 'crypto', label: 'Tin tức Crypto', icon: <IconCoin size={18} /> },
  { key: 'nft', label: 'Tin tức NFT', icon: <IconBook2 size={18} /> },
  {
    key: 'research',
    label: 'Nghiên cứu',
    icon: <IconBook2 size={18} />,
  },
];

export default function NewsFilterTabs({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <Tabs
      centered
      items={items.map((i) => ({
        key: i.key,
        label: (
          <div className="flex items-center gap-1">
            {i.icon}
            {i.label}
          </div>
        ),
      }))}
      activeKey={value}
      onChange={onChange}
    />
  );
}
