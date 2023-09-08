import { Button } from '@/components/ui/button';
import { Changelog } from '@/types/pb';
import Link from 'next/link';

type Props = {
  changelog: Changelog;
};

export default function EditChangelogButton({ changelog }: Props) {
  return (
    <Button asChild>
      <Link href={`/dashboard/_/${changelog.expand?.product?.slug}/changelogs/${changelog.slug}?edit=1`}>
        Edit this changelog
      </Link>
    </Button>
  );
}
