import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

export default async function createMiddlewareComponentClient(request: NextRequest, response: NextResponse) {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

  const cookieStr = request.headers.get('Cookie') ?? '';
  pb.authStore.loadFromCookie(cookieStr);

  try {
    pb.authStore.isValid && (await pb.collection('users').authRefresh());
  } catch (e) {
    pb.authStore.clear();
  }

  response.headers.append('Set-Cookie', pb.authStore.exportToCookie({ httpOnly: false }));

  return pb;
}
