'use client';
import { useEffect } from 'react';

export function useCryptoWidget() {
  useEffect(() => {
    // Kiểm tra xem script đã load chưa
    if (
      !document.querySelector(
        'script[src="https://www.cryptohopper.com/widgets/js/script"]'
      )
    ) {
      const script = document.createElement('script');
      script.src = 'https://www.cryptohopper.com/widgets/js/script';
      script.async = true;
      document.body.appendChild(script);
    }
    // Không cần cleanup, script chỉ load 1 lần
  }, []);
}
