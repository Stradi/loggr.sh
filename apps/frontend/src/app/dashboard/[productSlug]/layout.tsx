import Container from '@/components/ui/container';
import createServerComponentClient from '@/lib/pocket-base/create-server-component-client';
import { notFound } from 'next/navigation';
import { PropsWithChildren } from 'react';
import DashboardNavigation from './dashboard-navigation';
import { setSelectedProduct } from './selected-product-context';

type Props = PropsWithChildren & {
  params: {
    productSlug: string;
  };
};

async function fetchProduct(slug: string) {
  const pb = await createServerComponentClient();
  const record = await pb
    .collection('products')
    .getFirstListItem(`admin_user.id = "${pb.authStore.model?.id}" && slug = "${slug}"`)
    .catch(() => null);

  if (!record) {
    return notFound();
  }

  return record;
}

export default async function Layout({ children, params: { productSlug } }: Props) {
  const product = await fetchProduct(productSlug);
  setSelectedProduct(product);

  return (
    <Container>
      <DashboardNavigation />
      <main className="p-4">{children}</main>
    </Container>
  );
}
