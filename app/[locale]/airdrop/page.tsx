'use client';
import { Link } from '@heroui/link';
import { Snippet } from '@heroui/snippet';
import { Code } from '@heroui/code';
import { button as buttonStyles } from '@heroui/theme';

import { siteConfig } from '@/config/site';
import { title, subtitle } from '@/components/primitives';
import { GithubIcon } from '@/components/icons';
// import { Tabs, Tab } from '@heroui/tabs';
import { Avatar } from '@heroui/avatar';
import { Tabs } from 'antd';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useCryptoMarquee } from '../cryptoMarquee';
import { useCryptoWidget } from '../widget';
import FundingTabs from '../(components)/FundingTabs';

export default function Page() {
  useCryptoWidget();
  const theme =
    typeof window !== 'undefined'
      ? localStorage.getItem('theme') || 'light'
      : 'light';
  useCryptoMarquee(theme === 'dark' ? 'dark' : 'light');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between mx-auto">
        <div className="text-center md:text-left md:max-w-2xl">
          <span
            className={title({
              class: 'text-3xl md:text-5xl leading-snug md:leading-tight',
            })}
          >
            Khám Phá&nbsp;
          </span>
          <span
            className={title({
              color: 'violet',
              class: 'text-3xl md:text-5xl leading-snug md:leading-tight',
            })}
          >
            Airdrops&nbsp;
          </span>
          <span
            className={title({
              class: 'block text-2xl md:text-4xl leading-snug md:leading-tight',
            })}
          >
            Khám Phá Các Airdrops <br />
            Tại 1 Nơi.
          </span>

          <div
            className={subtitle({
              class: 'mt-2 text-gray-600 dark:text-gray-400',
            })}
          >
            Hãy cập nhật thông tin – đừng bỏ lỡ cơ hội nhận token miễn phí.
          </div>

          <div className="mt-6">
            <Link
              // isExternal
              className={buttonStyles({
                color: 'primary',
                radius: 'full',
                variant: 'shadow',
                size: 'lg',
              })}
              href={'/'}
            >
              Bắt đầu ngay
            </Link>
          </div>
        </div>

        <div className="mt-6 md:mt-0 md:ml-8">
          <img
            src="https://rockiereact-tau.vercel.app/static/media/banner-03.e73e194292317d284a55.png"
            alt=""
            className="w-64 md:w-128"
          />
        </div>
      </div>

      <div
        className="binance-widget-marquee"
        data-cmc-ids="1,1027,52,5426,74,2010,20947,825,1839,1975,5805,1958"
        data-theme="light"
        data-transparent="false"
        data-locale="vi"
        data-fiat="USD"
        data-layout="banner"
        data-powered-by="Cung cấp bởi"
        data-disclaimer="Miễn trừ trách nhiệm"
      ></div>
      <Script
        src="https://public.bnbstatic.com/unpkg/growth-widget/cryptoCurrencyWidget@0.0.22.min.js"
        strategy="afterInteractive"
      />
      {/* <div
        id="cr-widget-marquee"
        data-coins="bitcoin,ethereum,ripple,monero,litecoin,bnb,solana,tether,usdcoin,dogecoin,tron,cardano,chainlink,hyperliquid,avalanche,sui"
        data-theme={theme}
        data-show-symbol="true"
        data-show-icon="true"
        data-show-period-change="true"
        data-period-change="24H"
        data-api-url="https://api.cryptorank.io/v0"
      >
        <script src="https://cryptorank.io/widget/marquee.js"></script>
      </div> */}

      <section className="flex flex-col items-center justify-center gap-4">
        <FundingTabs defaultActiveKey="2" />
      </section>
    </div>
  );
}
