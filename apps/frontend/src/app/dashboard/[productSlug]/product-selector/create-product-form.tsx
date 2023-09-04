'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import usePocketBase from '@/hooks/usePocketBase';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import slugify from 'slugify';
import z from 'zod';

const httpRegex = /^(http|https):/;
const completeUrlRegex =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

const Schema = z.object({
  name: z
    .string({
      required_error: 'Product name is required.',
    })
    .min(3, 'Product name should be at least 3 characters.')
    .max(50, 'Product name should be at most 50 characters.'),
  shortDescription: z
    .string({
      required_error: 'Short description is requeired.',
    })
    .max(255, 'Short description should be at most 255 characters.'),
  websiteUrl: z
    .string()
    .max(1000)
    .transform((value, ctx) => {
      let completeUrl = value;
      if (!httpRegex.test(completeUrl)) {
        completeUrl = `https://${completeUrl}`;
      }

      if (!completeUrlRegex.test(completeUrl)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid URL',
        });

        return z.NEVER;
      }

      return completeUrl;
    }),
});

type Props = {
  onCreate: () => void;
};
export default function CreateProductForm({ onCreate }: Props) {
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const pb = usePocketBase();

  const onSubmit: SubmitHandler<z.infer<typeof Schema>> = async (data) => {
    setIsSubmitting(true);

    const record = await pb
      ?.collection('products')
      .create({
        name: data.name,
        slug: slugify(data.name, {
          lower: true,
          strict: true,
        }),
        short_description: data.shortDescription,
        website_url: data.websiteUrl,
        admin_user: pb.authStore.model?.id,
      })
      .catch(() => {
        form.setError('root', {
          message: 'Something went wrong, please try again later.',
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });

    record && onCreate();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Night's Watch" disabled={isSubmitting} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="websiteUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL of the product</FormLabel>
              <FormControl>
                <Input type="text" placeholder="www.nightswatch.com" disabled={isSubmitting} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Night's Watch is a website monitoring service. It allows you to monitor your website's uptime and response time."
                  className="resize-none"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          Create
        </Button>
      </form>
    </Form>
  );
}
