'use client';

import React, { useState, useMemo } from 'react';
import {
  Table as AntdTable,
  Card,
  ConfigProvider,
  theme,
  Spin,
  Empty,
  Tag,
  Input,
  Select,
  DatePicker,
  Button,
  Space,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTheme } from 'next-themes';
import { useLocale } from 'next-intl';
import { useGetAirdrops } from '@/lib/hooks/airdrop';
import { Avatar, AvatarGroup } from '@heroui/avatar';
import { Tooltip } from '@heroui/tooltip';
import Link from 'next/link';
import {
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

const { RangePicker } = DatePicker;

interface AirdropData {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  raise?: string;
  status?: string;
  date?: string;
  funds?: any[];
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
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [dateRange, setDateRange] = useState<any>();
  const [raiseFilter, setRaiseFilter] = useState<string | undefined>();
  const [fundFilter, setFundFilter] = useState<string | undefined>();

  const themeNext = useTheme();
  const locale = useLocale();
  const { data: airdrops, isLoading } = useGetAirdrops();

  const handleChange = (_: any, __: any, sorter: any) => setSortedInfo(sorter);

  /** ✅ Filter logic */
  const filteredData = useMemo(() => {
    if (!airdrops) return [];
    return airdrops.filter((item: AirdropData) => {
      const matchName = item.name
        ?.toLowerCase()
        .includes(searchText.toLowerCase());
      const matchStatus =
        !statusFilter || item.status?.toLowerCase() === statusFilter;
      const matchRaise =
        !raiseFilter || (item.raise && item.raise.includes(raiseFilter));
      const matchFund =
        !fundFilter ||
        item.funds?.some((f) =>
          f.fund?.name?.toLowerCase().includes(fundFilter.toLowerCase())
        );
      const matchDate =
        !dateRange ||
        (item.date &&
          new Date(item.date) >= dateRange[0]._d &&
          new Date(item.date) <= dateRange[1]._d);

      return matchName && matchStatus && matchDate && matchRaise && matchFund;
    });
  }, [airdrops, searchText, statusFilter, dateRange, raiseFilter, fundFilter]);

  const columns: ColumnsType<AirdropData> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      render: (text, record) => (
        <Link
          href={`/${locale}/airdrop/${record.slug}`}
          className="flex items-center gap-2"
        >
          {record.logo && (
            <img
              src={record.logo}
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
      render: (text) => <span>$ {text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => (a.status || '').localeCompare(b.status || ''),
      sortOrder: sortedInfo.columnKey === 'status' ? sortedInfo.order : null,
      render: (text) => (
        <Tag color={text === 'active' ? 'green' : 'volcano'}>
          {text?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Funds and Investors',
      dataIndex: 'funds',
      key: 'funds',
      render: (_, record) => {
        const funds = record?.funds || [];
        if (funds.length === 0) return <span style={{ color: '#999' }}>—</span>;

        return (
          <div className="flex items-center gap-2 max-w-[250px]">
            <AvatarGroup isBordered max={5} size="sm">
              {funds.map((item: any) => (
                <Tooltip key={item.id} content={item.fund?.name || 'Unknown'}>
                  <Link href={`/${locale}/funds/${item.fund?.slug || ''}`}>
                    <Avatar
                      src={item.fund?.logo}
                      name={item.fund?.name?.[0] || '?'}
                      size="sm"
                      alt={item.fund?.name}
                    />
                  </Link>
                </Tooltip>
              ))}
            </AvatarGroup>
          </div>
        );
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) =>
        new Date(a.date || '').getTime() - new Date(b.date || '').getTime(),
      sortOrder: sortedInfo.columnKey === 'date' ? sortedInfo.order : null,
    },
  ];

  /** Loading & Empty states */
  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <Spin size="large" />
      </div>
    );
  if (!airdrops)
    return (
      <div className="flex justify-center py-10">
        <Empty description="No data found" />
      </div>
    );

  return (
    <div>
      {/* ✅ Thanh filter hiện đại */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl p-3 mb-5 bg-white dark:bg-[#1f1f1f] shadow-sm">
        <Space wrap size="middle">
          <Input
            placeholder="Search name..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: '100%' }}
          />
          <Select
            placeholder="Status"
            allowClear
            value={statusFilter}
            onChange={(v) => setStatusFilter(v)}
            style={{ width: 140 }}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
          />
          <Select
            placeholder="Raise"
            allowClear
            value={raiseFilter}
            onChange={(v) => setRaiseFilter(v)}
            style={{ width: 120 }}
            options={[
              { value: '0.5M', label: '< 1M' },
              { value: '1M', label: '1M+' },
              { value: '5M', label: '5M+' },
            ]}
          />
          <Input
            placeholder="Search fund..."
            value={fundFilter}
            onChange={(e) => setFundFilter(e.target.value)}
            style={{ width: 160 }}
          />
          <RangePicker onChange={(val) => setDateRange(val)} />
        </Space>

        <Space>
          <Button
            icon={<FilterOutlined />}
            type="primary"
            className="bg-blue-500 hover:bg-blue-600"
          >
            Filter
          </Button>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => {
              setSearchText('');
              setStatusFilter(undefined);
              setRaiseFilter(undefined);
              setFundFilter(undefined);
              setDateRange(undefined);
            }}
          >
            Reset
          </Button>
        </Space>
      </div>

      {/* ✅ Bảng dữ liệu */}
      <ConfigProvider
        theme={{
          algorithm:
            themeNext.theme === 'dark'
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
          token: { fontSize: 16, padding: 20 },
        }}
      >
        <AntdTable
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          onChange={handleChange}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 700 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default AirdropTable;
