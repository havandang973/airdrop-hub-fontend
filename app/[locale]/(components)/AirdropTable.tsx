'use client';

import React, { useEffect, useState } from 'react';
import {
  Table,
  ConfigProvider,
  theme,
  Tag,
  Input,
  Select,
  DatePicker,
  Button,
  Space,
} from 'antd';
import { useTheme } from 'next-themes';
import { useLocale } from 'next-intl';
import { useGetAirdrops } from '@/lib/hooks/airdrop';
import Link from 'next/link';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { toNumber } from 'lodash';
import { Avatar, AvatarGroup } from '@heroui/avatar';
import { Tooltip } from '@heroui/tooltip';
import { Time } from '@/lib/helpers/Time';

const { RangePicker } = DatePicker;

const AirdropTable = () => {
  const themeNext = useTheme();
  const locale = useLocale();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // --- Filters & Pagination ---
  const [filters, setFilters] = useState({
    name: '',
    status: undefined as string | undefined,
    fund: '',
    startDate: undefined as string | undefined,
    endDate: undefined as string | undefined,
    minRaise: undefined as number | undefined,
    maxRaise: undefined as number | undefined,
    page,
    size: pageSize,
  });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, page, size: pageSize }));
  }, [page, pageSize]);

  const { data, isLoading } = useGetAirdrops(filters);
  const airdrops = data?.data || [];
  const total = data?.pagination?.total || 0;
  const [sortedInfo, setSortedInfo] = useState<any>({});
  const handleChange = (_: any, __: any, sorter: any) => setSortedInfo(sorter);

  // --- Columns ---
  const columns: any = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      render: (text: string, record: any) => (
        <Link
          href={`/${locale}/airdrop/${record.slug}`}
          className="font-semibold text-black dark:text-white hover:text-blue-500 transition-colors"
        >
          {record.logo && (
            <img
              src={record.logo}
              alt={text}
              className="w-8 h-8 rounded-full inline-block mr-2"
            />
          )}
          {text}
        </Link>
      ),
    },
    {
      title: 'Raise',
      dataIndex: 'raise',
      key: 'raise',
      align: 'right',
      sorter: (a: any, b: any) =>
        toNumber(a.raise || '') - toNumber(b.raise || ''),
      sortOrder: sortedInfo.columnKey === 'raise' ? sortedInfo.order : null,
      render: (text: string) => <span>$ {text} M</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a: any, b: any) =>
        (a.status || '').localeCompare(b.status || ''),
      sortOrder: sortedInfo.columnKey === 'status' ? sortedInfo.order : null,
      render: (text: string) => (
        <Tag color={text === 'active' ? 'green' : 'volcano'}>
          {text?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Funds and Investors',
      dataIndex: 'funds',
      key: 'funds',
      render: (_: any, record: any) => {
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
      sorter: (a: any, b: any) =>
        new Date(a.date || '').getTime() - new Date(b.date || '').getTime(),
      sortOrder: sortedInfo.columnKey === 'date' ? sortedInfo.order : null,
      render: (date: Date) => <span>{Time({ date, variant: 'day' })}</span>,
    },
  ];

  // --- Handlers ---
  const handleFilter = () => {
    setFilters((prev) => ({ ...prev, page: 1 })); // reset page về 1
  };

  const handleReset = () => {
    setFilters({
      name: '',
      status: undefined,
      fund: '',
      startDate: undefined,
      endDate: undefined,
      minRaise: undefined,
      maxRaise: undefined,
      page: 1,
      size: 10,
    });
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl p-3 mb-5 bg-white dark:bg-[#1f1f1f] shadow-sm">
        <Space wrap size="middle">
          <Input
            placeholder="Search name..."
            prefix={<SearchOutlined />}
            value={filters.name}
            onChange={(e) =>
              setFilters((p) => ({ ...p, name: e.target.value }))
            }
            style={{ width: 200 }}
          />
          <Select
            placeholder="Status"
            allowClear
            value={filters.status}
            onChange={(v) => setFilters((p) => ({ ...p, status: v }))}
            style={{ width: 140 }}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
          />
          <div className="flex items-center">
            <Input
              type="number"
              placeholder="Start raise"
              min={0}
              value={String(filters.minRaise)}
              onChange={(e) =>
                setFilters((p) => ({ ...p, minRaise: Number(e.target.value) }))
              }
              className="!rounded-none !rounded-l-md"
            />
            <Input
              type="number"
              placeholder="End raise"
              min={0}
              value={String(filters.maxRaise)}
              onChange={(e) =>
                setFilters((p) => ({ ...p, maxRaise: Number(e.target.value) }))
              }
              className="!rounded-none !rounded-r-md"
            />
          </div>

          <Input
            placeholder="Search fund..."
            value={filters.fund}
            onChange={(e) =>
              setFilters((p) => ({ ...p, fund: e.target.value }))
            }
            style={{ width: 160 }}
          />

          <RangePicker
            onChange={(dates) =>
              setFilters((p) => ({
                ...p,
                startDate: dates?.[0]?.format('YYYY-MM-DD'),
                endDate: dates?.[1]?.format('YYYY-MM-DD'),
              }))
            }
          />
        </Space>

        <Space>
          {/* <Button
            icon={<FilterOutlined />}
            type="primary"
            className="bg-blue-500 hover:bg-blue-600"
            onClick={handleFilter}
          >
            Filter
          </Button> */}
          <Button icon={<ReloadOutlined />} onClick={handleReset}>
            Reset
          </Button>
        </Space>
      </div>

      {/* Table */}
      <ConfigProvider
        theme={{
          algorithm:
            themeNext.theme === 'dark'
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
          token: { fontSize: 16, padding: 20 },
        }}
      >
        <Table
          columns={columns}
          dataSource={airdrops}
          rowKey="id"
          loading={isLoading}
          pagination={{
            current: page,
            pageSize,
            total,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
          onChange={handleChange}
          scroll={{ x: 700 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default AirdropTable;
