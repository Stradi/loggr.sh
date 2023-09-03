'use client';

import { usePathname } from 'next/navigation';
import { MouseEvent, RefObject, createRef, useEffect, useState } from 'react';
import DashboardNavigationItem from './navigation-item';

// TODO: We should probably change hrefs into something like this:
// `/dashboard/{PRODUCT_NAME}/changelogs`
// `/dashboard/{PRODUCT_NAME}/feedbacks`
// ...
// To do that, we probably need to move Items variable inside the BottomNavigation component.
// This is because, the user can have multiple products, and we need to know which product the user is currently viewing.
// We will use `/dashboard/settings` (other pages) for user's account settings and so on...

const Items: { label: string; href: string; ref: RefObject<HTMLAnchorElement> }[] = [
  {
    label: 'Overview',
    href: '/dashboard',
    ref: createRef<HTMLAnchorElement>(),
  },
  {
    label: 'Changelogs',
    href: '/dashboard/changelogs',
    ref: createRef<HTMLAnchorElement>(),
  },
  {
    label: 'Feedbacks',
    href: '/dashboard/feedbacks',
    ref: createRef<HTMLAnchorElement>(),
  },
  {
    label: 'Ideas',
    href: '/dashboard/ideas',
    ref: createRef<HTMLAnchorElement>(),
  },
  {
    label: 'Roadmap',
    href: '/dashboard/roadmap',
    ref: createRef<HTMLAnchorElement>(),
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    ref: createRef<HTMLAnchorElement>(),
  },
];

export default function BottomNavigation() {
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
    <nav className="relative border-b border-neutral-300">
      <div
        className="pointer-events-none absolute top-0 w-full h-full -z-10 shadow-inner bg-neutral-200/50 rounded-lg transition-[left,width] duration-200"
        style={{
          left: indicatorLeft - indicatorWidth / 2,
          width: indicatorWidth,
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
  );
}
