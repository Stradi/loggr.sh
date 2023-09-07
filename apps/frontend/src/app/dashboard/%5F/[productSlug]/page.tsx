'use client';

import { useSelectedProduct } from '../_contexts/selected-product-context';

export default function Page() {
  const selectedProduct = useSelectedProduct();

  return <div>Name of the product you&apos;re currently viewing is {selectedProduct.product?.name}</div>;
}
