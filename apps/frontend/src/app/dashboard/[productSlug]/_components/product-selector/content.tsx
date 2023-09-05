import { ScrollArea } from '@/components/ui/scroll-area';
import createServerComponentClient from '@/lib/pocket-base/create-server-component-client';
import { Product } from '@/types/pb';
import { getSelectedProduct } from '../../selected-product-context';
import CreateProductDialog from './create-product-dialog';
import SingleProduct from './single-product';

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

  const selectedProduct = getSelectedProduct();

  return (
    <div className="flex flex-col">
      <header className="mb-4 flex justify-between items-center">
        <h4 className="text-sm font-medium leading-none">My Products ({products.totalItems})</h4>
        <CreateProductDialog />
      </header>
      <ScrollArea className="grow">
        <ul className="space-y-1">
          {products.items.map((product) => (
            <SingleProduct key={product.id} product={product} isActive={product.slug === selectedProduct?.slug} />
          ))}
        </ul>
        {products.items.length === 0 && (
          <div className="space-y-2">
            <p className="text-sm">You don&apos;t have a product yet.</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
