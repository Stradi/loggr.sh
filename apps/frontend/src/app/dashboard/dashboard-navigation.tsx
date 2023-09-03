'use client';

import { usePathname } from 'next/navigation';
import { MouseEvent, RefObject, createRef, useEffect, useState } from 'react';
import DashboardNavigationItem from './dashboard-navigation-item';

const Items: { label: string; href: string; ref: RefObject<HTMLAnchorElement> }[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    ref: createRef<HTMLAnchorElement>(),
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    ref: createRef<HTMLAnchorElement>(),
  },
  {
    label: 'Usage',
    href: '/dashboard/usage',
    ref: createRef<HTMLAnchorElement>(),
  },
  {
    label: 'Billing',
    href: '/dashboard/billing',
    ref: createRef<HTMLAnchorElement>(),
  },
];

export default function DashboardNavigation() {
  const [indicatorLeft, setIndicatorLeft] = useState(0);
  const [indicatorWidth, setIndicatorWidth] = useState(0);

  const pathname = usePathname();
  const activeItem = Items.find((item) => item.href === pathname);

  function onMouseEnter(e: MouseEvent<HTMLAnchorElement>) {
    const target = e.target as HTMLAnchorElement;
    const { offsetLeft, offsetWidth } = target;

    setIndicatorLeft(offsetLeft + offsetWidth / 2);
    setIndicatorWidth(offsetWidth);
  }

  function moveIndicatorToActiveItem() {
    if (activeItem && activeItem.ref && activeItem.ref.current) {
      setIndicatorLeft(activeItem.ref.current.offsetLeft + activeItem.ref.current.offsetWidth / 2);
      setIndicatorWidth(activeItem.ref.current.offsetWidth);
    } else {
      setIndicatorWidth(0);
    }
  }

  useEffect(() => {
    moveIndicatorToActiveItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="">
      <nav className="relative border-b border-neutral-300">
        <div
          className="absolute -bottom-0.5 h-0.5 bg-neutral-950 rounded-full transition-[left,width] duration-300"
          style={{
            left: indicatorLeft - (indicatorWidth * 0.75) / 2,
            width: indicatorWidth * 0.75,
          }}
        />

        <div className="flex justify-between items-center">
          <ul className="flex group/all [&>*]:px-4 [&>*]:py-2" onMouseLeave={moveIndicatorToActiveItem}>
            {Items.map((item, index) => (
              <DashboardNavigationItem
                key={index}
                ref={item.ref}
                href={item.href}
                isActive={item.href === activeItem?.href}
                onMouseEnter={onMouseEnter}
              >
                {item.label}
              </DashboardNavigationItem>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
