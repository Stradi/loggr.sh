'use client';

import { Product } from '@/types/pb';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

type SelectedProductContextType = {
  product: Product | null;
  setProduct: (product: Product) => void;
};

const SelectedProductContext = createContext<SelectedProductContextType>({
  product: null,
  setProduct: () => {},
});

type Props = PropsWithChildren & {
  defaultValues?: Partial<SelectedProductContextType>;
};

function SelectedProductProvider({ children, defaultValues }: Props) {
  const [product, setProduct] = useState<Product | null>(null);

  return (
    <SelectedProductContext.Provider
      value={{
        product,
        setProduct,
        ...defaultValues,
      }}
    >
      {children}
    </SelectedProductContext.Provider>
  );
}

function useSelectedProduct() {
  const selectedProductContext = useContext(SelectedProductContext);
  return selectedProductContext;
}

export { SelectedProductProvider, useSelectedProduct };
