'use client';

import { Editor, EditorContent, useEditor } from '@tiptap/react';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { EditorBubbleMenu } from './bubble-menu';
import { defaultExtensions } from './extensions';
import { defaultEditorProps } from './props';

type Props = {
  debounceDuration?: number;
};

export default function MyEditor({ debounceDuration = 1000 }: Props) {
  const [content, setContent] = useState<any>({
    type: 'doc',
    content: [
      {
        type: 'title',
        content: [{ type: 'text', text: 'Title of my changelog' }],
      },
    ],
  });

  const debouncedOnChange = useDebouncedCallback(async ({ editor }: { editor: Editor }) => {
    const json = editor.getJSON();
    setContent(json);
  }, debounceDuration);

  const editor = useEditor({
    extensions: [...defaultExtensions],
    editorProps: {
      ...defaultEditorProps,
    },
    onUpdate: (e) => {
      debouncedOnChange(e as any);
    },
    autofocus: 'end',
  });

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    if (editor && content && !hydrated) {
      editor.commands.setContent(content);
      setHydrated(true);
    }
  }, [editor, content, hydrated]);

  return (
    <div>
      {editor && <EditorBubbleMenu editor={editor} />}
      {/* {editor?.isActive("image") && <ImageResizer editor={editor} />} */}
      <EditorContent editor={editor} />
    </div>
  );
}