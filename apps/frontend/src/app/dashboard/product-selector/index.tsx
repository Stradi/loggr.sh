import createServerComponentClient from '@/lib/pocket-base/create-server-component-client';
import CreateProductDialog from './create-product-dialog';
import SingleProduct from './single-product';

async function getAvailableProducts() {
  const pb = await createServerComponentClient();

  const records = await pb
    .collection('products')
    .getFullList()
    .catch(() => []);

  if (!records) return [];

  return records;
}

export default async function ProductSelector() {
  const availableProducts = await getAvailableProducts();

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      {availableProducts.map((product) => (
        <SingleProduct key={product.id} product={product} />
      ))}
      <CreateProductDialog />
    </div>
  );
}
