'use client';

import { Editor, EditorContent, JSONContent, useEditor } from '@tiptap/react';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { EditorBubbleMenu } from './bubble-menu';
import { defaultExtensions } from './extensions';
import { defaultEditorProps } from './props';

type Props = {
  debounceDuration?: number;
  defaultValue?: any;
  editable?: boolean;

  onSave?: ({ title, description, content }: { title: string; description: string; content: any }) => void;
};

export default function MyEditor({
  debounceDuration = 250,
  defaultValue = {
    type: 'doc',
    content: [
      {
        type: 'title',
        content: [{ type: 'text', text: 'Title of my changelog' }],
      },
      {
        type: 'description',
        content: [{ type: 'text', text: 'Description of my changelog' }],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Some content' }],
      },
    ],
  },
  editable = true,
  onSave,
}: Props) {
  function callOnSave(editor: Editor) {
    const json = editor.getJSON();

    if ((json.content as JSONContent[]).length < 2) return;
    const [titleNode, descriptionNode, ...restNodes] = json.content as JSONContent[];

    onSave?.({
      title: titleNode?.content?.[0].text as string,
      description: descriptionNode?.content?.[0].text as string,
      content: restNodes,
    });
  }

  const [content, setContent] = useState<any>(defaultValue);

  const debouncedOnChange = useDebouncedCallback(async ({ editor }: { editor: Editor }) => {
    const json = editor.getJSON();
    setContent(json);

    callOnSave(editor);
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
    editable,
  });

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    if (editor && content && !hydrated) {
      editor.commands.setContent(content);
      setHydrated(true);

      callOnSave(editor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, content, hydrated]);

  return (
    <div>
      {editor && <EditorBubbleMenu editor={editor} />}
      {/* {editor?.isActive("image") && <ImageResizer editor={editor} />} */}
      <EditorContent editor={editor} />
    </div>
  );
}
