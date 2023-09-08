'use client';

import { Button } from '@/components/ui/button';
import { Changelog } from '@/types/pb';
import Link from 'next/link';

type Props = { defaultChangelog: Changelog };

export function EditChangelogActionBar({ defaultChangelog }: Props) {
  return (
    <>
      <Button asChild variant="ghost">
        <Link href={`/dashboard/_/${defaultChangelog.expand?.product?.slug}/changelogs/${defaultChangelog.slug}`}>
          Discard changes
        </Link>
      </Button>
      <Button>Save changes</Button>
    </>
  );
}
