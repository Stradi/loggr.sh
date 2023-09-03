import { cn } from '@/lib/utils/tailwind';
import Link from 'next/link';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

type Props = ComponentPropsWithoutRef<typeof Link> & {
  isActive?: boolean;
};
const DashboardNavigationItem = forwardRef<ElementRef<typeof Link>, Props>(({ isActive, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      className={cn(
        'text-sm font-medium text-neutral-400',
        'group/item group-hover/all:hover:text-neutral-950 group-hover/all:text-neutral-400',
        'transition-[color] duration-200',
        isActive && 'text-neutral-950'
      )}
      {...props}
    />
  );
});

DashboardNavigationItem.displayName = 'DashboardNavigationItem';
export default DashboardNavigationItem;
