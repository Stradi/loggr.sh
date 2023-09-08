'use client';

import MyEditor from '@/components/my-editor';
import { deepCompare } from '@/lib/utils';
import { generateDocumentJSON } from '@/lib/utils/editor';
import { Changelog } from '@/types/pb';
import { useState } from 'react';
import Sidebar from '../sidebar';
import CancelEditingButton from './cancel-editing-button';
import EditChangelogButton from './edit-changelog-button';
import SaveChangesButton from './save-changes-button';

type Props = {
  changelog: Changelog;
  isEditable?: boolean;
};

export default function ViewChangelogPage({ changelog, isEditable = false }: Props) {
  const [updatedChangelog, setUpdatedChangelog] = useState<Partial<Changelog>>(changelog);
  const hasChanges = !deepCompare(updatedChangelog, changelog);

  const editorValue = generateDocumentJSON(
    updatedChangelog.name as string,
    updatedChangelog.short_description as string,
    updatedChangelog.content as any[]
  );

  return (
    <section>
      <div className="flex justify-between">
        <span className="text-sm">You are {isEditable ? 'editing' : 'viewing'} your existing changelog.</span>
        {isEditable ? (
          <div className="space-x-2">
            <SaveChangesButton changelog={updatedChangelog as Changelog} isDisabled={!hasChanges} />
            <CancelEditingButton changelog={updatedChangelog as Changelog} />
          </div>
        ) : (
          <EditChangelogButton changelog={updatedChangelog as Changelog} />
        )}
      </div>
      <div className="grid grid-cols-3 gap-2 h-full grow">
        <main className="col-span-2 border border-neutral-100 rounded-lg p-4 pl-8">
          <MyEditor
            defaultValue={editorValue}
            editable={isEditable}
            onSave={(data) => {
              setUpdatedChangelog((prev) => ({
                ...prev,
                name: data.title as string,
                short_description: data.description as string,
                content: data.content as any[],
              }));
            }}
          />
        </main>
        <Sidebar />
      </div>
    </section>
  );
}
