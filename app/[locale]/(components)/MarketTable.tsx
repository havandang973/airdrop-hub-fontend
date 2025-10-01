'use client';

import React, { useState } from 'react';
import { Table as AntdTable, ConfigProvider, theme } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useLocale } from 'next-intl';

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
}

const data: RowData[] = [
  {
    key: '1',
    name: 'Bitcoin',
    slug: 'bitcoin',
    logo: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
    binance: 61000,
    coinbase: 61120,
    kraken: 60980,
    kucoin: 61050,
    bybit: 61090,
  },
  {
    key: '2',
    name: 'Ethereum',
    slug: 'ethereum',
    logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    binance: 2300,
    coinbase: 2315,
    kraken: 2298,
    kucoin: 2305,
    bybit: 2302,
  },
  {
    key: '3',
    name: 'Solana',
    slug: 'solana',
    logo: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
    binance: 150,
    coinbase: 152,
    kraken: 149,
    kucoin: 150.5,
    bybit: 150.2,
  },
  {
    key: '4',
    name: 'BNB',
    slug: 'bnb',
    logo: 'https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png',
    binance: 310,
    coinbase: 312,
    kraken: 309,
    kucoin: 311,
    bybit: 310.5,
  },
  {
    key: '5',
    name: 'XRP',
    slug: 'xrp',
    logo: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png',
    binance: 0.52,
    coinbase: 0.521,
    kraken: 0.519,
    kucoin: 0.52,
    bybit: 0.522,
  },
  {
    key: '6',
    name: 'Cardano',
    slug: 'cardano',
    logo: 'https://assets.coingecko.com/coins/images/975/small/cardano.png',
    binance: 0.38,
    coinbase: 0.381,
    kraken: 0.379,
    kucoin: 0.38,
    bybit: 0.382,
  },
  {
    key: '7',
    name: 'Dogecoin',
    slug: 'dogecoin',
    logo: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png',
    binance: 0.09,
    coinbase: 0.091,
    kraken: 0.089,
    kucoin: 0.09,
    bybit: 0.0905,
  },
  {
    key: '8',
    name: 'Avalanche',
    slug: 'avalanche',
    logo: 'https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png',
    binance: 35,
    coinbase: 35.5,
    kraken: 34.9,
    kucoin: 35.1,
    bybit: 35.2,
  },
  {
    key: '9',
    name: 'Polkadot',
    slug: 'polkadot',
    logo: 'https://assets.coingecko.com/coins/images/12171/small/polkadot.png',
    binance: 7,
    coinbase: 7.1,
    kraken: 6.95,
    kucoin: 7.02,
    bybit: 7.05,
  },
  {
    key: '10',
    name: 'TRON',
    slug: 'tron',
    logo: 'https://assets.coingecko.com/coins/images/1094/small/tron-logo.png',
    binance: 0.1,
    coinbase: 0.101,
    kraken: 0.099,
    kucoin: 0.1,
    bybit: 0.1005,
  },
  {
    key: '11',
    name: 'Polygon',
    slug: 'polygon',
    logo: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png',
    binance: 0.7,
    coinbase: 0.702,
    kraken: 0.698,
    kucoin: 0.701,
    bybit: 0.703,
  },
  {
    key: '12',
    name: 'Toncoin',
    slug: 'toncoin',
    logo: 'https://assets.coingecko.com/coins/images/17980/small/ton_symbol.png',
    binance: 5.2,
    coinbase: 5.25,
    kraken: 5.15,
    kucoin: 5.18,
    bybit: 5.22,
  },
  {
    key: '13',
    name: 'Shiba Inu',
    slug: 'shiba-inu',
    logo: 'https://assets.coingecko.com/coins/images/11939/small/shiba.png',
    binance: 0.00001,
    coinbase: 0.0000102,
    kraken: 0.0000099,
    kucoin: 0.0000101,
    bybit: 0.00001005,
  },
  {
    key: '14',
    name: 'Chainlink',
    slug: 'chainlink',
    logo: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png',
    binance: 14,
    coinbase: 14.2,
    kraken: 13.9,
    kucoin: 14.05,
    bybit: 14.1,
  },
  {
    key: '15',
    name: 'Litecoin',
    slug: 'litecoin',
    logo: 'https://assets.coingecko.com/coins/images/2/small/litecoin.png',
    binance: 75,
    coinbase: 76,
    kraken: 74.8,
    kucoin: 75.3,
    bybit: 75.5,
  },
  {
    key: '16',
    name: 'Bitcoin Cash',
    slug: 'bitcoin-cash',
    logo: 'https://assets.coingecko.com/coins/images/780/small/bitcoin-cash-circle.png',
    binance: 240,
    coinbase: 242,
    kraken: 239,
    kucoin: 241,
    bybit: 240.5,
  },
  {
    key: '17',
    name: 'Uniswap',
    slug: 'uniswap',
    logo: 'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png',
    binance: 7.5,
    coinbase: 7.6,
    kraken: 7.4,
    kucoin: 7.45,
    bybit: 7.55,
  },
  {
    key: '18',
    name: 'Aptos',
    slug: 'aptos',
    logo: 'https://assets.coingecko.com/coins/images/26455/small/aptos_round.png',
    binance: 8,
    coinbase: 8.1,
    kraken: 7.9,
    kucoin: 8.02,
    bybit: 8.05,
  },
  {
    key: '19',
    name: 'Arbitrum',
    slug: 'arbitrum',
    logo: 'https://assets.coingecko.com/coins/images/16547/small/arbitrum.png',
    binance: 1.2,
    coinbase: 1.22,
    kraken: 1.18,
    kucoin: 1.21,
    bybit: 1.19,
  },
];

const MarketTable = () => {
  const [sortedInfo, setSortedInfo] = useState<any>({});
  const themeNext = useTheme();
  const locale = useLocale();

  const handleChange = (_: any, __: any, sorter: any) => {
    setSortedInfo(sorter);
  };

  const columns: ColumnsType<RowData> = [
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
      title: 'Binance',
      dataIndex: 'binance',
      key: 'binance',
      sorter: (a, b) => a.binance - b.binance,
      sortOrder: sortedInfo.columnKey === 'binance' ? sortedInfo.order : null,
      render: (val) => `$${val.toLocaleString()}`,
      align: 'right',
    },
    {
      title: 'Coinbase',
      dataIndex: 'coinbase',
      key: 'coinbase',
      sorter: (a, b) => a.coinbase - b.coinbase,
      sortOrder: sortedInfo.columnKey === 'coinbase' ? sortedInfo.order : null,
      render: (val) => `$${val.toLocaleString()}`,
      align: 'right',
    },
    {
      title: 'Kraken',
      dataIndex: 'kraken',
      key: 'kraken',
      sorter: (a, b) => a.kraken - b.kraken,
      sortOrder: sortedInfo.columnKey === 'kraken' ? sortedInfo.order : null,
      render: (val) => `$${val.toLocaleString()}`,
      align: 'right',
    },
    {
      title: 'KuCoin',
      dataIndex: 'kucoin',
      key: 'kucoin',
      sorter: (a, b) => a.kucoin - b.kucoin,
      sortOrder: sortedInfo.columnKey === 'kucoin' ? sortedInfo.order : null,
      render: (val) => `$${val.toLocaleString()}`,
      align: 'right',
    },
    {
      title: 'Bybit',
      dataIndex: 'bybit',
      key: 'bybit',
      sorter: (a, b) => a.bybit - b.bybit,
      sortOrder: sortedInfo.columnKey === 'bybit' ? sortedInfo.order : null,
      render: (val) => `$${val.toLocaleString()}`,
      align: 'right',
    },
  ];

  return (
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
        dataSource={data}
        onChange={handleChange}
        pagination={{ pageSize: 12 }}
        rowClassName="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      />
    </ConfigProvider>
  );
};

export default MarketTable;
