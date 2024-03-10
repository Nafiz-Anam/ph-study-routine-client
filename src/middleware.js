import { NextResponse } from "next/server";

const parseCookies = (request) => {
    const cookies = {};
    const cookieHeader = request.headers.get("cookie");
    if (cookieHeader) {
        cookieHeader.split(";").forEach((cookie) => {
            const [name, ...rest] = cookie.split("=");
            cookies[name.trim()] = rest.join("=").trim();
        });
    }
    return cookies;
};

export function middleware(request) {
    const cookies = parseCookies(request);
    const token = cookies.token;
    const { pathname } = request.nextUrl;

    // Pages that should be accessible only when NOT logged in
    const publicOnlyPages = ["/signup", "/signin"];

    // If the user tries to access a public only page while logged in, redirect them to their profile page
    if (token && publicOnlyPages.includes(pathname)) {
        return NextResponse.redirect(new URL("/profile", request.url));
    }

    // If the user tries to access protected pages without being logged in, redirect them to signin page
    if (!token && !publicOnlyPages.includes(pathname)) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/profile",
        "/routine",
        "/updateneeds",
        "/weeklyschedule",
        "/signup",
        "/signin",
    ],
};
