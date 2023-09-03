import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import createMiddlewareComponentClient from '../pocket-base/create-middleware-client';
import type { ChainableMiddleware } from './utils';

const pocketBaseMiddleware: ChainableMiddleware = async (
  request: NextRequest,
  response: NextResponse,
  event: NextFetchEvent
) => {
  await createMiddlewareComponentClient(request, response);
};

export default pocketBaseMiddleware;
