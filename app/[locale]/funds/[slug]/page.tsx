'use client';

import {
  Avatar,
  Card,
  ConfigProvider,
  Table as AntdTable,
  theme,
  Tag,
} from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useGetFund } from '@/lib/hooks/fund';
import { Link } from '@heroui/link';
import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import { ColumnsType } from 'antd/es/table';
import { toNumber } from 'lodash';
import { Time } from '@/lib/helpers/Time';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { SelectItem, Select } from '@heroui/select';
import { SearchIcon } from '@/components/icons';
import { Input } from '@heroui/input';
import { DateRangePicker } from '@heroui/date-picker';
import { Button } from '@heroui/button';

export default function Page() {
  console.log('renderr');
  const params = useParams();
  const themeNext = useTheme();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // --- Filters & Pagination ---
  const [filters, setFilters] = useState({
    name: '',
    status: undefined as string | undefined,
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

  const { data: fund } = useGetFund(slug as string, !!slug, filters);
  const locale = useLocale();
  const [data, setData] = useState<any>(fund);

  useEffect(() => {
    setData(fund || null);
  }, [fund]);
  const [sortedInfo, setSortedInfo] = useState<any>({});

  const handleChange = (_: any, __: any, sorter: any) => {
    setSortedInfo(sorter);
  };

  const handleReset = () => {
    setFilters({
      name: '',
      status: undefined,
      startDate: undefined,
      endDate: undefined,
      minRaise: undefined,
      maxRaise: undefined,
      page: 1,
      size: 10,
    });
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
      showSorterTooltip: false,
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
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) =>
        new Date(a.date || '').getTime() - new Date(b.date || '').getTime(),
      sortOrder: sortedInfo.columnKey === 'date' ? sortedInfo.order : null,
      ellipsis: true,
      showSorterTooltip: false,
      render: (text, record) => (
        <span>{Time({ date: new Date(text), variant: 'day' })}</span>
      ),
    },
  ];

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-[50vh]">
  //       <Spin size="large" />
  //     </div>
  //   );
  // }
  console.log('data?.pagination?.total', data?.pagination?.total);
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
        {/* Avatar + Name */}
        <div className="flex gap-5 items-center">
          <div>
            <Avatar
              size={{ xs: 60, sm: 80, md: 80, lg: 100, xl: 100, xxl: 100 }}
              src={data?.logo}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-xl md:text-2xl">
              {data?.name}
            </span>
            <span className="text-sm text-gray-400">{data?.description}</span>
          </div>
        </div>

        {/* Status */}
        {/* <div className="flex flex-col gap-1">
          <span className="text-sm">Status</span>
          <span className="font-semibold text-xl md:text-2xl text-blue-500 text-capitalize">
            {data?.status ?? 'N/A'}
          </span>
        </div> */}

        {/* Raised */}
        {/* <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500">Total raised</span>
          <span className="font-semibold text-xl md:text-2xl">
            {data?.raise ? `$ ${data?.raise}` : 'N/A'}
          </span>
        </div> */}
      </div>

      <div className="flex flex-col">
        <span className="font-semibold text-xl md:text-2xl">
          {data?.name} Funding Rounds
        </span>
      </div>

      <div className="">
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
                  setFilters((p) => ({
                    ...p,
                    minRaise: Number(e.target.value),
                  }))
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
                  setFilters((p) => ({
                    ...p,
                    maxRaise: Number(e.target.value),
                  }))
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
              Reset
            </Button>
          </div>
        </div>

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
            className="shadow-sm "
            columns={columns}
            dataSource={fund?.airdrops || []}
            rowKey="id"
            onChange={handleChange}
            pagination={{
              current: page,
              pageSize,
              total: data?.pagination?.total || 0,
              onChange: (page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              },
            }}
            scroll={{ x: 800 }}
          />
        </ConfigProvider>
      </div>
    </div>
  );
}
