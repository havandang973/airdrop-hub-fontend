import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

// Middleware của i18n (chỉ áp dụng cho website user-facing)
const intlMiddleware = createMiddleware(routing);

export const config = {
    matcher: [
        '/',
        '/(vi|en)/:path*',
        '/news/:path*',
        '/tin-tuc/:path*',
        '/admin/:path*'
    ],
};

export function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith('/admin')) {
        const token = req.cookies.get('token')?.value;

        // Nếu đã đăng nhập mà vẫn vào /admin/login => chuyển hướng về /admin
        if (pathname === '/admin/login' && token) {
            const url = new URL('/admin', req.url);
            return NextResponse.redirect(url);
        }

        // Cho phép truy cập login nếu chưa có token
        if (pathname === '/admin/login') {
            return NextResponse.next();
        }

        // Nếu không có token => bắt đăng nhập
        if (!token) {
            const url = new URL('/admin/login', req.url);
            return NextResponse.redirect(url);
        }

        return NextResponse.next();
    }
    return intlMiddleware(req);
}

export default middleware;
