
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['en', 'vi'],
    defaultLocale: 'en',
    localePrefix: 'always',

    // 🔥 Dịch đường dẫn ở đây:
    pathnames: {
        '/news': {
            en: '/news',
            vi: '/tin-tuc',
        },
        '/news/[...params]': {
            vi: '/tin-tuc/[...params]',
            en: '/news/[...params]'
        },
        '/funds': {
            en: '/funds',
            vi: '/quy-dau-tu',
        },
        '/market': {
            en: '/market',
            vi: '/thi-truong',
        },
        '/airdrop': {
            en: '/airdrop',
            vi: '/airdrop',
        },
    },
});

