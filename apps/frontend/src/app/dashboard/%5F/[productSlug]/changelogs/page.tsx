import createServerComponentClient from '@/lib/pocket-base/create-server-component-client';
import { Changelog } from '@/types/pb';
import CreateButton from './_components/create-button';
import { columns } from './_components/table/columns';
import DataTable from './_components/table/data-table';

async function fetchChangelogs(productSlug: string) {
  const pb = await createServerComponentClient();

  const records = await pb
    .collection('changelogs')
    .getList<Changelog>(0, 10, {
      filter: `product.slug = "${productSlug}" && product.admin_user.id = "${pb.authStore.model?.id}"`,
      expand: 'product',
      sort: '-created',
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
      <header className="flex justify-between items-center">
        <h1 className="text-xl font-medium">
          Changelogs (<span className="font-mono">{changelogs?.totalItems}</span>)
        </h1>
        <CreateButton />
      </header>
      <main>
        <DataTable columns={columns} data={changelogs?.items as Changelog[]} />
      </main>
    </section>
  );
}
