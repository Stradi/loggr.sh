'use client';

import { toReadableDate } from '@/lib/utils/date';
import { cn } from '@/lib/utils/tailwind';
import { Changelog } from '@/types/pb';
import { ColumnDef } from '@tanstack/react-table';
import { CheckIcon, XIcon } from 'lucide-react';
import ActionsButton from './actions-button';

export const columns: ColumnDef<Changelog>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'slug',
    header: 'Slug',
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    cell: ({ row }) => {
      const tags = row.getValue('tags') as Changelog['tags'];

      return (
        <span
          className={cn(
            'flex gap-2 items-center px-2 py-1 rounded-full w-fit text-sm',
            tags === 'UNCATEGORIZED' && 'bg-neutral-100',
            tags === 'FIX' && 'bg-orange-100',
            tags === 'ANNOUNCEMENT' && 'bg-sky-100',
            tags === 'COMING_SOON' && 'bg-teal-100',
            tags === 'IMPROVEMENT' && 'bg-green-100'
          )}
        >
          {tags.slice(0, 1).toUpperCase() + tags.slice(1).toLowerCase()}
        </span>
      );
    },
  },
  {
    accessorKey: 'is_published',
    header: 'Published',
    cell: ({ row }) => {
      const isPublished = row.getValue('is_published');

      return (
        <span
          className={cn(
            'flex gap-2 items-center px-2 py-1 rounded-full w-fit text-sm',
            isPublished ? 'bg-green-100' : 'bg-red-100'
          )}
        >
          {isPublished ? (
            <>
              <CheckIcon size={16} /> Published
            </>
          ) : (
            <>
              <XIcon size={16} /> Not published
            </>
          )}
        </span>
      );
    },
  },
  {
    accessorKey: 'updated',
    header: 'Last Updated At',
    cell: ({ row }) => {
      const updated = row.getValue('updated') as string;

      return <span>{toReadableDate(updated)}</span>;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: (props) => {
      return <ActionsButton {...props} />;
    },
  },
];
