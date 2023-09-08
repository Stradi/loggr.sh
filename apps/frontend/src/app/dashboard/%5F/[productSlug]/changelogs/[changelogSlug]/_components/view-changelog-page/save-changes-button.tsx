'use client';

import { Button } from '@/components/ui/button';
import usePocketBase from '@/hooks/usePocketBase';
import { Changelog } from '@/types/pb';
import { useRouter } from 'next/navigation';

type Props = {
  changelog: Changelog;
  isDisabled?: boolean;
};

export default function SaveChangesButton({ changelog, isDisabled }: Props) {
  const pb = usePocketBase();
  const router = useRouter();

  async function onClick() {
    const record = await pb
      ?.collection('changelogs')
      .update<Changelog>(changelog.id, changelog, {
        expand: 'product',
      })
      .catch(() => {
        return null;
      });

    if (record) {
      router.push(`/dashboard/_/${record.expand?.product?.slug}/changelogs/${record.slug}`);
    }
  }

  return (
    <Button onClick={onClick} disabled={isDisabled}>
      Save changes
    </Button>
  );
}
