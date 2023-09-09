'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import usePocketBase from '@/hooks/usePocketBase';
import { Changelog } from '@/types/pb';
import { XIcon } from 'lucide-react';
import { useChangelogContext } from '../../_stores/changelog-store';

export default function FeaturedImageInput() {
  const [changelog, uploadFeaturedImage] = useChangelogContext((state) => [state.changelog, state.uploadFeaturedImage]);
  const pb = usePocketBase();

  const hasFeaturedImage = changelog?.featured_image !== undefined;
  const featuredImageURL = hasFeaturedImage
    ? pb?.files.getUrl(changelog as Changelog, changelog?.featured_image as string)
    : 'https://placehold.co/640x360?text=No+Image';

  return (
    <>
      <div>
        <Label htmlFor="featured-image">Featured Image</Label>
        <Input
          type="file"
          accept="image/png,image/jpeg"
          onChange={async (e) => {
            await uploadFeaturedImage(e.target.files?.[0] as File);
          }}
        />
      </div>
      <div className="relative">
        {hasFeaturedImage && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute inset-0 top-2 right-2"
            onClick={async () => {
              await uploadFeaturedImage('');
            }}
          >
            <XIcon size={16} />
          </Button>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="rounded-lg !col-span-3 w-full aspect-video object-contain"
          src={featuredImageURL}
          alt={`Featured image of ${changelog?.name}`}
        />
      </div>
    </>
  );
}
