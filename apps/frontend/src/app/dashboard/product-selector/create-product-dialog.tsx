'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CreateProductForm from './../[productSlug]/product-selector/create-product-form';

export default function CreateProductDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="items-start flex-col w-64 p-4 gap-4 h-auto relative group">
          <div className="flex items-center w-[90%]">
            <div className="w-10 h-10 rounded-full mr-2 bg-gradient-to-br from-green-400 to-green-500 shrink-0" />
            <div className="min-w-0">
              <p className="truncate">Create new product</p>
            </div>
            <PlusIcon
              size={16}
              className="ml-auto absolute right-4 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition duration-200"
            />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new product</DialogTitle>
          <DialogDescription>A product is a website you want to monitor.</DialogDescription>
        </DialogHeader>
        <CreateProductForm
          onCreate={() => {
            setIsOpen(false);
            router.refresh();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
