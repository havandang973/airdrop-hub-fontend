'use client';
import { Card, ConfigProvider } from 'antd';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { useEffect } from 'react';
import { useCryptoWidget } from '../widget';
const Tabs = dynamic(() => import('antd/es/tabs'), { ssr: false });
const FundingTabs = () => {
  useCryptoWidget();

  const items = [
    {
      key: '1',
      label: (
        <div className="p-3 flex flex-col justify-between rounded-md min-h-48 border border-gray-200 dark:border-gray-700 transition cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              Market Overview
            </span>
            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-sm">
              <span>30D</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="bg-slate-100 dark:bg-gray-800 p-2 rounded-md">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Funding Rounds Total
              </p>
              <p className="font-bold text-lg text-gray-900 dark:text-white">
                107 <span className="text-red-500 text-xs">-25.7%</span>
              </p>
            </div>
            <div className="bg-slate-100 dark:bg-gray-800 p-2 rounded-md">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Total Investment Volume
              </p>
              <p className="font-bold text-lg text-gray-900 dark:text-white">
                $6B <span className="text-green-500 text-xs">+28.2%</span>
              </p>
            </div>
          </div>

          <div className="mt-3 text-sm space-y-1">
            <p>
              <span className="text-gray-500 dark:text-gray-400">
                Investment Focus
              </span>{' '}
              <span className="text-blue-500">#Payments</span>
            </p>
            <p>
              <span className="text-gray-500 dark:text-gray-400">
                Average Round Size
              </span>{' '}
              <span className="font-medium text-gray-900 dark:text-gray-100">
                $3-10M
              </span>
            </p>
          </div>
        </div>
      ),
      children: (
        // <Card className="dark:!bg-black !border-gray-200 dark:!border-gray-700">
        <div
          className="cryptohopper-web-widget"
          data-id="1"
          data-table_columns="rank,name,price_usd,market_cap_usd,volume_usd_24h,available_supply,percent_change_24h,weekly,symbol,price_btc"
          data-numcoins="100"
        ></div>
        // </Card>
      ),
    },
    {
      key: '2',
      label: (
        <div className="p-3 flex flex-col justify-between rounded-md min-h-48 border border-gray-200 dark:border-gray-700 transition cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              Airdrop List
            </span>
            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-sm">
              <span>Active</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="bg-slate-100 dark:bg-gray-800 p-2 rounded-md">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Ongoing Airdrops
              </p>
              <p className="font-bold text-lg text-gray-900 dark:text-white">
                12
              </p>
            </div>
            <div className="bg-slate-100 dark:bg-gray-800 p-2 rounded-md">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Upcoming Airdrops
              </p>
              <p className="font-bold text-lg text-gray-900 dark:text-white">
                5
              </p>
            </div>
          </div>

          <div className="mt-3 text-sm">
            <p className="text-gray-500 dark:text-gray-400">
              Most Popular:{' '}
              <span className="text-blue-500">Solana Airdrop</span>
            </p>
          </div>
        </div>
      ),
      children: (
        <Card className="dark:!bg-black !border-gray-200 dark:!border-gray-700">
          <div className="flex gap-4 overflow-x-auto">
            <Card className="min-w-[160px] text-center">
              TokenX - Ends in 5d
            </Card>
            <Card className="min-w-[160px] text-center">
              Solana - Ends in 12d
            </Card>
            <Card className="min-w-[160px] text-center">
              LayerZero - Ends in 30d
            </Card>
          </div>
        </Card>
      ),
    },
    {
      key: '3',
      label: (
        <div className="p-3 rounded-md  flex flex-col justify-between min-h-48 border border-gray-200 dark:border-gray-700 transition cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              Latest News
            </span>
            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-sm">
              <span>Today</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="bg-slate-100 dark:bg-gray-800 p-2 rounded-md">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Trending
              </p>
              <p className="font-bold text-lg text-gray-900 dark:text-white">
                24 News
              </p>
            </div>
            <div className="bg-slate-100 dark:bg-gray-800 p-2 rounded-md">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Crypto Market
              </p>
              <p className="font-bold text-lg text-gray-900 dark:text-white">
                +3.2%
              </p>
            </div>
          </div>

          <div className="mt-3 text-sm">
            <p className="text-gray-500 dark:text-gray-400">
              Highlight: <span className="text-blue-500">BTC surges $70k</span>
            </p>
          </div>
        </div>
      ),
      children: (
        <Card className="dark:!bg-black">
          <div className="flex flex-col gap-4">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Kraken Funding: Monumental $500M Round Boosts Exchange
              </p>
              <span className="text-xs text-blue-500">Funding round</span>
              <span className="float-right text-xs text-gray-500 dark:text-gray-400">
                26 Sep, 2025
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Bitcoin: Michael Saylor’s Advice for Long-Term Holders
              </p>
              <span className="text-xs text-blue-500">Investment</span>
              <span className="float-right text-xs text-gray-500 dark:text-gray-400">
                26 Sep, 2025
              </span>
            </div>
          </div>
        </Card>
      ),
    },
  ];

  return (
    <>
      <ConfigProvider
        theme={{
          token: {},
          components: {
            Tabs: {
              itemHoverColor: 'inherit',
            },
          },
        }}
      >
        <Tabs
          destroyOnHidden={false}
          defaultActiveKey="1"
          items={items}
          tabPosition="top"
          className="w-full custom-tabs"
          indicator={{ size: 0 }}
        />
      </ConfigProvider>

      <style jsx global>{`
        .ant-tabs-nav::before {
          border: none !important;
        }
        .custom-tabs .ant-tabs-nav-list {
          width: 100%;
        }
        .custom-tabs .ant-tabs-tab {
          flex: 1; /* chia đều */
          justify-content: center; /* căn giữa nội dung */
          max-width: none !important;
        }
        .ant-tabs-tab-btn {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default FundingTabs;
