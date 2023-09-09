'use client';

import createClientComponentClient from '@/lib/pocket-base/create-client-component-client';
import { deepCompare } from '@/lib/utils';
import { Changelog } from '@/types/pb';
import { PropsWithChildren, createContext, useContext, useRef } from 'react';
import { createStore, useStore } from 'zustand';

type ChangelogStore = {
  changelog: Changelog | null;
  updatedChangelog: Changelog | null;

  isSaving: boolean;

  saveChangelogToDatabase: () => Promise<Changelog | void>;
  uploadFeaturedImage: (file: File | '') => Promise<Changelog | void>;
  setChangelog: (newChangelog: Changelog) => void;
  forceSetChangelog: (newChangelog: Changelog) => void;
};

const DefaultProps: ChangelogStore = {
  changelog: null,
  updatedChangelog: null,

  isSaving: false,

  saveChangelogToDatabase: async () => {},
  uploadFeaturedImage: async () => {},
  setChangelog: () => {},
  forceSetChangelog: () => {},
};

function createChangelogStore(initProps?: Partial<ChangelogStore>) {
  return createStore<ChangelogStore>()((set, get) => ({
    ...DefaultProps,
    saveChangelogToDatabase: async () => {
      const _originalChangelog = get().changelog;
      const _updatedChangelog = get().updatedChangelog;
      if (!_originalChangelog || !_updatedChangelog) return;

      const { featured_image: _fi1, ...originalChangelog } = _originalChangelog as Changelog;
      const { featured_image: _fi2, ...updatedChangelog } = _updatedChangelog as Changelog;

      const hasDiff = !deepCompare(originalChangelog, updatedChangelog);
      if (!hasDiff) return;

      set({ isSaving: true });
      const pb = await createClientComponentClient();
      const record = await pb.collection('changelogs').update<Changelog>(originalChangelog.id, updatedChangelog, {
        expand: 'product',
      });

      if (!record) {
        set({ isSaving: false });
        return;
      }

      set({
        changelog: record,
        updatedChangelog: record,
        isSaving: false,
      });

      return record;
    },
    uploadFeaturedImage: async (file) => {
      const changelog = get().changelog;
      if (!changelog) return;

      set({ isSaving: true });
      const formData = new FormData();
      formData.append('featured_image', file);

      const pb = await createClientComponentClient();
      const record = await pb.collection('changelogs').update<Changelog>(changelog.id, formData, {
        expand: 'product',
      });

      if (!record) {
        set({ isSaving: false });
        return;
      }

      set({
        changelog: {
          ...record,
          featured_image: file === '' ? undefined : record.featured_image,
        },
        updatedChangelog: {
          ...record,
          featured_image: file === '' ? undefined : record.featured_image,
        },
        isSaving: false,
      });

      return record;
    },
    setChangelog: (newChangelog) => {
      set({ updatedChangelog: newChangelog });
    },
    forceSetChangelog: (newChangelog) => {
      set({ changelog: newChangelog, updatedChangelog: newChangelog });
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
