'use client';

import { Button } from '@/components/ui/button';
import usePocketBase from '@/hooks/usePocketBase';
import { Changelog } from '@/types/pb';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  changelog: Changelog;
  isDisabled?: boolean;
};

export default function SaveChangesButton({ changelog, isDisabled }: Props) {
  const [attemptedSave, setAttemptedSave] = useState(false);
  const [hasSavedSuccesfully, setHasSavedSuccesfully] = useState(false);

  const pb = usePocketBase();
  const router = useRouter();

  async function onClick() {
    setAttemptedSave(true);

    const record = await pb
      ?.collection('changelogs')
      .update(changelog.id, changelog)
      .catch(() => {
        setHasSavedSuccesfully(false);
        return null;
      });

    if (record) {
      setHasSavedSuccesfully(true);
      router.refresh();
    }
  }

  return (
    <Button onClick={onClick} disabled={isDisabled}>
      {attemptedSave ? (hasSavedSuccesfully ? 'Save changes' : 'An error occured') : 'Save changes'}
    </Button>
  );
}
