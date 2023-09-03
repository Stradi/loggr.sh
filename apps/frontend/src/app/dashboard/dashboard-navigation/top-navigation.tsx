import ProductSelector from './product-selector';
import UserMenu from './user-menu';

export default function TopNavigation() {
  return (
    <nav className="flex justify-between py-2 px-4 items-center">
      <div className="flex gap-2 items-center">
        <p className="tracking-tighter font-medium text-sm">Changelog</p>
        <span className="text-lg text-neutral-300 rotate-12 font-medium select-none">/</span>
        <ProductSelector />
      </div>
      <div>
        <UserMenu />
      </div>
    </nav>
  );
}
