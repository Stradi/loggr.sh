import { Button } from '@/components/ui/button';
import { Changelog } from '@/types/pb';
import Link from 'next/link';

type Props = {
  changelog: Changelog;
};

export default function CancelEditingButton({ changelog }: Props) {
  return (
    <Button asChild variant="ghost">
      <Link href={`/dashboard/_/${changelog.expand?.product?.slug}/changelogs/${changelog.slug}`}>Cancel editing</Link>
    </Button>
  );
}
