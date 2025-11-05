'use client';

import {
  Avatar,
  Card,
  ConfigProvider,
  Spin,
  Table as AntdTable,
  theme,
  Tag,
  Space,
  Input,
  Select,
  DatePicker,
  Button,
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
  const { data: fund, isLoading } = useGetFund(slug as string, !!slug, filters);

  const [zoomSrc, setZoomSrc] = useState<string | null>(null);
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

      {/* Main content */}
      <div className="flex flex-col gap-4 md:hidden">
        {fund?.airdrops?.map((item: any) => (
          <Card key={item.id} className="p-4 rounded-md shadow-sm">
            <Link
              href={`/${locale}/airdrop/${item.slug}`}
              className="flex items-center gap-2"
            >
              {item.logo && (
                <img
                  src={item.logo}
                  alt={item.name}
                  style={{ width: 24, height: 24, borderRadius: '50%' }}
                />
              )}
              <span className="font-semibold text-black dark:text-white hover:text-blue-500 transition-colors">
                {item.name}
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
            {/* {item.moniScore && (
              <div className="flex justify-between text-sm">
                <GradientSlider score={item.moniScore} />
                <span className="font-semibold">{item.moniScore}</span>
              </div>
            )} */}
          </Card>
        ))}
      </div>

      <div className="hidden md:block">
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
                  setFilters((p) => ({
                    ...p,
                    minRaise: Number(e.target.value),
                  }))
                }
                className="!rounded-none !rounded-l-md"
              />
              <Input
                type="number"
                placeholder="End raise"
                min={0}
                value={String(filters.maxRaise)}
                onChange={(e) =>
                  setFilters((p) => ({
                    ...p,
                    maxRaise: Number(e.target.value),
                  }))
                }
                className="!rounded-none !rounded-r-md"
              />
            </div>

            <DatePicker.RangePicker
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
            pagination={{ pageSize: 10 }}
          />
        </ConfigProvider>
      </div>
    </div>
  );
}
