'use client';

import { Button } from '@/components/ui/button';
import { Changelog } from '@/types/pb';

type Props = { defaultChangelog: Changelog };

export function NewChangelogPageActionBar({ defaultChangelog }: Props) {
  return <Button>Save as draft</Button>;
}
