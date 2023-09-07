import createServerComponentClient from '@/lib/pocket-base/create-server-component-client';
import { Changelog } from '@/types/pb';
import NewChangelogPage from './_components/new-changelog-page/index';
import ViewChangelogPage from './_components/view-changelog-page/index';

async function fetchChangelog(productSlug: string, changelogSlug: string) {
  const pb = await createServerComponentClient();

  const record = await pb
    .collection('changelogs')
    .getFirstListItem<Changelog>(
      `slug = "${changelogSlug}" && product.slug = "${productSlug}" && product.admin_user.id = "${pb.authStore.model?.id}"`,
      {
        expand: 'product',
      }
    )
    .catch(() => null);

  return record;
}

type Props = {
  params: {
    productSlug: string;
    changelogSlug: string;
  };
  searchParams: {
    edit?: '1';
  };
};

export default async function Page(props: Props) {
  const changelog = await fetchChangelog(props.params.productSlug, props.params.changelogSlug);
  const isEditable = 'edit' in props.searchParams;

  return (
    <main className="[&>*]:space-y-2 [&>*]:h-full [&>*]:flex [&>*]:flex-col">
      {changelog ? <ViewChangelogPage changelog={changelog} isEditable={isEditable} /> : <NewChangelogPage />}
    </main>
  );
}
