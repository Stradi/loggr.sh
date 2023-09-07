import MyEditor from '@/components/my-editor';
import { Changelog } from '@/types/pb';
import Sidebar from '../sidebar';

type Props = {
  changelog: Changelog;
  isEditable?: boolean;
};

export default function ViewChangelogPage({ changelog, isEditable = false }: Props) {
  return (
    <section>
      <div className="flex justify-between">
        <span className="text-sm">You are {isEditable ? 'editing' : 'viewing'} your existing changelog.</span>
        {isEditable ? <span>Save changes button</span> : <span>Edit this changelog button</span>}
      </div>
      <div className="grid grid-cols-3 gap-2 h-full grow">
        <main className="col-span-2 border border-neutral-100 rounded-lg p-4 pl-8 h-full overflow-y-scroll">
          <MyEditor defaultValue={changelog.content} editable={isEditable} />
        </main>
        <Sidebar />
      </div>
    </section>
  );
}
