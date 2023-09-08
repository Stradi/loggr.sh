'use client';

import MyEditor from '@/components/my-editor';
import { generateDocumentJSON } from '@/lib/utils/editor';
import { Changelog } from '@/types/pb';
import { useChangelogContext } from '../../_stores/changelog-store';

type Props = { defaultChangelog: Changelog };

export default function EditChangelogPage({ defaultChangelog }: Props) {
  const [changelog, setChangelog] = useChangelogContext((state) => [state.changelog, state.setChangelog]);

  return (
    <MyEditor
      editable={true}
      defaultValue={generateDocumentJSON(
        changelog?.name as string,
        changelog?.short_description as string,
        changelog?.content as any[]
      )}
      onSave={(data) => {
        setChangelog({
          ...changelog,
          name: data.title,
          short_description: data.description,
          content: data.content,
        } as Changelog);
      }}
    />
  );
}
