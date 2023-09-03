import { cn } from '@/lib/utils/tailwind';
import { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'div'>;
export default function Container({ children, className, ...props }: Props) {
  return (
    <div className={cn('container mx-auto max-w-7xl p-0', className)} {...props}>
      {children}
    </div>
  );
}
