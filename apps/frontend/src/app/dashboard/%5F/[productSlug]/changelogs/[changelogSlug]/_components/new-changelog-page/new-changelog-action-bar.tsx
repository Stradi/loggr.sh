'use client';

import { useSelectedProduct } from '@/app/dashboard/%5F/_contexts/selected-product-context';
import { Button } from '@/components/ui/button';
import usePocketBase from '@/hooks/usePocketBase';
import { Changelog } from '@/types/pb';
import { useRouter } from 'next/navigation';
import { useChangelogContext } from '../../_stores/changelog-store';

type Props = { defaultChangelog: Changelog };
export function NewChangelogPageActionBar({ defaultChangelog }: Props) {
  const pb = usePocketBase();
  const router = useRouter();

  const selectedProduct = useSelectedProduct();
  const [changelog, setChangelog] = useChangelogContext((state) => [state.changelog, state.setChangelog]);

  async function onClick() {
    const record = await pb?.collection('changelogs').create<Changelog>(
      {
        ...changelog,
        is_published: false,
        product: selectedProduct.product?.id,
      },
      {
        expand: 'product',
      }
    );

    if (!record) return;

    setChangelog(record);
    router.push(`/dashboard/_/${record.expand?.product?.slug}/changelogs/${record.slug}?edit=1`);
  }

  return <Button onClick={onClick}>Save as draft</Button>;
}
