'use client';

import { useLogout, useMe } from '@/lib/auth';
import { Avatar } from '@heroui/avatar';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/popover';
import { IconUsers, IconLogout } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export default function FooterAdmin() {
  const router = useRouter();
  const { mutate: logout } = useLogout();
  const { data: user } = useMe(true);

  const handleLogout = () => {
    router.push('/admin/login');
    logout();
  };

  return (
    <>
      <Popover placement="right">
        <PopoverTrigger>
          <div className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-800/40 transition-colors">
            <Avatar name={user?.name} size="md" />
            <div className="ml-3 text-left">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-gray-400">View profile</p>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-2 bg-[#1e293b] text-white rounded-xl">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2 p-2 hover:bg-gray-700/50 rounded-md cursor-pointer">
              <IconUsers size={16} />
              <span>Admin Profile</span>
            </div>

            <button
              className="flex items-center gap-2 p-2 text-red-400 hover:bg-gray-700/50 rounded-md cursor-pointer"
              onClick={handleLogout}
            >
              <IconLogout size={16} />
              <span>Logout</span>
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
