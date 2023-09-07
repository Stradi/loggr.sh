import { Button } from '@/components/ui/button';
import { toReadableDate } from '@/lib/utils/date';
import { Changelog } from '@/types/pb';
import { ExternalLinkIcon, FileEditIcon } from 'lucide-react';
import Link from 'next/link';
import DeleteAlertDialog from './delete-alert-dialog';

type Props = { changelog: Changelog };
export default function MiniChangelog({ changelog }: Props) {
  return (
    <Button asChild variant="outline" className="group p-4 block h-auto hover:bg-white">
      <article className="space-y-4">
        <header className="flex justify-between items-center">
          <div className="space-x-2">
            {changelog.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 rounded-full bg-neutral-200 text-xs uppercase font-medium">
                {tag}
              </span>
            ))}
            <span className="text-sm text-neutral-500">{toReadableDate(changelog.created)}</span>
          </div>
          {/* TODO: Some of these buttons are not links. For example delete button should open a alert dialog. */}
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
        <main>
          <h2>
            <Link
              href={`/dashboard/_/${changelog.expand?.product?.slug}/changelogs/${changelog.slug}`}
              className="text-xl font-medium hover:underline"
            >
              {changelog.name}
            </Link>
          </h2>
          <p className="text-sm text-neutral-500">{changelog.short_description}</p>
          <br />
          <div className="relative">
            <div
              dangerouslySetInnerHTML={{
                // TODO: Actually render the changelog content here.
                __html: JSON.stringify(changelog.content),
              }}
            />
            <div className="pointer-events-none absolute w-full h-full bottom-0 bg-gradient-to-t from-white to-transparent" />
          </div>
        </main>
        <hr />
        <footer>TODO: Stats (total views, comments, reactions etc.)</footer>
      </article>
    </Button>
  );
}
