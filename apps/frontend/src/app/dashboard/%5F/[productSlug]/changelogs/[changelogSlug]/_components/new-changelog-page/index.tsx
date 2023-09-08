'use client';

import MyEditor from '@/components/my-editor';
import { generateDocumentJSON } from '@/lib/utils/editor';
import { Changelog } from '@/types/pb';

type Props = { defaultChangelog: Changelog };

export default function NewChangelogPage({ defaultChangelog }: Props) {
  const defaultEditorValue = generateDocumentJSON(
    defaultChangelog.name,
    defaultChangelog.short_description,
    defaultChangelog.content
  );

  return (
    <>
      <MyEditor editable={true} defaultValue={defaultEditorValue} />
    </>
  );
}
