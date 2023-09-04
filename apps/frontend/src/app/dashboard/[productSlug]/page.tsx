import { getSelectedProduct } from './selected-product-context';

export default function Page() {
  const selectedProduct = getSelectedProduct();

  return <div>Name of the product you&apos;re currently viewing is {selectedProduct.name}</div>;
}
