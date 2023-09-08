import MyEditor from '@/components/my-editor';
import { generateDocumentJSON } from '@/lib/utils/editor';
import { Changelog } from '@/types/pb';

type Props = { defaultChangelog: Changelog };
export default function ViewChangelogPage({ defaultChangelog }: Props) {
  return (
    <MyEditor
      editable={false}
      defaultValue={generateDocumentJSON(
        defaultChangelog.name,
        defaultChangelog.short_description,
        defaultChangelog.content
      )}
    />
  );
}
