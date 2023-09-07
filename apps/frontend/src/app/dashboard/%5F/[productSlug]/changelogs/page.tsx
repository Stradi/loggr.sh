import createServerComponentClient from '@/lib/pocket-base/create-server-component-client';
import { Changelog } from '@/types/pb';
import CreateButton from './_components/create-button';
import MiniChangelog from './_components/mini-changelog';

async function fetchChangelogs(productSlug: string) {
  const pb = await createServerComponentClient();

  const records = await pb
    .collection('changelogs')
    .getList<Changelog>(0, 10, {
      filter: `product.slug = "${productSlug}" && product.admin_user.id = "${pb.authStore.model?.id}"`,
      expand: 'product',
    })
    .catch(() => null);

  return records;
}

type Props = {
  params: {
    productSlug: string;
  };
};
export default async function Page({ params: { productSlug } }: Props) {
  const changelogs = await fetchChangelogs(productSlug);

  return (
    <section className="space-y-4">
      <header className="flex justify-between">
        <h1 className="text-xl font-medium">
          Changelogs (<span className="font-mono">{changelogs?.totalItems}</span>)
        </h1>
        <CreateButton />
      </header>
      <main>
        {changelogs?.items.map((changelog) => (
          <MiniChangelog key={changelog.id} changelog={changelog} />
        ))}
      </main>
    </section>
  );
}
