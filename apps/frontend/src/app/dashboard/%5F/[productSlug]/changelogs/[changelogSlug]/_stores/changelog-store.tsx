'use client';

import createClientComponentClient from '@/lib/pocket-base/create-client-component-client';
import { Changelog } from '@/types/pb';
import { PropsWithChildren, createContext, useContext, useRef } from 'react';
import { createStore, useStore } from 'zustand';

type ChangelogStore = {
  changelog: Changelog | null;
  isSaving: boolean;

  saveChangelogToDatabase: () => Promise<void>;
  setChangelog: (newChangelog: Changelog) => void;
};

const DefaultProps: ChangelogStore = {
  changelog: null,
  isSaving: false,

  saveChangelogToDatabase: async () => {},
  setChangelog: () => {},
};

function createChangelogStore(initProps?: Partial<ChangelogStore>) {
  return createStore<ChangelogStore>()((set, get) => ({
    ...DefaultProps,
    saveChangelogToDatabase: async () => {
      set({ isSaving: true });

      const changelog = get().changelog;
      if (!changelog) {
        set({ isSaving: false });
        return;
      }

      const pb = await createClientComponentClient();
      const record = await pb.collection('changelogs').update<Changelog>(changelog.id, changelog, {
        expand: 'product',
      });

      if (!record) {
        set({ isSaving: false });
        return;
      }

      set({
        changelog: record,
        isSaving: false,
      });
    },
    setChangelog: (newChangelog) => {
      set({ changelog: newChangelog });
    },
    ...initProps,
  }));
}

export const ChangelogContext = createContext<ReturnType<typeof createChangelogStore> | null>(null);

type Props = PropsWithChildren<Partial<ChangelogStore>>;
export function ChangelogProvider({ children, ...props }: Props) {
  const storeRef = useRef<ReturnType<typeof createChangelogStore>>();
  if (!storeRef.current) {
    storeRef.current = createChangelogStore(props);
  }

  return <ChangelogContext.Provider value={storeRef.current}>{children}</ChangelogContext.Provider>;
}

export function useChangelogContext<T>(selector: (state: ChangelogStore) => T): T {
  const store = useContext(ChangelogContext);
  if (!store) throw new Error('Missing ChangelogContext.Provider in the component tree.');

  return useStore(store, selector);
}
