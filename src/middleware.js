import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decode_token, token_blocked } from "./actions/token";

const public_routes = [
    "/",
    "/error",
    "/sign-out",
    "/property"
]

export async function middleware(req) {
    const pathname = req.nextUrl.pathname;
    const accessToken = cookies().get("access-user")?.value;

    // Nếu đang ở đường dẫn private
    if (!public_routes.some(route => pathname.startsWith(route)) && pathname !== "/sign-out") {
        if (!accessToken) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        // Trong trường hợp token trong black list
        const tokenBlocked = await token_blocked(accessToken);

        if (tokenBlocked?.blocked) {
            const response = NextResponse.redirect(new URL("/", req.url));
            response.cookies.delete("access-user");
            response.cookies.delete("refresh-user");
            return response;
        } else if (!tokenBlocked?.success) return NextResponse.redirect(new URL("/error", req.url));

        const decode = await decode_token(accessToken);
        // Trong trường hợp token bị sửa đổi (Không đúng định dạng hoặc token không đúng mã bí mật)
        if (!decode?.success && decode?.error && !decode?.error?.expiredAt) {
            const response = NextResponse.redirect(new URL("/sign-out", req.url));
            response.cookies.delete("access-user");
            response.cookies.delete("refresh-user");
            return response;
        }
    }

    // Nếu đang ở đường dẫn đăng xuất
    if (pathname === "/sign-out") {
        if (!accessToken) return NextResponse.redirect(new URL("/", req.url));
    }

    const response = NextResponse.next();
    response.cookies.delete("next-auth.callback-url");
    response.cookies.delete("next-auth.csrf-token");
    response.cookies.delete("next-auth.session-token");
    response.cookies.delete("next-auth.state");
    response.cookies.delete("next-auth.pkce.code_verifier");
    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|logo.png|favicon.ico).*)',
    ]
}