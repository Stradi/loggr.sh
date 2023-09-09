'use client';

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import usePocketBase from '@/hooks/usePocketBase';
import { Changelog } from '@/types/pb';
import { TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Trigger() {
  return (
    <AlertDialogTrigger asChild>
      <DropdownMenuItem>
        <span className="flex items-center">
          <TrashIcon className="mr-2" size={16} /> Delete this changelog
        </span>
      </DropdownMenuItem>
    </AlertDialogTrigger>
  );
}

type ContentProps = {
  changelog: Changelog;
  onActionClicked: (isSuccess: boolean) => void;
};

export function Content({ changelog, onActionClicked }: ContentProps) {
  const pb = usePocketBase();
  const router = useRouter();

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure you want to delete this changelog?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the changelog named &apos;{changelog.name}&apos;.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={() => onActionClicked(false)}>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={(e) => {
            e.preventDefault();
            pb?.collection('changelogs')
              .delete(changelog.id)
              .then(() => {
                router.refresh();
                onActionClicked(true);
              });
          }}
        >
          Yes, delete this changelog
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
