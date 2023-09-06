export function toReadableDate(obj: string | Date) {
  let dateObj = null;

  if (typeof obj === 'string') {
    dateObj = new Date(obj);
  } else if (obj instanceof Date) {
    dateObj = obj;
  } else {
    throw new Error('`toReadableDate` only accepts `string` or `Date` as argument');
  }

  const formatter = Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return formatter.format(dateObj);
}
