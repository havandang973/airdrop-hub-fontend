'use client';

import React, { useState } from 'react';
import { Table as AntdTable, Collapse, ConfigProvider, theme } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTheme } from 'next-themes';
import { useLocale } from 'next-intl';
import { IconChevronDown } from '@tabler/icons-react';
import {
  useGetPriceBinance,
  useGetPriceBybit,
  useGetPriceHuobi,
  useGetPriceKucoin,
  useGetPriceOkx,
} from '@/lib/hooks/market';
import { COINS } from '@/lib/helpers/coin';

interface RowData {
  key: string;
  name: string;
  logo: string;
  slug: string;
  binance: number;
  coinbase: number;
  kraken: number;
  kucoin: number;
  bybit: number;
  [key: string]: string | number;
}

const exchanges = [
  {
    key: 'binance',
    name: 'Binance',
    icon: 'https://img.logo.dev/binance.com?token=live_6a1a28fd-6420-4492-aeb0-b297461d9de2&size=128&retina=false&format=png&theme=light',
  },
  {
    key: 'bybit',
    name: 'Bybit',
    icon: 'https://img.logo.dev/bybit.com?token=live_6a1a28fd-6420-4492-aeb0-b297461d9de2&size=128&retina=false&format=png&theme=light',
  },
  {
    key: 'kucoin',
    name: 'Kucoin',
    icon: 'https://img.logo.dev/kucoin.com?token=live_6a1a28fd-6420-4492-aeb0-b297461d9de2&size=128&retina=false&format=png&theme=light',
  },
  {
    key: 'huobi',
    name: 'Huobi',
    icon: 'https://img.logo.dev/htx.com?token=live_6a1a28fd-6420-4492-aeb0-b297461d9de2&size=128&retina=false&format=png&theme=light',
  },
  {
    key: 'okx',
    name: 'OKX',
    icon: 'https://img.logo.dev/okx.com?token=live_6a1a28fd-6420-4492-aeb0-b297461d9de2&size=128&retina=false&format=png&theme=light',
  },
];

const MarketTable = () => {
  const [sortedInfo, setSortedInfo] = useState<any>({});
  const themeNext = useTheme();
  const { data: priceBinance } = useGetPriceBinance();
  const { data: priceBybit } = useGetPriceBybit();
  const { data: priceKucoin } = useGetPriceKucoin();
  const { data: priceHuobi } = useGetPriceHuobi();
  const { data: priceOkx } = useGetPriceOkx();

  const handleChange = (_: any, __: any, sorter: any) => {
    setSortedInfo(sorter);
  };

  const getPrice = (list: any, symbol: any) => {
    if (!list) return null;
    const found = list.find((item: any) => item.symbol === symbol);
    return found ? Number(found.price) : null;
  };

  const data = COINS.map((coin, index) => ({
    key: index,
    name: coin.name,
    logo: coin.logo,
    binance: getPrice(priceBinance, coin.symbol),
    bybit: getPrice(priceBybit, coin.symbol),
    kucoin: getPrice(priceKucoin, coin.symbol),
    huobi: getPrice(priceHuobi, coin.symbol),
    okx: getPrice(priceOkx, coin.symbol),
  }));

  console.log('MarketTable data:', data);
  const columns: ColumnsType<any> = [
    {
      title: 'Coin',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <img
            src={record.logo}
            alt={record.name}
            style={{ width: 24, height: 24, borderRadius: '50%' }}
          />
          <span className="font-semibold text-black dark:text-white hover:text-blue-500 transition-colors">
            {record.name}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex gap-2 justify-end">
          <img
            className="rounded-full"
            src="https://img.logo.dev/binance.com?token=live_6a1a28fd-6420-4492-aeb0-b297461d9de2&size=128&retina=false&format=png&theme=light"
            alt="Binance"
            style={{ width: 24, height: 24 }}
          />
          <span>Binance</span>
        </div>
      ),
      dataIndex: 'binance',
      key: 'binance',
      sorter: (a, b) => a.binance - b.binance,
      sortOrder: sortedInfo.columnKey === 'binance' ? sortedInfo.order : null,
      render: (val) => `$${val?.toLocaleString()}`,
      align: 'right',
    },
    {
      title: (
        <div className="flex gap-2 justify-end">
          <img
            className="rounded-full"
            src="https://img.logo.dev/bybit.com?token=live_6a1a28fd-6420-4492-aeb0-b297461d9de2&size=128&retina=false&format=png&theme=light"
            alt="Bybit"
            style={{ width: 24, height: 24 }}
          />
          <span>Bybit</span>
        </div>
      ),
      dataIndex: 'bybit',
      key: 'bybit',
      sorter: (a, b) => a.bybit - b.bybit,
      sortOrder: sortedInfo.columnKey === 'bybit' ? sortedInfo.order : null,
      render: (val) => `$${val?.toLocaleString()}`,
      align: 'right',
    },
    {
      title: (
        <div className="flex gap-2 justify-end">
          <img
            className="rounded-full"
            src="https://img.logo.dev/kucoin.com?token=live_6a1a28fd-6420-4492-aeb0-b297461d9de2&size=128&retina=false&format=png&theme=light"
            alt="Kucoin"
            style={{ width: 24, height: 24 }}
          />
          <span>Kucoin</span>
        </div>
      ),
      dataIndex: 'kucoin',
      key: 'kucoin',
      sorter: (a, b) => a.kucoin - b.kucoin,
      sortOrder: sortedInfo.columnKey === 'kucoin' ? sortedInfo.order : null,
      render: (val) => `$${val?.toLocaleString()}`,
      align: 'right',
    },
    {
      title: (
        <div className="flex gap-2 justify-end">
          <img
            className="rounded-full"
            src="https://img.logo.dev/htx.com?token=live_6a1a28fd-6420-4492-aeb0-b297461d9de2&size=128&retina=false&format=png&theme=light"
            alt="Huobi"
            style={{ width: 24, height: 24 }}
          />
          <span>Huobi</span>
        </div>
      ),
      dataIndex: 'huobi',
      key: 'huobi',
      sorter: (a, b) => a.huobi - b.huobi,
      sortOrder: sortedInfo.columnKey === 'huobi' ? sortedInfo.order : null,
      render: (val) => `$${val?.toLocaleString()}`,
      align: 'right',
    },
    {
      title: (
        <div className="flex gap-2 justify-end">
          <img
            className="rounded-full"
            src="https://img.logo.dev/okx.com?token=live_6a1a28fd-6420-4492-aeb0-b297461d9de2&size=128&retina=false&format=png&theme=light"
            alt="OKX"
            style={{ width: 24, height: 24 }}
          />
          <span>OKX</span>
        </div>
      ),
      dataIndex: 'okx',
      key: 'okx',
      sorter: (a, b) => a.okx - b.okx,
      sortOrder: sortedInfo.columnKey === 'okx' ? sortedInfo.order : null,
      render: (val) => `$${val?.toLocaleString()}`,
      align: 'right',
    },
  ];
  const { Panel } = Collapse;

  return (
    <ConfigProvider
      theme={{
        algorithm:
          themeNext.theme === 'dark'
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
        token: { fontSize: 16, padding: 20 },
      }}
    >
      {/* Mobile cards */}
      <div className="md:hidden !space-y-5">
        {data?.map((item) => (
          <ConfigProvider
            key={item.key}
            theme={{
              components: {
                Collapse: {
                  headerPadding: 0,
                  contentPadding: 0,
                  headerBg: 'transparent',
                },
              },
            }}
          >
            <Collapse
              key={item.key}
              className="shadow-sm"
              bordered={false}
              expandIcon={() => null}
            >
              <Panel
                header={
                  <div className="flex items-center gap-2">
                    <div className="relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex flex-col gap-2 w-full">
                      <button className="absolute top-2 right-2 text-gray-400 dark:hover:text-gray-300">
                        <IconChevronDown strokeWidth={1.5} />
                      </button>

                      <div className="flex items-center gap-2">
                        <img
                          src={item.logo}
                          alt={item.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="font-semibold text-black dark:text-white">
                          {item.name}
                        </span>
                      </div>

                      <div className="text-2xl font-bold flex items-center gap-2">
                        ${item?.binance?.toLocaleString()}
                        {/* <span className="text-green-500 text-sm font-medium flex items-center gap-1">
                          ↑ 12%
                        </span> */}
                      </div>

                      {/* <p className="text-xs text-gray-500 dark:text-gray-400">
                        since last month
                      </p> */}
                    </div>
                  </div>
                }
                key={item.key}
              >
                <div className="flex flex-col gap-2 text-sm pt-4">
                  {exchanges?.map((ex) => (
                    <div
                      key={ex.key}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-1">
                        <img
                          src={ex.icon}
                          alt={ex.name}
                          className="w-4 h-4 rounded-full"
                        />
                        <span className="font-medium text-gray-500 dark:text-gray-400">
                          {ex.name}
                        </span>
                      </div>
                      <span className="font-semibold text-black dark:text-white">
                        $
                        {(item as any)[
                          ex.name.toLocaleLowerCase()
                        ]?.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </Panel>
            </Collapse>
          </ConfigProvider>
        ))}
      </div>

      {/* Desktop table */}
      <div className="overflow-x-auto hidden md:block">
        <AntdTable
          columns={columns}
          dataSource={data}
          onChange={handleChange}
          pagination={{ pageSize: 12 }}
          rowClassName="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        />
      </div>
    </ConfigProvider>
  );
};

export default MarketTable;
