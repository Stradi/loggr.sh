import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export type ChainableMiddleware = (request: NextRequest, response: NextResponse, event: NextFetchEvent) => Promise<void | NextResponse>;
export async function chain(request: NextRequest, event: NextFetchEvent, middlewares: ChainableMiddleware[]) {
  const response = NextResponse.next();

  for (const middleware of middlewares) {
    const middlewareResponse = await middleware(request, response, event);

    if (middlewareResponse) {
      return middlewareResponse;
    }
  }

  return response;
}
