import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export type MiddlewareFunction = (
  request: NextRequest,
  response: NextResponse,
  event: NextFetchEvent
) => Promise<NextResponse | void>;
export type ChainableMiddleware<T = void> = (options: T) => MiddlewareFunction;

export async function chain(request: NextRequest, event: NextFetchEvent, middlewares: MiddlewareFunction[]) {
  const response = NextResponse.next();

  for (const middleware of middlewares) {
    const middlewareResponse = await middleware(request, response, event);

    if (middlewareResponse) {
      return middlewareResponse;
    }
  }

  return response;
}
