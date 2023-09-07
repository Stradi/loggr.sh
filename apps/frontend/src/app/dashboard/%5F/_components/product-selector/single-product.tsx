import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/tailwind';
import { CheckIcon } from 'lucide-react';
import Link from 'next/link';

type Props = {
  product: any;
  isActive?: boolean;
};
export default function SingleProduct({ product, isActive }: Props) {
  return (
    <Button className={cn('w-full', isActive && 'shadow-inner')} variant={isActive ? 'secondary' : 'ghost'} asChild>
      <Link href={`/dashboard/_/${product.slug}`}>
        <div className="flex items-center w-[176px] justify-start">
          <div className="w-6 h-6 rounded-full mr-2 bg-gradient-to-br from-green-400 to-green-500 shrink-0" />
          <div className="truncate">{product.name}</div>
          {isActive && <CheckIcon className="shrink-0 ml-auto" size={16} />}
        </div>
      </Link>
    </Button>
  );
}
