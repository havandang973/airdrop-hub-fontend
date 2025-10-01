import { Metadata, Viewport } from 'next';
import { Link } from '@heroui/link';
import clsx from 'clsx';
import { Providers } from './providers';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';
import { Navbar } from '@/components/navbar';
// @ts-ignore
import '@/styles/globals.css';
import { NextIntlClientProvider } from 'next-intl';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          'min-h-screen text-foreground bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        {' '}
        <NextIntlClientProvider>
          <Providers
            themeProps={{
              attribute: 'class',
              defaultTheme: 'light',
              storageKey: 'theme',
            }}
          >
            <div className="relative flex flex-col h-screen">
              <Navbar />

              <main className="flex justify-center items-start gap-6 px-4">
                {/* <iframe
                  className="flex-shrink-0 w-64 md:w-72 lg:w-80 h-[600px]"
                  src="https://cdn.24h.com.vn/upload/3-2025/images/2025-07-10/html5_banner_thuong_1752133372_55/1752133372_index.html?cID=45&amp;pos=140&amp;1759198585058"
                ></iframe> */}

                <div className="flex-1 max-w-screen-2xl container mx-auto pt-16 px-6 flex-grow">
                  {children}
                </div>

                {/* <iframe
                  className="flex-shrink-0 w-64 md:w-72 lg:w-80 h-[600px]"
                  src="https://cdn.24h.com.vn/upload/3-2025/images/2025-07-10/html5_banner_thuong_1752133372_55/1752133372_index.html?cID=45&amp;pos=140&amp;1759198585058"
                ></iframe> */}
              </main>

              <footer className="w-full flex items-center justify-center py-3">
                <Link
                  isExternal
                  className="flex items-center gap-1 text-current"
                  href="https://heroui.com?utm_source=next-app-template"
                  title="heroui.com homepage"
                >
                  <span className="text-default-600">Powered by</span>
                  <p className="text-primary">HeroUI</p>
                </Link>
              </footer>
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
