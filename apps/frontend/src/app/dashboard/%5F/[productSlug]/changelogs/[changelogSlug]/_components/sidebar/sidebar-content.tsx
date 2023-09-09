'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Changelog } from '@/types/pb';
import { useState } from 'react';
import { useChangelogContext } from '../../_stores/changelog-store';
import FeaturedImageInput from './featured-image-input';

export default function SidebarContent() {
  const [changelog, setChangelog] = useChangelogContext((state) => [state.changelog, state.setChangelog]);

  const [slug, setSlug] = useState(changelog?.slug || '');

  function onSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    const slugifiedValue = e.target.value
      .replace(/[^-a-zA-Z0-9\s+]+/gi, '')
      .replace(/\s+/gi, '-')
      .toLowerCase();

    setSlug(slugifiedValue);
    setChangelog({ ...changelog, slug: slugifiedValue } as Changelog);
  }

  return (
    <div className="space-y-2 [&>*]:items-center [&>*]:grid [&>*]:grid-cols-3 [&>div>*:last-child]:col-span-2">
      <div>
        <Label htmlFor="is-published">Is Published</Label>
        <Switch
          id="is-published"
          defaultChecked={changelog?.is_published}
          onCheckedChange={(checked) => setChangelog({ ...changelog, is_published: checked } as Changelog)}
        />
      </div>
      <div>
        <Label htmlFor="slug">Custom Slug</Label>
        <Input id="slug" defaultValue={slug} value={slug} onChange={onSlugChange} />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select
          defaultValue={changelog?.tags || 'UNCATEGORIZED'}
          onValueChange={(value) => setChangelog({ ...changelog, tags: value } as Changelog)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Default Categories</SelectLabel>
              <SelectItem value="UNCATEGORIZED">Uncategorized</SelectItem>
              <SelectItem value="FIX">Fix</SelectItem>
              <SelectItem value="ANNOUNCEMENT">Announcement</SelectItem>
              <SelectItem value="COMING_SOON">Coming soon</SelectItem>
              <SelectItem value="IMPROVEMENT">Improvement</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <FeaturedImageInput />
    </div>
  );
}
