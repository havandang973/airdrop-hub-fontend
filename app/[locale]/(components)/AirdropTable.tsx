'use client';

import React, { useEffect, useState } from 'react';
import { Table, ConfigProvider, theme, Tag } from 'antd';
import { useTheme } from 'next-themes';
import { useLocale } from 'next-intl';
import { useGetAirdrops } from '@/lib/hooks/airdrop';
import Link from 'next/link';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { toNumber } from 'lodash';
import { Avatar, AvatarGroup } from '@heroui/avatar';
import { Tooltip } from '@heroui/tooltip';
import { Time } from '@/lib/helpers/Time';
import { Input } from '@heroui/input';
import { SearchIcon } from '@/components/icons';
import { Select, SelectItem } from '@heroui/select';
import { DateRangePicker } from '@heroui/date-picker';
import { Button } from '@heroui/button';

// const { RangePicker } = DatePicker;

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
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
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
      title: 'Vốn huy động',
      dataIndex: 'raise',
      key: 'raise',
      align: 'right',
      sorter: (a: any, b: any) =>
        toNumber(a.raise || '') - toNumber(b.raise || ''),
      sortOrder: sortedInfo.columnKey === 'raise' ? sortedInfo.order : null,
      render: (text: string) => <span>$ {text}M</span>,
    },
    {
      title: 'Trạng thái',
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
      title: 'Quỹ và nhà đầu tư',
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
      title: 'Thời gian',
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
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl p-4 mb-5 bg-white dark:bg-[#1f1f1f] shadow-sm">
        {/* LEFT - Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <Input
            type="text"
            placeholder="Nhập tên..."
            startContent={<SearchIcon className="text-gray-500" size={18} />}
            value={filters.name}
            onChange={(e) =>
              setFilters((p) => ({ ...p, name: e.target.value }))
            }
            className="w-[200px]"
            variant="bordered"
            classNames={{ inputWrapper: 'rounded-md border-1' }}
          />

          {/* Range input */}
          <div className="flex items-center">
            <Input
              type="number"
              placeholder="Vốn từ"
              value={filters.minRaise?.toString() || ''}
              onChange={(e) =>
                setFilters((p) => ({ ...p, minRaise: Number(e.target.value) }))
              }
              className="w-[140px]"
              variant="bordered"
              classNames={{
                inputWrapper: 'rounded-md rounded-r-none border-1',
              }}
            />
            <Input
              type="number"
              placeholder="Vốn đến"
              value={filters.maxRaise?.toString() || ''}
              onChange={(e) =>
                setFilters((p) => ({ ...p, maxRaise: Number(e.target.value) }))
              }
              className="w-[140px]"
              variant="bordered"
              classNames={{
                inputWrapper: 'rounded-md rounded-l-none border-1 ',
              }}
            />
          </div>

          {/* Status */}
          <Select
            labelPlacement="outside"
            placeholder="Trạng thái"
            selectedKeys={filters.status ? [filters.status] : []}
            onChange={(e) =>
              setFilters((p) => ({ ...p, status: e.target.value }))
            }
            className="w-[140px]"
            variant="bordered"
            classNames={{ trigger: 'rounded-md border-1' }}
          >
            <SelectItem key="active">Active</SelectItem>
            <SelectItem key="inactive">Inactive</SelectItem>
          </Select>

          {/* Fund */}
          <Input
            placeholder="Nhập quỹ..."
            value={filters.fund}
            onChange={(e) =>
              setFilters((p) => ({ ...p, fund: e.target.value }))
            }
            className="w-[160px]"
            variant="bordered"
            classNames={{ inputWrapper: 'rounded-md border-1' }}
          />

          {/* Date Range */}
          <DateRangePicker
            // label="Thời gian"
            variant="bordered"
            labelPlacement="outside-left"
            className="w-[300px]"
            onChange={(range) =>
              setFilters((p) => ({
                ...p,
                startDate: range?.start?.toString() || '',
                endDate: range?.end?.toString() || '',
              }))
            }
            classNames={{ inputWrapper: 'rounded-md border-1' }}
          />
        </div>

        {/* RIGHT - Buttons */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="solid"
            color="primary"
            className="rounded-md border-1"
            onPress={handleReset}
          >
            Đặt lại
          </Button>
        </div>
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
          scroll={{ x: 800 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default AirdropTable;
