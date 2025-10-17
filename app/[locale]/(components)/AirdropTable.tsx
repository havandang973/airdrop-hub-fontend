'use client';
import React, { useState } from 'react';
import {
  Table as AntdTable,
  Card,
  ConfigProvider,
  theme,
  Spin,
  Empty,
  Badge,
  Tag,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTheme } from 'next-themes';
import GradientSlider from './Slider';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useGetAirdrops } from '@/lib/hooks/airdrop';
import { Chip } from '@heroui/chip';

interface AirdropData {
  id: string;
  title: string;
  slug: string;
  avatar?: string;
  raise?: string;
  status?: string;
  investors?: string;
  investoravatar?: string;
  date?: string;
  moniScore?: number;
}

const toNumber = (val: string) => {
  if (!val) return 0;
  const num = parseFloat(val.replace(/[^0-9.]/g, ''));
  if (val.includes('M')) return num * 1_000_000;
  if (val.includes('K')) return num * 1_000;
  return num;
};

const AirdropTable = () => {
  const [sortedInfo, setSortedInfo] = useState<any>({});
  const themeNext = useTheme();
  const locale = useLocale();
  const { data: airdrops, isLoading } = useGetAirdrops();

  const handleChange = (_: any, __: any, sorter: any) => {
    setSortedInfo(sorter);
  };

  const columns: ColumnsType<AirdropData> = [
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortOrder: sortedInfo.columnKey === 'title' ? sortedInfo.order : null,
      ellipsis: true,
      showSorterTooltip: false,
      render: (text, record) => (
        <Link
          href={`/${locale}/airdrop/${record.slug}`}
          className="flex items-center gap-2"
        >
          {record.avatar && (
            <img
              src={record.avatar}
              alt={text}
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
          <span className="font-semibold text-black dark:text-white hover:text-blue-500 transition-colors">
            {text}
          </span>
        </Link>
      ),
    },
    {
      title: 'Raise',
      dataIndex: 'raise',
      key: 'raise',
      align: 'right',
      width: 140,
      sorter: (a, b) => toNumber(a.raise || '') - toNumber(b.raise || ''),
      sortOrder: sortedInfo.columnKey === 'raise' ? sortedInfo.order : null,
      ellipsis: true,
      showSorterTooltip: false,
      onCell: () => ({
        style: { fontWeight: 600 },
      }),
      render: (text, record) => <span>{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => (a.status || '').localeCompare(b.status || ''),
      sortOrder: sortedInfo.columnKey === 'status' ? sortedInfo.order : null,
      ellipsis: true,
      showSorterTooltip: false,
      render: (text, record) => (
        <Tag color={text === 'active' ? 'green' : 'volcano'}>
          {text?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Funds and Investors',
      dataIndex: 'investors',
      key: 'investors',
      sorter: (a, b) => (a.investors || '').localeCompare(b.investors || ''),
      sortOrder: sortedInfo.columnKey === 'investors' ? sortedInfo.order : null,
      ellipsis: true,
      showSorterTooltip: false,
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {record.investoravatar && (
            <img
              src={record.investoravatar}
              alt={text}
              style={{ width: 24, height: 24, borderRadius: '50%' }}
            />
          )}
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) =>
        new Date(a.date || '').getTime() - new Date(b.date || '').getTime(),
      sortOrder: sortedInfo.columnKey === 'date' ? sortedInfo.order : null,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: 'Moni Score',
      dataIndex: 'moniScore',
      key: 'moniScore',
      sorter: (a, b) => (a.moniScore || 0) - (b.moniScore || 0),
      sortOrder: sortedInfo.columnKey === 'moniScore' ? sortedInfo.order : null,
      ellipsis: true,
      showSorterTooltip: false,
      render: (text, record) => (
        <div className="flex flex-col pointer-events-none">
          <span className="font-semibold">{record.moniScore}</span>
          <GradientSlider score={record.moniScore} />
        </div>
      ),
    },
  ];

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <Spin size="large" />
      </div>
    );

  if (!airdrops || airdrops.length === 0)
    return (
      <div className="flex justify-center py-10">
        <Empty description="No data found" />
      </div>
    );

  return (
    <div>
      {/* Mobile view */}
      <div className="flex flex-col gap-4 md:hidden">
        {airdrops.map((item: AirdropData) => (
          <Card key={item.id} className="p-4 rounded-md shadow-sm">
            <Link
              href={`/${locale}/airdrop/${item.slug}`}
              className="flex items-center gap-2"
            >
              {item.avatar && (
                <img
                  src={item.avatar}
                  alt={item.title}
                  style={{ width: 24, height: 24, borderRadius: '50%' }}
                />
              )}
              <span className="font-semibold text-black dark:text-white hover:text-blue-500 transition-colors">
                {item.title}
              </span>
            </Link>
            {item.raise && (
              <div className="flex justify-between text-sm mt-2">
                <span>Raise</span>
                <span className="font-semibold">{item.raise}</span>
              </div>
            )}
            {item.status && (
              <div className="flex justify-between text-sm">
                <span>Status</span>
                <span className="font-semibold">{item.status}</span>
              </div>
            )}
            {item.moniScore && (
              <div className="flex justify-between text-sm">
                <GradientSlider score={item.moniScore} />
                <span className="font-semibold">{item.moniScore}</span>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Desktop view */}
      <div className="hidden md:block">
        <ConfigProvider
          theme={{
            algorithm:
              themeNext.theme === 'dark'
                ? theme.darkAlgorithm
                : theme.defaultAlgorithm,
            token: {
              fontSize: 16,
              padding: 20,
            },
          }}
        >
          <AntdTable
            columns={columns}
            dataSource={airdrops}
            rowKey="id"
            onChange={handleChange}
            pagination={{ pageSize: 10 }}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default AirdropTable;
