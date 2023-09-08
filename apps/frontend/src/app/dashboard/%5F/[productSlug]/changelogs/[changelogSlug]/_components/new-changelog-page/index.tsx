'use client';

import { useSelectedProduct } from '@/app/dashboard/%5F/_contexts/selected-product-context';
import MyEditor from '@/components/my-editor';
import { generateDocumentJSON } from '@/lib/utils/editor';
import { Changelog, Product } from '@/types/pb';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Sidebar from '../sidebar';
import CreateChangelogButton from './create-changelog-button';

export default function NewChangelogPage() {
  const selectedProduct = useSelectedProduct();
  const [changelog, setChangelog] = useState<Partial<Changelog>>({});

  const pathname = usePathname();
  const slugFromUrl = pathname.split('/').pop();
  const titleCasedSlug = slugFromUrl
    ?.split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');

  const editorValue = generateDocumentJSON(`${titleCasedSlug}`, `${titleCasedSlug} has a new changelog! 🥳🎉`, []);

  return (
    <section>
      <div className="flex justify-between items-center">
        <span className="text-sm">You are editing your newly created changelog.</span>
        <CreateChangelogButton changelog={changelog} product={selectedProduct.product as Product} />
      </div>
      <div className="grid grid-cols-3 gap-2 h-full grow">
        <main className="col-span-2 border border-neutral-100 rounded-lg p-4 pl-8">
          <MyEditor
            defaultValue={editorValue}
            onSave={({ title, description, content }) =>
              setChangelog({
                name: title,
                short_description: description,
                content,
              })
            }
          />
        </main>
        <Sidebar />
      </div>
    </section>
  );
}
