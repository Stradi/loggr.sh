import Paragraph from '@tiptap/extension-paragraph';

const DescriptionNode = Paragraph.extend({
  name: 'description',
  group: 'block',
  parseHTML() {
    return [
      {
        tag: 'p',
      },
    ];
  },
  marks: '',
  addOptions() {
    return {
      HTMLAttributes: {
        class: 'node-description text-lg italic',
      },
    };
  },
});

export default DescriptionNode;
