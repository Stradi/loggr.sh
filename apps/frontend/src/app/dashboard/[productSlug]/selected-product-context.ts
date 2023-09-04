import getServerContext from '@/lib/utils/create-server-context';
import { Product } from '@/types/pb';

export const [getSelectedProduct, setSelectedProduct] = getServerContext<Product | null>(null);
