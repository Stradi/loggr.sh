'use client';

import { Button } from '@/components/ui/button';
import { LoaderIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useChangelogContext } from '../../_stores/changelog-store';

export default function SaveChangesButton() {
  const [isSaving, changelog, saveChangelogToDatabase] = useChangelogContext((state) => [
    state.isSaving,
    state.changelog,
    state.saveChangelogToDatabase,
  ]);

  const router = useRouter();

  return (
    <Button
      disabled={isSaving}
      onClick={async () => {
        const newChangelog = await saveChangelogToDatabase();
        if (!newChangelog) return;

        router.replace(`/dashboard/_/${newChangelog?.expand?.product?.slug}/changelogs/${newChangelog?.slug}?edit=1`);
      }}
    >
      {isSaving && <LoaderIcon className="animate-spin mr-2" />}
      Save changes
    </Button>
  );
}
