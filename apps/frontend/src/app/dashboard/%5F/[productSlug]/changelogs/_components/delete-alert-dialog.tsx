'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import usePocketBase from '@/hooks/usePocketBase';
import { Changelog } from '@/types/pb';
import { TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ClientResponseError } from 'pocketbase';
import { useState } from 'react';

type Props = {
  changelog: Changelog;
};
export default function DeleteAlertDialog({ changelog }: Props) {
  const pb = usePocketBase();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<null | string>(null);

  return (
    <AlertDialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        setError(null);
      }}
    >
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Delete this changelog">
          <TrashIcon size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this changelog?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the changelog named &apos;{changelog.name}&apos;.
          </AlertDialogDescription>
          {error && <AlertDialogDescription className="text-red-500 text-sm">{error}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              pb?.collection('changelogs')
                .delete(changelog.id)
                .then(() => {
                  setOpen(false);
                  router.refresh();
                })
                .catch((e) => {
                  if (e instanceof ClientResponseError) {
                    setError(e.message);
                  } else {
                    setError('Something went wrong. Please try again latest.');
                  }
                });
            }}
          >
            Yes, delete this changelog
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
