import MyEditor from '@/components/my-editor';
import createServerComponentClient from '@/lib/pocket-base/create-server-component-client';
import { generateDocumentJSON } from '@/lib/utils/editor';
import { Changelog } from '@/types/pb';

type Props = { defaultChangelog: Changelog };
export default async function ViewChangelogPage({ defaultChangelog }: Props) {
  const pb = await createServerComponentClient();

  return (
    <div className="max-w-2xl space-y-4 mx-auto">
      {defaultChangelog.featured_image !== '' && defaultChangelog.featured_image !== undefined && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="aspect-video object-contain rounded-lg"
          src={pb.files.getUrl(defaultChangelog, defaultChangelog.featured_image as string)}
          alt={defaultChangelog.name}
        />
      )}

      <MyEditor
        editable={false}
        defaultValue={generateDocumentJSON(
          defaultChangelog.name,
          defaultChangelog.short_description,
          defaultChangelog.content
        )}
      />
    </div>
  );
}
