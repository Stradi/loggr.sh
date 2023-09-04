import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils/tailwind';
import { ChevronsUpDownIcon } from 'lucide-react';
import { getSelectedProduct } from '../selected-product-context';
import Content from './content';

export default function ProductSelector() {
  const selectedProduct = getSelectedProduct();

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          'flex gap-2 items-center py-1 px-1.5 rounded-lg text-neutral-900',
          'transition-[background-color,box-shadow,color] duration-200',
          'hover:bg-neutral-200/50',
          "data-[state='open']:bg-neutral-200/50 data-[state='open']:shadow-inner"
        )}
      >
        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full" />
        <span className="font-medium text-sm">{selectedProduct.name}</span>
        <ChevronsUpDownIcon size={16} />
      </PopoverTrigger>
      <PopoverContent className="w-60 flex max-h-72">
        <Content />
      </PopoverContent>
    </Popover>
  );
}
