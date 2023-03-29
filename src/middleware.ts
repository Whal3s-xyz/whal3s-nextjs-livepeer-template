// /middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";
import {sessionOptions} from "@/lib/session";

export const middleware = async (req: NextRequest) => {
    const res = NextResponse.next();
    const session = await getIronSession(req, res, sessionOptions);
    const { user } = session;
    if (req.nextUrl.pathname.startsWith('/gated') && !user?.isLoggedIn) {
        return NextResponse.redirect(new URL('/unauthorized', req.url)) // redirect to /unauthorized page
    }

    return res;
};
