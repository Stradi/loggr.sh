import Document from '@tiptap/extension-document';

const CustomDocument = Document.extend({
  content: 'heading block*',
});

export default CustomDocument;
