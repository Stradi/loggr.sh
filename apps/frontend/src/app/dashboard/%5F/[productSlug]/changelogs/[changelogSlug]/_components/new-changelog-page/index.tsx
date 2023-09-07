import MyEditor from '@/components/my-editor';
import Sidebar from '../sidebar';

export default function NewChangelogPage() {
  return (
    <section>
      <div className="flex justify-between">
        <span className="text-sm">You are editing your newly created changelog.</span>
        <span>Save changes button</span>
      </div>
      <div className="grid grid-cols-3 gap-2 h-full grow">
        <main className="col-span-2 border border-neutral-100 rounded-lg p-4 pl-8 h-full overflow-y-scroll">
          <MyEditor />
        </main>
        <Sidebar />
      </div>
    </section>
  );
}
