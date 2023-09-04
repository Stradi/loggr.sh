import getServerContext from '@/lib/utils/create-server-context';

export const [getSelectedProduct, setSelectedProduct] = getServerContext<any>(null);
