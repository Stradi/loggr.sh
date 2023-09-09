'use client';

import { Button } from '@/components/ui/button';
import { Changelog } from '@/types/pb';
import Link from 'next/link';
import { useChangelogContext } from '../../_stores/changelog-store';
import SaveChangesButton from './save-changes-button';

type Props = { defaultChangelog: Changelog };
export function EditChangelogActionBar({ defaultChangelog }: Props) {
  const changelog = useChangelogContext((state) => state.changelog);

  return (
    <>
      <Button asChild variant="link">
        <Link href={`/dashboard/_/${changelog?.expand?.product?.slug}/changelogs/${changelog?.slug}`}>
          Back to readonly mode
        </Link>
      </Button>
      <SaveChangesButton />
    </>
  );
}
