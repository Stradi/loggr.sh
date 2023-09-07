import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils/tailwind';
import Content from './content';
import PopoverTriggerContent from './popover-trigger-content';

export default function ProductSelector() {
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
        <PopoverTriggerContent />
      </PopoverTrigger>
      <PopoverContent className="w-60 flex max-h-72">
        <Content />
      </PopoverContent>
    </Popover>
  );
}
