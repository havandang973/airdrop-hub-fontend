'use client';
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from '@heroui/navbar';
import { Button } from '@heroui/button';
import { Kbd } from '@heroui/kbd';
import { Link } from '@heroui/link';
import { Input } from '@heroui/input';
import { link as linkStyles } from '@heroui/theme';
import NextLink from 'next/link';
import clsx from 'clsx';
import { siteConfig } from '@/config/site';
import { ThemeSwitch } from '@/components/theme-switch';
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from '@/components/icons';
import { useLocale } from 'next-intl';
import { useTranslations } from 'use-intl';
import { Select, SelectItem } from '@heroui/select';
import { Avatar } from '@heroui/avatar';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  IconDroplet,
  IconGraph,
  IconHome,
  IconInfoCircle,
  IconNews,
} from '@tabler/icons-react';

type NavItem = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavItem[]; // thêm optional children
};

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: 'bg-default-100',
        input: 'text-sm',
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  const locale = useLocale();
  const trans = useTranslations();
  const router = useRouter();
  const navItems: NavItem[] = [
    {
      label: trans('Home'),
      href: '/',
      icon: <IconHome size={16} />,
    },
    {
      label: trans('Market'),
      href: '/market',
      icon: <IconGraph size={16} />,
      children: [
        {
          label: trans('Spot'),
          href: '/market/spot',
          icon: <IconGraph size={16} />,
        },
        {
          label: trans('Futures'),
          href: '/market/futures',
          icon: <IconGraph size={16} />,
        },
      ],
    },
    {
      label: trans('Airdrop'),
      href: '/airdrop',
      icon: <IconDroplet size={16} />,
    },
    {
      label: trans('News'),
      href: '/news',
      icon: <IconNews size={16} />,
    },
    {
      label: trans('About'),
      href: '/about',
      icon: <IconInfoCircle size={16} />,
    },
  ];

  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  return (
    <HeroUINavbar
      maxWidth="full"
      position="sticky"
      className="dark:bg-gray-900 bg-white fixed top-0 left-0 w-full z-50"
      onMenuOpenChange={(open) => setOpen(open)}
      isMenuOpen={open}
    >
      <NavbarContent className="basis-1/5 sm:basis-full " justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-8 justify-start ml-10">
          {navItems.map((item) => {
            const url =
              item.href === '/' ? `/${locale}` : `/${locale}${item.href}`;
            const isActive =
              url === `/${locale}`
                ? pathname === url
                : pathname === url || pathname.startsWith(url + '/');

            return (
              <li key={item.href} className="relative group">
                {item?.children ? (
                  <span
                    className={clsx(
                      'flex items-center cursor-pointer gap-2 px-2 py-1 transition',
                      isActive
                        ? '!text-primary'
                        : 'text-foreground hover:text-primary'
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </span>
                ) : (
                  <NextLink
                    href={url}
                    className={clsx(
                      'flex items-center gap-2 px-2 py-1 transition',
                      isActive
                        ? '!text-primary'
                        : 'text-foreground hover:text-primary'
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </NextLink>
                )}

                {item.children && (
                  <ul className="absolute left-0 pt-2 hidden group-hover:block  shadow-lg rounded-md p-2 min-w-[180px]">
                    {item.children.map((child: any) => {
                      const childUrl =
                        child.href === '/'
                          ? `/${locale}`
                          : `/${locale}${child.href}`;

                      const isActiveChild =
                        pathname === childUrl ||
                        pathname.startsWith(childUrl + '/');

                      return (
                        <li key={child.href}>
                          <NextLink
                            href={childUrl}
                            className={clsx(
                              'flex items-center gap-2 px-2 py-1 transition',
                              isActiveChild
                                ? '!text-primary'
                                : 'text-foreground hover:text-primary'
                            )}
                          >
                            {child.icon}
                            {child.label}
                          </NextLink>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden lg:flex basis-1/5 sm:basis-full "
        justify="end"
      >
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden lg:flex gap-2">
          <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>

          <Select
            // isOpen={open}
            // onOpenChange={setOpen}
            // onMouseEnter={() => setOpen(true)}
            // disallowEmptySelection
            // popoverProps={{
            //   onMouseLeave: () => setOpen(false),
            // }}
            className="w-38"
            classNames={{
              trigger:
                'bg-transparent border-none shadow-none hover:bg-transparent data-[hover=true]:bg-transparent',
            }}
            renderValue={(items) => {
              return items.map((item) => (
                <div key={item.key} className="flex items-center gap-2">
                  <Avatar
                    className="w-5 h-5"
                    src={`https://flagcdn.com/${item.key === 'vi' ? 'vn' : 'gb'}.svg`}
                  />
                  <span>{item.textValue}</span>
                </div>
              ));
            }}
            defaultSelectedKeys={[locale]}
            variant="flat"
            onSelectionChange={() => {
              router.push(`/${locale}`);
            }}
          >
            <SelectItem
              key="vi"
              startContent={
                <Avatar
                  alt="Vietnamese"
                  className="w-5 h-5"
                  src="https://flagcdn.com/vn.svg"
                />
              }
            >
              {trans('Vietnamese')}
            </SelectItem>
            <SelectItem
              key="en"
              startContent={
                <Avatar
                  alt="English"
                  className="w-5 h-5"
                  src="https://flagcdn.com/gb.svg"
                />
              }
            >
              {trans('English')}
            </SelectItem>
          </Select>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4 " justify="end">
        <Select
          // isOpen={open}
          // onOpenChange={setOpen}
          // onMouseEnter={() => setOpen(true)}
          // disallowEmptySelection
          popoverProps={{
            onMouseLeave: () => setOpen(false),
          }}
          classNames={{
            trigger:
              'bg-transparent border-none shadow-none hover:bg-transparent data-[hover=true]:bg-transparent',
          }}
          renderValue={(items) => {
            return items.map((item) => (
              <div
                key={item.key}
                className="flex items-center gap-2 min-w-[110px]"
              >
                <Avatar
                  className="w-4 h-4"
                  src={`https://flagcdn.com/${item.key === 'vi' ? 'vn' : 'gb'}.svg`}
                />
                <span>{item.textValue}</span>
              </div>
            ));
          }}
          defaultSelectedKeys={[locale]}
          onSelectionChange={() => {
            router.push(`/${locale}`);
          }}
        >
          <SelectItem
            key="vi"
            startContent={
              <Avatar
                alt="Vietnamese"
                className="w-4 h-4"
                src="https://flagcdn.com/vn.svg"
              />
            }
          >
            {trans('Vietnamese')}
          </SelectItem>
          <SelectItem
            key="en"
            startContent={
              <Avatar
                alt="English"
                className="w-4 h-4"
                src="https://flagcdn.com/gb.svg"
              />
            }
          >
            {trans('English')}
          </SelectItem>
        </Select>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="bg-white">
        {searchInput}
        <ul className="mt-2 flex flex-col gap-2 ">
          {navItems.map((item) => {
            const url =
              item.href === '/' ? `/${locale}` : `/${locale}${item.href}`;
            const isActive =
              url === `/${locale}`
                ? pathname === url
                : pathname === url || pathname.startsWith(url + '/');

            const isOpen = openMenu === item.href;
            return (
              <li key={item.href} className="relative">
                <button
                  onClick={() => setOpenMenu(isOpen ? null : item.href)}
                  className={clsx(
                    'flex w-full items-center justify-between px-2 py-1 transition',
                    isActive
                      ? '!text-primary'
                      : 'text-foreground hover:text-primary'
                  )}
                >
                  {item.children ? (
                    <>
                      <span
                        className={clsx(
                          'flex items-center cursor-pointer gap-2 px-2 py-1 transition',
                          isActive
                            ? '!text-primary'
                            : 'text-foreground hover:text-primary'
                        )}
                      >
                        {item.icon}
                        {item.label}
                      </span>
                      {item.children && (
                        <span className="text-sm">{isOpen ? '−' : '+'}</span>
                      )}
                    </>
                  ) : (
                    <NextLink
                      href={url}
                      className={clsx(
                        'flex items-center gap-2 px-2 py-1 transition',
                        isActive
                          ? 'text-primary'
                          : 'text-foreground hover:text-primary'
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {item.icon}
                      {item.label}
                    </NextLink>
                  )}
                </button>
                {item.children && isOpen && (
                  <ul className="mt-1 pl-4 flex flex-col gap-1">
                    {item.children.map((child) => {
                      const childUrl =
                        child.href === '/'
                          ? `/${locale}`
                          : `/${locale}${child.href}`;

                      const isActiveChild =
                        pathname === childUrl ||
                        pathname.startsWith(childUrl + '/');

                      return (
                        <li key={child.href}>
                          <NextLink
                            href={childUrl}
                            className={clsx(
                              'flex items-center gap-2 px-2 py-1 transition',
                              isActiveChild
                                ? '!text-primary'
                                : 'text-foreground hover:text-primary'
                            )}
                            onClick={() => setOpen(false)}
                          >
                            {child.icon}
                            {child.label}
                          </NextLink>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
