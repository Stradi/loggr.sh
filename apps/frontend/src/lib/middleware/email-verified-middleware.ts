import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import createMiddlewareComponentClient from '../pocket-base/create-middleware-client';
import type { ChainableMiddleware } from './utils';

// TODO: We should check if the user is already verified and tries to visit the verification page.
const emailVerifiedMiddleware: ChainableMiddleware<{
  whenVisited: string[];
  redirectUrl: string;
}> = (options) => {
  return async (request: NextRequest, response: NextResponse, event: NextFetchEvent) => {
    const shouldRedirect = options.whenVisited.some((path) => {
      // TODO: We should probably not use `.startsWith` here, but instead use a regex.
      return request.nextUrl.pathname.startsWith(path);
    });

    // User is not visiting any of the paths we care about.
    if (!shouldRedirect) return;

    const pb = await createMiddlewareComponentClient(request, response);

    // User is not logged in.
    if (!pb.authStore.isValid) return;

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = options.redirectUrl;

    // User is already on the redirect URL.
    if (redirectUrl.href === request.nextUrl.toString()) return;

    // User is verified.
    if (pb.authStore.model?.verified) return;

    return NextResponse.redirect(redirectUrl, {
      ...response,
    });
  };
};

export default emailVerifiedMiddleware;
