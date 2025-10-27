'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { fontSans } from '@/config/fonts';
import { NextIntlClientProvider } from 'next-intl';
import {
  IconBookmarkEdit,
  IconBrandAmigo,
  IconDashboard,
  IconNews,
  IconPencil,
  IconSettings,
  IconStar,
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const toggleMenu = (menu: string) =>
    setOpenMenu(openMenu === menu ? null : menu);

  const navItems = [
    {
      label: 'Dashboard',
      href: '/admin/dashboard',
      icon: <IconDashboard size={20} />,
    },
    {
      label: 'Market',
      href: '/admin/market',
      icon: <IconBookmarkEdit size={20} />,
    },
    {
      label: 'Airdrop',
      href: '/admin/airdrop',
      icon: <IconStar size={20} />,
      children: [
        {
          label: 'List',
          href: '/admin/airdrop',
        },
        {
          label: 'Create',
          href: '/admin/airdrop/create',
        },
      ],
    },
    {
      label: 'Post Airdrop',
      href: '/admin/airdrop-post',
      icon: <IconPencil size={20} />,
      children: [
        {
          label: 'List',
          href: '/admin/airdrop-post',
        },
        {
          label: 'Create',
          href: '/admin/airdrop-post/create',
        },
      ],
    },
    {
      label: 'Funds',
      href: '/admin/funds',
      icon: <IconBrandAmigo size={20} />,
      children: [
        {
          label: 'List',
          href: '/admin/funds',
        },
        {
          label: 'Create',
          href: '/admin/funds/create',
        },
      ],
    },
    {
      label: 'News',
      href: '/admin/news',
      icon: <IconNews size={20} />,
      children: [
        {
          label: 'List',
          href: '/admin/news',
        },
        {
          label: 'Create',
          href: '/admin/news/create',
        },
      ],
    },
    {
      label: 'Categories & Tags',
      href: '',
      icon: <IconStar size={20} />,
      children: [
        {
          label: 'Categories',
          href: '/admin/category',
        },
        {
          label: 'Tags',
          href: '/admin/tag',
        },
      ],
    },
    {
      label: 'Setting',
      href: '/admin/setting',
      icon: <IconSettings size={20} />,
    },
  ];

  return (
    <div
      className={clsx(
        'flex h-screen text-foreground bg-background font-sans antialiased',
        fontSans.variable
      )}
    >
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <img
              src="https://tailwindflex.com/images/logo.svg"
              alt="Logo"
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold">Admin</span>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              className="w-full bg-gray-800 text-white rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Search..."
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-5 px-2 flex-1 overflow-y-auto">
          {navItems.map((item) =>
            item.children && item.children.length > 0 ? (
              <div className="space-y-1 mt-2" key={item.label}>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={clsx(
                    pathname === item.href && 'bg-gray-800 rounded-xl',
                    'w-full flex  items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none'
                  )}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </div>
                  <svg
                    className={`h-5 w-5 transition-transform ${
                      openMenu === item.label ? 'rotate-180' : ''
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  className={clsx(
                    openMenu === item.label && '!block',
                    'pl-11 space-y-1 hidden'
                  )}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className={clsx(
                        pathname === child.href && 'bg-gray-800 rounded-xl',
                        'block px-4 py-2 text-sm text-gray-300 rounded-xl hover:bg-gray-700 hover:text-white'
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={clsx(
                  pathname === item.href && 'bg-gray-800 rounded-xl',
                  'flex items-center px-4 py-2.5 gap-2 text-sm font-medium rounded-lg hover:bg-gray-700'
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            )
          )}

          {/* Analytics Dropdown */}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center">
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              alt="User"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Tom Cook</p>
              <p className="text-xs text-gray-400">View profile</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">{children}</main>
    </div>
  );
}
