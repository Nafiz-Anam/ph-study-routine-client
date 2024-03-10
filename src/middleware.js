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

    if (!token) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/profile", "/routine", "/updateneeds", "/weeklyschedule"],
};
