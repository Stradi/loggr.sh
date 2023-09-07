import createServerComponentClient from '@/lib/pocket-base/create-server-component-client';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren;
export default async function Layout({ children }: Props) {
  const pb = await createServerComponentClient();
  if (!pb.authStore.isValid) {
    return redirect('/auth/sign-in');
  }

  return <>{children}</>;
}
