import createServerComponentClient from '@/lib/pocket-base/create-server-component-client';
import { Changelog } from '@/types/pb';
import EditChangelogPage from './_components/edit-changelog-page';
import { EditChangelogActionBar } from './_components/edit-changelog-page/edit-changelog-action-bar';
import NewChangelogPage from './_components/new-changelog-page';
import { NewChangelogPageActionBar } from './_components/new-changelog-page/new-changelog-action-bar';
import Sidebar from './_components/sidebar';
import ViewChangelogPage from './_components/view-changelog-page';
import { ViewChangelogPageActionBar } from './_components/view-changelog-page/view-changelog-action-bar';
import { ChangelogProvider } from './_stores/changelog-store';

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

  const newChangelogData = {
    name: props.params.changelogSlug
      .split('-')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' '),
    slug: props.params.changelogSlug,
    short_description: 'Wohoo! This is a new changelog! 🎉🥳',
    content: [],
  } as Changelog;

  const actionBarToRender = changelog ? (
    isEditable ? (
      <EditChangelogActionBar defaultChangelog={changelog as Changelog} />
    ) : (
      <ViewChangelogPageActionBar defaultChangelog={changelog as Changelog} />
    )
  ) : (
    <NewChangelogPageActionBar defaultChangelog={changelog as unknown as Changelog} />
  );

  return (
    <main className="space-y-2">
      <ChangelogProvider changelog={changelog || newChangelogData}>
        <div className="flex justify-between items-center">
          <div className="text-sm">
            {changelog?.is_published ? (
              <span>
                This changelog is <strong>published</strong> and can be viewed by all of your users.
              </span>
            ) : (
              <span>
                This changelog is <strong>not published</strong> and only you can view it.
              </span>
            )}
          </div>
          <div className="space-x-1">{actionBarToRender}</div>
        </div>
        {changelog ? (
          isEditable ? (
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <EditChangelogPage defaultChangelog={changelog} />
              </div>
              <Sidebar />
            </div>
          ) : (
            <ViewChangelogPage defaultChangelog={changelog} />
          )
        ) : (
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <NewChangelogPage defaultChangelog={newChangelogData} />
            </div>
            <Sidebar />
          </div>
        )}
      </ChangelogProvider>
    </main>
  );
}
