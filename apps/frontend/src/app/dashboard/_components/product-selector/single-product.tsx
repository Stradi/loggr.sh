import { Button } from '@/components/ui/button';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

type Props = {
  product: any;
};
export default function SingleProduct({ product }: Props) {
  return (
    <Button
      asChild
      variant="outline"
      className="items-start flex-col w-64 p-4 gap-4 h-auto relative group"
      title={product.name}
    >
      <Link href={`/dashboard/_/${product.slug}`}>
        <div className="flex items-center w-[90%]">
          <div className="w-10 h-10 rounded-full mr-2 bg-gradient-to-br from-green-400 to-green-500 shrink-0" />
          <div className="min-w-0">
            <p className="truncate">{product.name}</p>
            <p className="truncate font-normal text-xs text-neutral-700">{product.website_url}</p>
          </div>
          <ChevronRightIcon
            size={16}
            className="ml-auto absolute right-4 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition duration-200"
          />
        </div>
      </Link>
    </Button>
  );
}
