import { cookies } from "next/headers"
import PocketBase from "pocketbase";

export default async function createServerComponentClient() {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

  const cookieStr = cookies().toString() ?? "";
  pb.authStore.loadFromCookie(cookieStr);

  try {
    pb.authStore.isValid && await pb.collection("users").authRefresh();
  } catch (e) {
    pb.authStore.clear();
  }

  return pb;
}
