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
import CreateProductForm from './create-product-form';

export default function CreateProductDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-8 h-8 p-0" title="Create a product">
          <PlusIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new product</DialogTitle>
          <DialogDescription>A product is a website you want to monitor.</DialogDescription>
        </DialogHeader>
        <CreateProductForm
          onCreate={() => {
            router.refresh();
            setIsOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
