'use client';
import { Card, ConfigProvider } from 'antd';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { useEffect } from 'react';
import { useCryptoWidget } from '../widget';
import AirdropTable from './AirdropTable';
import MarketTable from './MarketTable';
import NewsTable from './NewsTable';
const Tabs = dynamic(() => import('antd/es/tabs'), { ssr: false });
const FundingTabs = (props: { defaultActiveKey: string }) => {
  useCryptoWidget();

  const items = [
    {
      key: '1',
      label: (
        <div className="whitespace-normal break-words p-3 flex flex-col justify-between rounded-md min-h-48 border border-gray-200 dark:border-gray-700 transition cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              Tổng quan thị trường
            </span>
            {/* <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-sm">
              <span>30D</span>
            </div> */}
          </div>

          {/* <div className="grid grid-cols-2 gap-2 mt-3">
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
          </div> */}
        </div>
      ),
      children: <MarketTable />,
    },
    {
      key: '2',
      label: (
        <div className="whitespace-normal break-words p-3 flex flex-col justify-between rounded-md min-h-48 border border-gray-200 dark:border-gray-700 transition cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              Danh sách Airdrop
            </span>
            {/* <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-sm">
              <span>Active</span>
            </div> */}
          </div>

          {/* <div className="grid grid-cols-2 gap-2 mt-3">
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
          </div> */}
        </div>
      ),
      children: <AirdropTable />,
    },
    {
      key: '3',
      label: (
        <div className="whitespace-normal break-words p-3 rounded-md  flex flex-col justify-between min-h-48 border border-gray-200 dark:border-gray-700 transition cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              Tin tức
            </span>
            {/* <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-sm">
              <span>Today</span>
            </div> */}
          </div>

          {/* <div className="grid grid-cols-2 gap-2 mt-3">
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
          </div> */}
        </div>
      ),
      children: <NewsTable />,
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
          defaultActiveKey={props.defaultActiveKey}
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
          overflow-x: auto;
        }
        .custom-tabs .ant-tabs-tab {
          padding: 0;
          flex: 1; /* chia đều */
          justify-content: center;
          max-width: none !important;
          min-width: 250px;
        }
        .ant-tabs-tab-btn {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default FundingTabs;
