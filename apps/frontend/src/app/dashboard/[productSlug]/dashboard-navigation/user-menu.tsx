'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils/tailwind';
import { BarChart2Icon, CreditCardIcon, LogOutIcon, Settings2Icon, UserPlusIcon, UsersIcon } from 'lucide-react';
import { ReactNode } from 'react';

const Items: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}[][] = [
  [
    {
      icon: <CreditCardIcon className="mr-2" size={16} />,
      label: 'Billing',
      onClick: () => {},
    },
    {
      icon: <BarChart2Icon className="mr-2" size={16} />,
      label: 'Usage',
      onClick: () => {},
    },
    {
      icon: <Settings2Icon className="mr-2" size={16} />,
      label: 'Settings',
      onClick: () => {},
    },
  ],
  [
    {
      icon: <UsersIcon className="mr-2" size={16} />,
      label: 'Team',
      onClick: () => {},
    },
    {
      icon: <UserPlusIcon className="mr-2" size={16} />,
      label: 'Invite new user',
      onClick: () => {},
    },
  ],
  [
    {
      icon: <LogOutIcon className="mr-2" size={16} />,
      label: 'Log out',
      onClick: () => {},
    },
  ],
];

export default function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'flex gap-2 items-center py-1 px-1.5 rounded-lg text-neutral-900',
          'transition-[background-color,box-shadow,color] duration-200',
          'hover:bg-neutral-200/50',
          "data-[state='open']:bg-neutral-200/50 data-[state='open']:shadow-inner"
        )}
      >
        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full" />
        <span className="text-sm font-medium">Batın Evirgen</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Items.map<ReactNode>((group, idx) => (
          <DropdownMenuGroup key={idx}>
            {group.map((item, idx) => (
              <DropdownMenuItem key={idx} onClick={item.onClick}>
                {item.icon}
                <span>{item.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        )).reduce((prev, curr, idx) => [prev, <DropdownMenuSeparator key={idx} />, curr])}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
