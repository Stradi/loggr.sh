import { Button } from '@/components/ui/button';
import createServerComponentClient from '@/lib/pocket-base/create-server-component-client';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import SignInForm from './sign-in-form';

export default async function Page() {
  const pb = await createServerComponentClient();
  if (pb.authStore.isValid) {
    return redirect('/dashboard');
  }

  return (
    <section className="container mx-auto max-w-sm h-screen flex flex-col gap-8 justify-center items-center">
      <h1 className="text-4xl font-bold">Sign In</h1>
      <SignInForm />
      <p className="text-sm">
        Don&apos;t have an account?{' '}
        <Button asChild variant="link">
          <Link href="/auth/sign-up">Create one</Link>
        </Button>
      </p>
    </section>
  );
}
