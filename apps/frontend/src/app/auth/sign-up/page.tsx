import { Button } from '@/components/ui/button';
import createServerComponentClient from '@/lib/pocket-base/client-server-component-client';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import SignUpForm from './sign-up-form';

export default async function Page() {
  const pb = await createServerComponentClient();
  if (pb.authStore.isValid) {
    return redirect('/dashboard');
  }

  return (
    <section className="container mx-auto max-w-sm h-screen flex flex-col gap-8 justify-center items-center">
      <h1 className="text-4xl font-bold">Sign Up</h1>
      <SignUpForm />
      <p className="text-sm">
        Already have an account?{' '}
        <Button asChild variant="link">
          <Link href="/auth/sign-in">Sign in</Link>
        </Button>
      </p>
    </section>
  );
}
