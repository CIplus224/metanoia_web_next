import { AuthInitializer } from "@/components/providers/AuthInitializer";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import { LocaleProvider } from "@/context/i18n-context";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { cookies, headers } from "next/headers";
import { Toaster } from "sonner";
import "./globals.css";

// Configure Nunito font
const nunito = Nunito({
    subsets: ["latin", "latin-ext"], // Add extended Latin for international
    weight: ["300", "400", "500", "600", "700"], // Only weights you actually use
    style: ["normal", "italic"],
    display: "swap",
    variable: "--font-nunito",
    preload: true, // Preload for better performance
    fallback: ["system-ui", "-apple-system", "sans-serif"], // Better fallbacks
});

export const metadata: Metadata = {
    title: "Classroom Management System",
    description: "Système de gestion de classes pour établissements scolaires",
    manifest: "/manifest.json",
    themeColor: "#10b981",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "CiPlus",
    },
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
        userScalable: false,
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/images/logo_transparent_bg.png",
    },
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Fonction pour déterminer la locale initiale (côté serveur)
    async function getInitialLocale() {
        const cookieStore = await cookies();
        const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;

        // Si un cookie existe, l'utiliser
        if (localeCookie && ["fr", "en"].includes(localeCookie)) {
            return localeCookie;
        }

        // Sinon, essayer d'utiliser l'en-tête Accept-Language
        const headersList = await headers();
        const acceptLanguage = headersList.get("accept-language") || "";

        // Recherche très basique de la langue préférée
        if (acceptLanguage.startsWith("fr")) {
            return "fr";
        }

        // Par défaut, utiliser 'fr'
        return "fr";
    }

    // Déterminer la locale initiale
    const locale = await getInitialLocale();

    // Charger les messages correspondants
    const messages = (await import(`../messages/${locale}.json`)).default;

    return (
        <html lang="fr">
            <body className={nunito.className}>
                <LocaleProvider
                    initialLocale={locale}
                    initialMessages={messages}
                >
                    <ReactQueryProvider>
                        <AuthInitializer>{children}</AuthInitializer>
                    </ReactQueryProvider>
                </LocaleProvider>
                <Toaster
                    richColors
                    expand={false}
                    position="top-right"
                    closeButton
                    duration={3500}
                />
            </body>
        </html>
    );
}
