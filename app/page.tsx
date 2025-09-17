"use client";

import { useAuthStore } from "@/stores/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuthStore();

    useEffect(() => {
        if (!isLoading) {
            if (isAuthenticated) {
                router.push("/dashboard");
            } else {
                router.push("/login");
            }
        }
    }, [isAuthenticated, isLoading, router]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-green-500"></div>
        </div>
    );
}
