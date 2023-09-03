import PocketBase from 'pocketbase';

export default async function createClientComponentClient() {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
  pb.authStore.onChange(() => {
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
  });

  const cookieStr = document.cookie ?? '';
  pb.authStore.loadFromCookie(cookieStr);

  try {
    pb.authStore.isValid && (await pb.collection('users').authRefresh());
  } catch (e) {
    pb.authStore.clear();
  }

  return pb;
}
