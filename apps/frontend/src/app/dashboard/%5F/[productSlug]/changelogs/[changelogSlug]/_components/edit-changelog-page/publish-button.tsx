'use client';

import { Button } from '@/components/ui/button';
import { Changelog } from '@/types/pb';
import { useChangelogContext } from '../../_stores/changelog-store';

export default function PublishButton() {
  const [isSaving, changelog, setChangelog, saveChangelogToDatabase] = useChangelogContext((state) => [
    state.isSaving,
    state.changelog,
    state.setChangelog,
    state.saveChangelogToDatabase,
  ]);

  return (
    <Button
      variant="secondary"
      disabled={isSaving}
      onClick={() => {
        setChangelog({
          ...changelog,
          is_published: !changelog?.is_published,
        } as Changelog);

        saveChangelogToDatabase();
      }}
    >
      {changelog?.is_published ? 'Unpublish' : 'Publish'}
    </Button>
  );
}
