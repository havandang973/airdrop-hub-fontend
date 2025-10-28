import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export const config = {
    matcher: ['/', '/(vi|en)/:path*', '/news/:path*', '/tin-tuc/:path*'],
};

export default createMiddleware(routing);
