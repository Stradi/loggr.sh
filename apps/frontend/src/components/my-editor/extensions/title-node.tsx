import Heading from '@tiptap/extension-heading';

const TitleNode = Heading.extend({
  name: 'title',
  group: 'title',
  parseHTML() {
    return [
      {
        tag: 'h1:first-child',
      },
    ];
  },
  marks: '',
}).configure({
  levels: [1],
});

export default TitleNode;
