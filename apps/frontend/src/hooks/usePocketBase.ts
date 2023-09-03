import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

import createClientComponentClient from '@/lib/pocket-base/create-client-component-client';

export default function usePocketBase() {
  const [pb, setPb] = useState<PocketBase | null>(null);

  useEffect(() => {
    createClientComponentClient().then((client) => {
      setPb(client);
    });
  }, []);

  return pb;
}
