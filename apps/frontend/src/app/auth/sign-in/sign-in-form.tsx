'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import usePocketBase from '@/hooks/usePocketBase';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

const Schema = z.object({
  email: z.string().email("That doesn't look like an email, does it?"),
  password: z
    .string()
    .min(8, 'Even I can guess that password, make it longer please')
    .max(50, "That's too long, I can't remember that"),
});

export default function SignInForm() {
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
  });

  form.watch(() => {
    form.setError('root', {
      message: '',
    });
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const pb = usePocketBase();
  const router = useRouter();

  const onSubmit: SubmitHandler<z.infer<typeof Schema>> = async (data) => {
    setIsSubmitting(true);
    const response = await pb
      ?.collection('users')
      .authWithPassword(data.email, data.password)
      .catch(() => {
        form.setError('root', { message: "Something is wrong, your email or password doesn't match" });
      })
      .finally(() => {
        setIsSubmitting(false);
      });

    response && router.push('/dashboard');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="jon@snow.com" disabled={isSubmitting} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="*********" disabled={isSubmitting} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root && <FormMessage>{form.formState.errors.root.message}</FormMessage>}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          Sign in
        </Button>
      </form>
    </Form>
  );
}
