import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_KEY));

    return NextResponse.next();
  } catch (error) {
    console.error("catch JWT verification failed:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}
export const config = {
  matcher: ["/mon-compte/:path*", "/admin/:path*"],
};
