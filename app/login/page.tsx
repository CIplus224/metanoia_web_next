"use client";

import { Button, Input, Label } from "@/components/ui";
import { getRoleLabel } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth";
import { UserRole } from "@/types";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
    const router = useRouter();
    const { selectedRole, setSelectedRole, login, isLoading } = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const roles: UserRole[] = ["teacher", "principal", "inspector"];

    const handleRoleSelect = (role: UserRole) => {
        setSelectedRole(role);
        // Pre-fill email based on role for demo
        const emails = {
            teacher: "paul.ouattara@education.ci",
            principal: "principal@sch-nqjbrbrbrq.ci",
            inspector: "yao.bamba@outlook.com",
        };
        setEmail(emails[role]);
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!selectedRole) {
            setError("Veuillez sélectionner un rôle");
            return;
        }

        try {
            await login(email, password);
            toast.success("Connexion réussie !");
            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 3000);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Une erreur est survenue"
            );
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left side - Logo section */}
            <div className="relative hidden lg:flex lg:w-1/2">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-gray-50 to-orange-300" />
                <div className="relative z-10 flex w-full items-center justify-center p-12">
                    <div className="text-center">
                        <div className="flex items-center justify-center">
                            <Image
                                src="/images/logo_transparent_bg.png"
                                alt="Metanoia"
                                width={200}
                                height={200}
                                className="h-90 w-90 object-contain"
                            />
                        </div>
                        <h2 className="mt-6 text-2xl font-bold text-gray-800">
                            Système de Gestion de Classe
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Solution complète pour l'éducation moderne
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side - Login form */}
            <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo */}
                    <div className="text-center">
                        <div className="mb-2 flex items-center justify-center">
                            <Image
                                src="/images/logo_transparent_bg.png"
                                alt="Metanoia"
                                width={80}
                                height={80}
                                className="h-20 w-20"
                            />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Bienvenue
                        </h1>
                        <p className="mt-2 text-gray-600">
                            {selectedRole
                                ? "Connectez-vous maintenant."
                                : "Veuillez entrer vos informations pour vous connecter à votre interface."}
                        </p>
                    </div>

                    {/* Role Selection */}
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:space-x-2">
                            {roles.map(role => (
                                <button
                                    key={role}
                                    onClick={() => handleRoleSelect(role)}
                                    className={`flex-1 touch-manipulation rounded-lg px-4 py-3 text-sm font-medium transition-colors sm:py-2 ${
                                        selectedRole === role
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    {getRoleLabel(role)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <div className="relative mt-1">
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="Email"
                                        className="pl-10"
                                        required
                                    />
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg
                                            className="h-5 w-5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="password">Mot de passe</Label>
                                <div className="relative mt-1">
                                    <Input
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={password}
                                        onChange={e =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Mot de passe"
                                        className="pr-10 pl-10"
                                        required
                                    />
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg
                                            className="h-5 w-5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <Link
                                href="/forgot-password"
                                className="text-sm text-green-600 hover:text-green-500"
                            >
                                Mot de passe oublié?
                            </Link>
                        </div>

                        {error && (
                            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-green-500 text-white hover:bg-green-600"
                            disabled={isLoading || !selectedRole}
                        >
                            {isLoading ? "Connexion..." : "Se connecter"}
                        </Button>
                    </form>

                    <div className="text-center">
                        <span className="text-gray-600">Pas de compte? </span>
                        <Link
                            href="/register"
                            className="font-medium text-green-600 hover:text-green-500"
                        >
                            Créer un compte
                        </Link>
                    </div>

                    {/* Demo credentials */}
                    <div className="mt-8 rounded-lg bg-blue-50 p-4">
                        <p className="mb-2 text-sm font-medium text-blue-700">
                            Identifiants de démonstration:
                        </p>
                        <p className="text-xs text-blue-600">
                            Mot de passe:{" "}
                            <code className="rounded bg-blue-100 px-1">
                                password123
                            </code>
                        </p>
                        <p className="mt-1 text-xs text-blue-600">
                            Sélectionnez un rôle ci-dessus pour voir l'email
                            correspondant.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
