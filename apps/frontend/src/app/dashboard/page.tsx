import createServerComponentClient from '@/lib/pocket-base/create-server-component-client';
import { redirect } from 'next/navigation';
import ProductSelector from './_components/product-selector';

export default async function Dashboard() {
  const pb = await createServerComponentClient();
  if (!pb.authStore.isValid) {
    return redirect('/auth/sign-in');
  }

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
