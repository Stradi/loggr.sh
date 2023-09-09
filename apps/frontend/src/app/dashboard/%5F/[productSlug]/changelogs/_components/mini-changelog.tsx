import { Button } from '@/components/ui/button';
import createServerComponentClient from '@/lib/pocket-base/create-server-component-client';
import { toReadableDate } from '@/lib/utils/date';
import { Changelog } from '@/types/pb';
import { ExternalLinkIcon, FileEditIcon } from 'lucide-react';
import Link from 'next/link';
import DeleteAlertDialog from './delete-alert-dialog';

type Props = { changelog: Changelog };
export default async function MiniChangelog({ changelog }: Props) {
  const pb = await createServerComponentClient();

  return (
    <Button asChild variant="outline" className="group p-4 block h-auto hover:bg-neutral-50">
      <article className="space-y-4">
        <header className="flex justify-between items-center">
          <div className="space-x-2">
            <span className="px-2 py-1 rounded-full bg-neutral-200 text-xs uppercase font-medium">
              {changelog.is_published ? 'Published' : 'Draft'}
            </span>
            <span className="px-2 py-1 rounded-full bg-neutral-200 text-xs uppercase font-medium">
              {changelog.tags}
            </span>
            <span className="text-sm text-neutral-500">{toReadableDate(changelog.created)}</span>
          </div>
          <div>
            {/* TODO: This link should redirect to external URL of changelog (subdomain.myapp.com/changelogs/{changelog.slug}) */}
            <Button asChild variant="ghost" size="icon" title="View this changelog">
              <Link href={`/dashboard/_/${changelog.expand?.product?.slug}/changelogs/${changelog.slug}`}>
                <ExternalLinkIcon size={16} />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" title="Edit this changelog">
              <Link href={`/dashboard/_/${changelog.expand?.product?.slug}/changelogs/${changelog.slug}?edit=1`}>
                <FileEditIcon size={16} />
              </Link>
            </Button>
            <DeleteAlertDialog changelog={changelog} />
          </div>
        </header>
        <hr />
        <main className="space-y-2">
          {changelog.featured_image !== '' && changelog.featured_image !== undefined && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="aspect-video object-contain rounded-lg"
              src={pb.files.getUrl(changelog, changelog.featured_image as string)}
              alt={changelog.name}
            />
          )}
          <h2 className="text-xl font-medium">{changelog.name}</h2>
          <p className="text-sm text-neutral-500">{changelog.short_description}</p>
        </main>
        <hr />
        <footer>TODO: Stats (total views, comments, reactions etc.)</footer>
      </article>
    </Button>
  );
}
