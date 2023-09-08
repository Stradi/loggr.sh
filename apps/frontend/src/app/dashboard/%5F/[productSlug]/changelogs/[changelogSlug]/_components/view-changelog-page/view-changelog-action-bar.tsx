import { Button } from '@/components/ui/button';
import { Changelog } from '@/types/pb';
import Link from 'next/link';

type Props = { defaultChangelog: Changelog };

export function ViewChangelogPageActionBar({ defaultChangelog }: Props) {
  return (
    <Button asChild>
      <Link href={`/dashboard/_/${defaultChangelog.expand?.product?.slug}/changelogs/${defaultChangelog.slug}?edit=1`}>
        Edit this changelog
      </Link>
    </Button>
  );
}
