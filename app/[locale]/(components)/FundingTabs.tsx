'use client';
import { Card, ConfigProvider } from 'antd';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { useEffect } from 'react';
import { useCryptoWidget } from '../widget';
import AirdropTable from './AirdropTable';
import MarketTable from './MarketTable';
import NewsTable from './NewsTable';
import NewsTabPreview from './NewsTabPreview';
import AirdropTabPreview from './AirdropTabPreview';
import MarketTabPreview from './MarketTabPreview';
const Tabs = dynamic(() => import('antd/es/tabs'), { ssr: false });
const FundingTabs = (props: { defaultActiveKey: string }) => {
  useCryptoWidget();

  const items = [
    {
      key: '1',
      label: <MarketTabPreview />,
      children: <MarketTable />,
    },
    {
      key: '2',
      label: <AirdropTabPreview />,
      children: <AirdropTable />,
    },
    {
      key: '3',
      label: <NewsTabPreview />,
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
          height: 100%;
        }
        .ant-tabs-tab-btn {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
};

export default FundingTabs;
