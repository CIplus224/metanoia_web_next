// src/middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get auth cookies
    const isAuthenticated =
        request.cookies.get("isAuthenticated")?.value === "true";
    const user = request.cookies.get("user")?.value;

    // Public routes that don't require authentication
    const publicRoutes = ["/", "/login", "/register", "/forgot-password"];
    const isPublicRoute = publicRoutes.includes(pathname);

    // Allow access to static assets (images, icons, etc.)
    if (
        pathname.startsWith("/_next/") ||
        pathname.startsWith("/images/") ||
        pathname.startsWith("/icons/") ||
        (pathname.includes(".") && !pathname.startsWith("/api/"))
    ) {
        return NextResponse.next();
    }

    // API routes
    if (pathname.startsWith("/api/")) {
        // Add CORS headers for API routes
        const response = NextResponse.next();
        response.headers.set(
            "Access-Control-Allow-Origin",
            process.env.FRONTEND_URL || "http://localhost:3000"
        );
        response.headers.set(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, OPTIONS"
        );
        response.headers.set(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization"
        );
        return response;
    }

    // Redirect authenticated users away from auth pages
    if (isAuthenticated && (pathname === "/login" || pathname === "/")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Redirect unauthenticated users to login
    if (!isAuthenticated && !isPublicRoute) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Role-based access control
    if (isAuthenticated && user) {
        try {
            const userData = JSON.parse(user);
            const userRole = userData.role;

            // Principal-only routes
            const principalRoutes = [
                "/dashboard/school-management",
                "/dashboard/teacher-management",
            ];
            if (
                principalRoutes.some(route => pathname.startsWith(route)) &&
                userRole !== "principal"
            ) {
                return NextResponse.redirect(
                    new URL("/dashboard?error=access-denied", request.url)
                );
            }

            // Inspector-only routes
            const inspectorRoutes = [
                "/dashboard/inspection",
                "/dashboard/multi-school",
            ];
            if (
                inspectorRoutes.some(route => pathname.startsWith(route)) &&
                userRole !== "inspector"
            ) {
                return NextResponse.redirect(
                    new URL("/dashboard?error=access-denied", request.url)
                );
            }
        } catch (error) {
            console.error("Error parsing user data:", error);
            // Clear invalid cookies
            const response = NextResponse.redirect(
                new URL("/login", request.url)
            );
            response.cookies.delete("user");
            response.cookies.delete("isAuthenticated");
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        "/((?!_next/static|_next/image|favicon.ico|public).*)",
    ],
};
