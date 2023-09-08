import { Button } from '@/components/ui/button';
import { Changelog } from '@/types/pb';
import Link from 'next/link';
import PublishButton from './publish-button';
import SaveChangesButton from './save-changes-button';

type Props = { defaultChangelog: Changelog };
export function EditChangelogActionBar({ defaultChangelog }: Props) {
  return (
    <>
      <Button asChild variant="link">
        <Link href={`/dashboard/_/${defaultChangelog.expand?.product?.slug}/changelogs/${defaultChangelog.slug}`}>
          Back to readonly mode
        </Link>
      </Button>
      <PublishButton />
      <SaveChangesButton />
    </>
  );
}
