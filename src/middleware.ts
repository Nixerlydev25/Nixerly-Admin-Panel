import { NextRequest, NextResponse } from "next/server";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

export async function middleware(request: NextRequest) {
  try {
    const accessToken = request.cookies.get("access_token")?.value;
    const refreshToken = request.cookies.get("refresh_token")?.value;

    console.log({ accessToken, refreshToken });

    if (!accessToken || !refreshToken) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/user/current-user`, {
      headers: {
        Cookie: `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`,
      },
      credentials: "include",
    });
    
    if( !apiResponse.ok) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    
    const data = await apiResponse.json();
    
    if(data.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error(
      "Middleware error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: "/dashboard/:path*",
};
