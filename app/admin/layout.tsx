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
import SidebarLayout from './SidebarLayout';

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
            <SidebarLayout>{children}</SidebarLayout>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
