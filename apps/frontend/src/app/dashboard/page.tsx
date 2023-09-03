import createServerComponentClient from '@/lib/pocket-base/client-server-component-client';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const pb = await createServerComponentClient();
  if (!pb.authStore.isValid) {
    return redirect('/auth/sign-in');
  }

  return (
    <>
      <p>Welcome to the dashboard!</p>
    </>
  );
}
