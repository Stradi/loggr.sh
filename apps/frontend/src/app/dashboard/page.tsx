import ProductSelector from './_components/product-selector';

export default async function Dashboard() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <div>
        <h2 className="text-2xl text-center font-medium">Select a product to continue</h2>
        <h3 className="text-lg text-center">or create new one</h3>
      </div>
      <ProductSelector />
    </div>
  );
}
