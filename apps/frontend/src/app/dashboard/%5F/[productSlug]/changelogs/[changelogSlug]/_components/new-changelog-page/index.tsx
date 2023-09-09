'use client';

import MyEditor from '@/components/my-editor';
import { generateDocumentJSON } from '@/lib/utils/editor';
import { Changelog } from '@/types/pb';
import { useChangelogContext } from '../../_stores/changelog-store';

type Props = { defaultChangelog: Changelog };

export default function NewChangelogPage({ defaultChangelog }: Props) {
  const defaultEditorValue = generateDocumentJSON(
    defaultChangelog.name,
    defaultChangelog.short_description,
    defaultChangelog.content
  );

  const forceSetChangelog = useChangelogContext((state) => state.forceSetChangelog);

  return (
    <MyEditor
      editable={true}
      defaultValue={defaultEditorValue}
      onSave={(data) => {
        forceSetChangelog({
          ...defaultChangelog,
          name: data.title,
          short_description: data.description,
          content: data.content,
        });
      }}
    />
  );
}
