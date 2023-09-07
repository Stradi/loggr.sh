import { Button } from '@/components/ui/button';
import { toReadableDate } from '@/lib/utils/date';
import { Changelog } from '@/types/pb';
import { ExternalLinkIcon, FileEditIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';

type Props = { changelog: Changelog };
export default function MiniChangelog({ changelog }: Props) {
  const contentExcerpt = changelog.content.split('\r\n').slice(0, 2).join('<br />');

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
            <Button asChild variant="ghost" size="icon" title="View this changelog">
              <Link href={`/dashboard/_/${changelog.expand?.product?.slug}/changelogs/${changelog.slug}`}>
                <ExternalLinkIcon size={16} />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" title="Edit this changelog">
              <Link href={`/dashboard/_/${changelog.expand?.product?.slug}/changelogs/${changelog.slug}/edit`}>
                <FileEditIcon size={16} />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" title="Delete this changelog">
              <Link href={`/dashboard/_/${changelog.expand?.product?.slug}/changelogs/${changelog.slug}/delete`}>
                <TrashIcon size={16} />
              </Link>
            </Button>
          </div>
        </header>
        <hr />
        <main>
          <Link
            as="h2"
            href={`/dashboard/_/${changelog.expand?.product?.slug}/changelogs/${changelog.slug}/edit`}
            className="text-xl font-medium hover:underline"
          >
            {changelog.name}
          </Link>
          <p className="text-sm text-neutral-500">{changelog.short_description}</p>
          <br />
          <div className="relative">
            <div
              dangerouslySetInnerHTML={{
                __html: contentExcerpt,
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
