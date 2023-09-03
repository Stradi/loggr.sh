import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import type { ChainableMiddleware } from "./utils";
import createMiddlewareComponentClient from "../pocket-base/create-middleware-client";

const pocketBaseMiddleware: ChainableMiddleware = async (request: NextRequest, response: NextResponse, event: NextFetchEvent) => {
  await createMiddlewareComponentClient(request, response);
}

export default pocketBaseMiddleware;
