'use client';
import { useEffect, useState } from 'react';

export function useCryptoMarquee(theme: string) {
  useEffect(() => {
    const container = document.getElementById('cr-widget-marquee');
    if (!container) return;

    // Xóa nội dung cũ
    container.innerHTML = '';

    // Tạo lại div widget
    const div = document.createElement('div');
    div.id = 'cr-widget-marquee-inner';
    div.setAttribute(
      'data-coins',
      'bitcoin,ethereum,ripple,monero,litecoin,bnb,solana,tether,usdcoin,dogecoin,tron,cardano,chainlink,hyperliquid,avalanche,sui'
    );
    div.setAttribute('data-theme', theme);
    div.setAttribute('data-show-symbol', 'true');
    div.setAttribute('data-show-icon', 'true');
    div.setAttribute('data-show-period-change', 'true');
    div.setAttribute('data-period-change', '24H');
    div.setAttribute('data-api-url', 'https://api.cryptorank.io/v0');

    container.appendChild(div);

    // Load script lại
    const script = document.createElement('script');
    script.src = 'https://cryptorank.io/widget/marquee.js';
    script.async = true;
    container.appendChild(script);
  }, [theme]); // Chạy lại mỗi khi theme thay đổi
}
