'use client';

import { usePathname } from 'next/navigation';
import { MouseEvent, RefObject, createRef, useEffect, useMemo, useState } from 'react';
import DashboardNavigationItem from './navigation-item';

const Items: (productName: string) => { label: string; href: string; ref: RefObject<HTMLAnchorElement> }[] = (
  productName
) => {
  return [
    {
      label: 'Overview',
      href: `/dashboard/_/${productName}`,
      ref: createRef<HTMLAnchorElement>(),
    },
    {
      label: 'Changelogs',
      href: `/dashboard/_/${productName}/changelogs`,
      ref: createRef<HTMLAnchorElement>(),
    },
    {
      label: 'Feedbacks',
      href: `/dashboard/_/${productName}/feedbacks`,
      ref: createRef<HTMLAnchorElement>(),
    },
    {
      label: 'Ideas',
      href: `/dashboard/_/${productName}/ideas`,
      ref: createRef<HTMLAnchorElement>(),
    },
    {
      label: 'Roadmap',
      href: `/dashboard/_/${productName}/roadmap`,
      ref: createRef<HTMLAnchorElement>(),
    },
    {
      label: 'Settings',
      href: `/dashboard/_/${productName}/settings`,
      ref: createRef<HTMLAnchorElement>(),
    },
  ];
};

export default function BottomNavigation() {
  const [indicatorLeft, setIndicatorLeft] = useState(0);
  const [indicatorWidth, setIndicatorWidth] = useState(0);

  const pathname = usePathname();
  const productName = pathname.split('/')[3];

  const cachedItems = useMemo(() => {
    return Items(productName);
  }, [productName]);

  // We are reversing the array because the first item (Overview) contains the most common path
  // and `find` method will return Overview even if the path is `/dashboard/_/${productName}/changelogs/new`.
  const activeItem = [...cachedItems].reverse().find((item) => pathname.includes(item.href));

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
          {cachedItems.map((item, index) => (
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
