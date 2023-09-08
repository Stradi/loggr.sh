import createClientComponentClient from '@/lib/pocket-base/create-client-component-client';
import { deepCompare } from '@/lib/utils';
import { Changelog } from '@/types/pb';
import { create } from 'zustand';

type ChangelogStore = {
  changelog: Changelog | null;
  isSaving: boolean;

  saveChangelog: (newChangelog: Changelog) => Promise<void>;
};

const useChangelogStore = create<ChangelogStore>((set, get) => ({
  changelog: null,
  isSaving: false,

  saveChangelog: async (newChangelog) => {
    set({ isSaving: true });

    const oldChangelog = get().changelog;
    if (!oldChangelog) {
      set({ isSaving: false });
      return;
    }

    const hasDifference = !deepCompare(oldChangelog, newChangelog);
    if (!hasDifference) {
      set({ isSaving: false });
      return;
    }

    const pb = await createClientComponentClient();
    const record = await pb.collection('changelogs').update<Changelog>(oldChangelog.id, newChangelog, {
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
}));

export default useChangelogStore;
