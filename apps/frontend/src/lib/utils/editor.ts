export function generateDocumentJSON(title: string, description: string, content: any[]) {
  return {
    type: 'doc',
    content: [
      {
        type: 'title',
        content: [{ type: 'text', text: title }],
      },
      {
        type: 'description',
        content: [{ type: 'text', text: description }],
      },
      ...content,
    ],
  };
}
