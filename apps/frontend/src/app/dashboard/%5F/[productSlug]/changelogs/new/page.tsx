import MyEditor from '@/components/my-editor';
import Sidebar from './_components/sidebar/index';

export default function Page() {
  return (
    <section className="grid grid-cols-3 gap-2 h-[calc(100vh-117px)]">
      <main className="col-span-2 border border-neutral-100 rounded-lg p-4 pl-8 h-full overflow-y-scroll">
        <MyEditor />
      </main>
      <Sidebar />
    </section>
  );
}
