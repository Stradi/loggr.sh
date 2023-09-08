import createServerComponentClient from '@/lib/pocket-base/create-server-component-client';
import { Changelog } from '@/types/pb';
import EditChangelogPage from './_components/edit-changelog-page';
import { EditChangelogActionBar } from './_components/edit-changelog-page/edit-changelog-action-bar';
import NewChangelogPage from './_components/new-changelog-page';
import { NewChangelogPageActionBar } from './_components/new-changelog-page/new-changelog-action-bar';
import ViewChangelogPage from './_components/view-changelog-page';
import { ViewChangelogPageActionBar } from './_components/view-changelog-page/view-changelog-action-bar';

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

  const actionBarToRender = changelog ? (
    isEditable ? (
      <EditChangelogActionBar defaultChangelog={changelog as Changelog} />
    ) : (
      <ViewChangelogPageActionBar defaultChangelog={changelog as Changelog} />
    )
  ) : (
    <NewChangelogPageActionBar
      defaultChangelog={
        {
          name: props.params.changelogSlug
            .split('-')
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join(' '),
          slug: props.params.changelogSlug,
          short_description: 'Wohoo! This is a new changelog! 🎉🥳',
          content: [],
        } as Changelog
      }
    />
  );

  return (
    <main className="">
      <div className="flex gap-2 [&>*]:w-fit justify-end">{actionBarToRender}</div>
      {changelog ? (
        isEditable ? (
          <EditChangelogPage defaultChangelog={changelog} />
        ) : (
          <ViewChangelogPage defaultChangelog={changelog} />
        )
      ) : (
        <NewChangelogPage
          defaultChangelog={
            {
              name: props.params.changelogSlug
                .split('-')
                .map((word) => word[0].toUpperCase() + word.slice(1))
                .join(' '),
              slug: props.params.changelogSlug,
              short_description: 'Wohoo! This is a new changelog! 🎉🥳',
              content: [],
            } as Changelog
          }
        />
      )}
    </main>
  );
}
