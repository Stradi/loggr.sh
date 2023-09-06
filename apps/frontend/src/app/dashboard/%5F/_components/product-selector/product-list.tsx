'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Product } from '@/types/pb';
import { useSelectedProduct } from '../../_contexts/selected-product-context';
import SingleProduct from './single-product';

type Props = {
  products: Product[];
};

export default function ProductList({ products }: Props) {
  const selectedProduct = useSelectedProduct();

  return (
    <ScrollArea className="grow">
      <ul className="space-y-1">
        {products.map((product) => (
          <SingleProduct key={product.id} product={product} isActive={product.slug === selectedProduct.product?.slug} />
        ))}
      </ul>
      {products.length === 0 && (
        <div className="space-y-2">
          <p className="text-sm">You don&apos;t have a product yet.</p>
        </div>
      )}
    </ScrollArea>
  );
}
