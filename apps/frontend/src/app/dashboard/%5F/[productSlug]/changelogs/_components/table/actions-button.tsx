import { AlertDialog } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Changelog } from '@/types/pb';
import { CellContext } from '@tanstack/react-table';
import { LinkIcon, MoreHorizontalIcon, PencilIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Content, Trigger } from './delete-changelog-alert-dialog';

type Props = CellContext<Changelog, unknown>;

export default function ActionsButton({ row }: Props) {
  const changelog = row.original;

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <MoreHorizontalIcon className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              className="flex items-center"
              href={`/dashboard/_/${changelog.expand?.product?.slug}/changelogs/${changelog.slug}`}
            >
              <LinkIcon size={16} className="mr-2" /> View changelog
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className="flex items-center"
              href={`/dashboard/_/${changelog.expand?.product?.slug}/changelogs/${changelog.slug}?edit=1`}
            >
              <PencilIcon size={16} className="mr-2" />
              Edit changelog
            </Link>
          </DropdownMenuItem>
          <Trigger />
        </DropdownMenuContent>
      </DropdownMenu>
      <Content
        changelog={changelog}
        onActionClicked={(success) => {
          setIsDeleteDialogOpen(false);
        }}
      />
    </AlertDialog>
  );
}
