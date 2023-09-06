'use client';

import { ChevronsUpDownIcon } from 'lucide-react';
import { useSelectedProduct } from '../../_contexts/selected-product-context';

export default function PopoverTriggerContent() {
  const selectedProduct = useSelectedProduct();

  return (
    <>
      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full" />
      <span className="font-medium text-sm">{selectedProduct.product?.name}</span>
      <ChevronsUpDownIcon size={16} />
    </>
  );
}
