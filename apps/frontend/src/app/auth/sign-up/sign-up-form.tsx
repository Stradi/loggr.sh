'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import usePocketBase from '@/hooks/usePocketBase';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { ClientResponseError } from 'pocketbase';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

const Schema = z
  .object({
    email: z.string().email("That doesn't look like an email, does it?"),
    password: z
      .string()
      .min(8, 'Even I can guess that password, make it longer please')
      .max(50, "That's too long, I can't remember that"),
    passwordConfirm: z
      .string()
      .min(8, 'Even I can guess that password, make it longer please')
      .max(50, "That's too long, I can't remember that"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Your passwords don't match",
    path: ['passwordConfirm'],
  });

export default function SignUpForm() {
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
    const createAccountResponse = await pb
      ?.collection('users')
      .create({
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      })
      .catch((error) => {
        if (error instanceof ClientResponseError) {
          Object.keys(error.originalError.data.data).forEach((key) => {
            form.setError(key as any, {
              message: error.originalError.data.data[key].message,
            });
          });
        } else {
          throw error;
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });

    if (!createAccountResponse) return;

    setIsSubmitting(true);

    const signInResponse = await pb
      ?.collection('users')
      .authWithPassword(data.email, data.password)
      .catch(() => {
        form.setError('root', { message: "Something is wrong, your email or password doesn't match" });
      })
      .finally(() => {
        setIsSubmitting(false);
      });

    if (!signInResponse) return;

    signInResponse && router.push('/dashboard');
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
                <Input
                  type="email"
                  placeholder="jon@snow.com"
                  disabled={isSubmitting}
                  autoComplete="email"
                  {...field}
                />
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
                <Input
                  type="password"
                  placeholder="*********"
                  disabled={isSubmitting}
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Your Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="*********"
                  disabled={isSubmitting}
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root && <FormMessage>{form.formState.errors.root.message}</FormMessage>}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          Sign up
        </Button>
      </form>
    </Form>
  );
}
