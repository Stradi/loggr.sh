'use client';

import { Button } from '@/components/ui/button';
import usePocketBase from '@/hooks/usePocketBase';
import { Changelog, Product } from '@/types/pb';
import { useRouter } from 'next/navigation';
import slugify from 'slugify';

type Props = {
  changelog: Partial<Changelog>;
  product: Product;
};

export default function CreateChangelogButton({ changelog, product }: Props) {
  const pb = usePocketBase();
  const router = useRouter();

  const isDisabled = !changelog.name || !changelog.short_description || !changelog.content;

  async function onClick() {
    if (isDisabled) return;

    const createData = {
      slug: slugify(changelog.name as string, { lower: true, strict: true }),
      product: product.id,
      ...changelog,
    };

    const record = await pb?.collection('changelogs').create<Changelog>(createData, {
      expand: 'product',
    });
    router.push(`/dashboard/_/${record?.expand?.product?.slug}/changelogs/${record?.slug}?edit=1`);
  }

  return (
    <Button disabled={isDisabled} onClick={onClick}>
      Create changelog
    </Button>
  );
}
