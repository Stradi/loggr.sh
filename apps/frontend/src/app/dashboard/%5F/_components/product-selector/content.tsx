import createServerComponentClient from '@/lib/pocket-base/create-server-component-client';
import { Product } from '@/types/pb';
import CreateProductDialog from './create-product-dialog';
import ProductList from './product-list';

async function getProductsOfUser() {
  const pb = await createServerComponentClient();
  const user = pb.authStore.model;

  const products = await pb.collection('products').getList<Product>(1, 10, {
    filter: `admin_user.id = "${user?.id}"`,
  });

  return products;
}

export default async function Content() {
  const products = await getProductsOfUser();

  return (
    <div className="flex flex-col">
      <header className="mb-4 flex justify-between items-center">
        <h4 className="text-sm font-medium leading-none">My Products ({products.totalItems})</h4>
        <CreateProductDialog />
      </header>
      <ProductList products={products.items} />
    </div>
  );
}
