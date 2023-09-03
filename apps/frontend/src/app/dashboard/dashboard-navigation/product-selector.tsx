'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils/tailwind';
import { ChevronsDownUpIcon, ChevronsUpDownIcon } from 'lucide-react';
import { useState } from 'react';

export default function ProductSelector() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger
        className={cn(
          'flex gap-2 items-center py-1 px-1.5 rounded-lg text-neutral-900',
          'transition-[background-color,box-shadow,color] duration-200',
          'hover:bg-neutral-200/50',
          "data-[state='open']:bg-neutral-200/50 data-[state='open']:shadow-inner"
        )}
      >
        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full" />
        <span className="text-sm font-medium">Product Name</span>
        {isOpen ? <ChevronsDownUpIcon size={16} /> : <ChevronsUpDownIcon size={16} />}
      </PopoverTrigger>
      <PopoverContent>TODO</PopoverContent>
    </Popover>
  );
}
