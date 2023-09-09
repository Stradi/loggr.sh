import SidebarContent from './sidebar-content';

export default function Sidebar() {
  return (
    <aside className="border rounded-lg border-neutral-100 p-4 h-full">
      <h2 className="text-lg font-medium">Settings</h2>
      <br />
      <SidebarContent />
    </aside>
  );
}
