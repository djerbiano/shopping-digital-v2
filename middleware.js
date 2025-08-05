import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("access_token")?.value;

  const redirectUrl = new URL("/", request.url);
  redirectUrl.searchParams.set("expired", "true");

  if (!token) {
    const response = NextResponse.redirect(redirectUrl, 302);
    response.headers.set("Cache-Control", "no-store");
    return response;
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_KEY));

    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith("/admin") && payload.isAdmin !== true) {
      const res = NextResponse.redirect(new URL("/", request.url), 302);
      res.headers.set("Cache-Control", "no-store");
      return res;
    }
    return NextResponse.next();
  } catch (error) {
    console.error("JWT expired or invalid:", error);
    const response = NextResponse.redirect(redirectUrl, 302);
    response.headers.set("Cache-Control", "no-store");
    return response;
  }
}
export const config = {
  matcher: ["/mon-compte/:path*", "/admin/:path*"],
};
