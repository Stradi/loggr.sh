'use client';

import { Button } from '@/components/ui/button';
import generateWordSlug from '@/lib/utils/generate-word-slug';
import { useRouter } from 'next/navigation';
import { useSelectedProduct } from '../../../_contexts/selected-product-context';

export default function CreateButton() {
  const router = useRouter();
  const selectedProduct = useSelectedProduct();

  function onClick() {
    const slug = generateWordSlug();
    router.push(`/dashboard/_/${selectedProduct.product?.slug}/changelogs/${slug}`);
  }

  return <Button onClick={onClick}>Create new changelog</Button>;
}
