'use client';

import { Button } from '@/components/ui/button';
import { LoaderIcon } from 'lucide-react';
import { useChangelogContext } from '../../_stores/changelog-store';

export default function SaveChangesButton() {
  const [isSaving, saveChangelogToDatabase] = useChangelogContext((state) => [
    state.isSaving,
    state.saveChangelogToDatabase,
  ]);

  return (
    <Button disabled={isSaving} onClick={saveChangelogToDatabase}>
      {isSaving && <LoaderIcon className="animate-spin mr-2" />}
      Save changes
    </Button>
  );
}
