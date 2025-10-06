import { Metadata, Viewport } from 'next';
import { Link } from '@heroui/link';
import clsx from 'clsx';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';
import { Navbar } from '@/components/navbar';
// @ts-ignore
import '@/styles/globals.css';
import { NextIntlClientProvider, useLocale } from 'next-intl';
import { Logo } from '@/components/icons';
import NextLink from 'next/link';
import { Providers } from '../[locale]/providers';
import Sidebar from './(components)/SideBar';
import {
  IconApps,
  IconChartInfographic,
  IconLogout,
  IconNews,
  IconSettings,
  IconStar,
} from '@tabler/icons-react';

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
const navItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Market',
    href: '/market',
  },
  {
    name: 'Airdrop',
    href: '/airdrop',
  },
  {
    name: 'News',
    href: '/news',
  },
  {
    name: 'About',
    href: '/about',
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();
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
              <div className="w-dvw h-dvh bg-gray-200 grid grid-cols-7">
                <div className="col-span-1 bg-white">
                  <div className="p-2 h-full w-full flex flex-col bg-white dark:bg-gray-900 border-r border-r-gray-200">
                    <Link href="/admin">
                      <div className="flex justify-center lg:justify-start items-center gap-2 py-2 px-0 md:px-2 lg:px-4 cursor-pointer text-black dark:text-white">
                        <Logo />
                        <p className="font-bold text-inherit">ACME</p>
                      </div>
                    </Link>

                    <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden flex-grow pt-2 justify-between">
                      <div className="flex flex-col space-y-1 mx-1 lg:mt-1 ">
                        <div className="px-5 pt-4 hidden lg:block">
                          <div className="flex flex-row items-center">
                            <div className="text-xs font-bold tracking-wide text-gray-600">
                              Menu
                            </div>
                          </div>
                        </div>
                        <Link
                          className="flex flex-row items-center  justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5  lg:pr-6 font-semibold text-gray-500 hover:text-primary-400 cursor-pointer "
                          href="/admin/dashboard"
                        >
                          <span className="inline-flex justify-center items-center ml-3.5">
                            <IconApps size={20} />
                          </span>
                          <span className="ml-0 lg:ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">
                            Dashboard
                          </span>
                        </Link>
                        <a
                          className="flex flex-row items-center  justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5  lg:pr-6 font-semibold text-gray-500 hover:text-primary-400 cursor-pointer "
                          href="/admin/market"
                        >
                          <span className="inline-flex justify-center items-center ml-3.5">
                            <IconChartInfographic size={20} />
                          </span>
                          <span className="ml-0 lg:ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">
                            Market
                          </span>
                        </a>
                        <Link
                          className="flex flex-row items-center  justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5  lg:pr-6 font-semibold text-gray-500 hover:text-primary-400 cursor-pointer "
                          href="/admin/airdrop"
                        >
                          <span className="inline-flex justify-center items-center ml-3.5">
                            <IconStar size={20} />
                          </span>
                          <span className="ml-0 lg:ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">
                            Airdrop
                          </span>
                        </Link>
                        <Link
                          className="flex flex-row items-center  justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5  lg:pr-6 bg-primary-50 shadow-sm text-primary-400 font-bold "
                          href="/admin/news"
                        >
                          <span className="inline-flex justify-center items-center ml-3.5">
                            <IconNews size={20} />
                          </span>
                          <span className="ml-0 lg:ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">
                            News
                          </span>
                        </Link>
                      </div>
                      <div className="flex flex-col space-y-1 mx-1 lg:mt-1 ">
                        <Link
                          className="flex flex-row items-center  justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5  lg:pr-6 font-semibold text-gray-500 hover:text-primary-400 cursor-pointer "
                          href="/admin/settings"
                        >
                          <span className="inline-flex justify-center items-center ml-3.5">
                            <IconSettings size={20} />
                          </span>
                          <span className="ml-0 lg:ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">
                            Settings
                          </span>
                        </Link>
                      </div>
                    </div>
                    <div className="px-1">
                      <div className="flex flex-row items-center  justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5  lg:pr-6 font-semibold cursor-pointer text-red-400 hover:text-red-600">
                        <span className="inline-flex justify-center items-center ml-3.5">
                          <IconLogout size={20} />
                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">
                          Logout
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-6 bg-white">{children}</div>
              </div>
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
