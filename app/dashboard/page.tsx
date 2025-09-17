"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui";
import { mockClasses, mockEvents, mockStudents } from "@/lib/mockData";
import { getInitials } from "@/lib/utils";
import { ChevronRight, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function DashboardPage() {
    const t = useTranslations("dashboard");
    const tCommon = useTranslations("common");

    // Get featured classes (first 3)
    const featuredClasses = mockClasses.slice(0, 3);

    // Get recent students (first 12)
    const recentStudents = mockStudents.slice(0, 12);

    // Get today's events
    const todayEvents = mockEvents;

    // Generate calendar for December 2024
    const generateCalendar = () => {
        const daysInMonth = 31;
        const firstDay = new Date(2024, 11, 1).getDay(); // 0 = Sunday
        const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1; // Adjust for Monday start

        const calendar = [];

        // Empty cells for days before month starts
        for (let i = 0; i < adjustedFirstDay; i++) {
            calendar.push(null);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            calendar.push(day);
        }

        return calendar;
    };

    const calendar = generateCalendar();
    const today = 31; // December 31, 2024

    return (
        <div className="space-y-6">
            {/* Classes Section */}
            <div>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {t("myClasses")}
                    </h2>
                    <Link
                        href="/dashboard/classes"
                        className="text-sm font-medium text-green-600 hover:text-green-700"
                    >
                        {t("seeMore")}
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {featuredClasses.map(classItem => (
                        <Card
                            key={classItem.id}
                            className="border-green-200 bg-green-50"
                        >
                            <CardContent className="p-6">
                                <div className="mb-4 flex items-center">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500">
                                        <Users className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-green-700">
                                    {classItem.name}
                                </h3>
                                <p className="text-sm text-green-600">
                                    {t("totalStudents", {
                                        count: classItem.totalStudents,
                                    })}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Recent Students */}
                <div className="lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {t("recentClasses")}
                        </h2>
                        <Link
                            href="/dashboard/classes"
                            className="text-sm font-medium text-green-600 hover:text-green-700"
                        >
                            {t("seeMore")}
                        </Link>
                    </div>

                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div className="flex space-x-2 border-b pb-2 text-sm text-gray-500">
                                    <span className="w-20 rounded bg-green-100 px-2 py-1 text-xs text-green-600">
                                        {/* This could be translated if you have class names in translations */}
                                        Classe de 6ème
                                    </span>
                                    <span className="text-gray-400">
                                        Classe de 4ème
                                    </span>
                                    <span className="text-gray-400">
                                        Classe de 3ème
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {recentStudents.map(student => (
                                        <div
                                            key={student.id}
                                            className="flex items-center justify-between border-b border-gray-100 py-2 last:border-b-0"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage
                                                        src={student.avatar}
                                                        alt={student.firstName}
                                                    />
                                                    <AvatarFallback className="bg-gray-200 text-xs text-gray-600">
                                                        {getInitials(
                                                            student.firstName,
                                                            student.lastName
                                                        )}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm font-medium text-gray-900">
                                                    {student.firstName}{" "}
                                                    {student.lastName}
                                                </span>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-gray-400" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Calendar and Events */}
                <div className="space-y-6">
                    {/* Calendar */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="rounded bg-green-500 px-3 py-1 text-lg font-semibold text-white">
                                    {t("calendar")}
                                </CardTitle>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <button>‹</button>
                                    <span>Décembre 2024</span>
                                    <button>›</button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="mb-2 grid grid-cols-7 gap-1">
                                {["Su", "M", "Tu", "W", "Th", "F", "Sa"].map(
                                    day => (
                                        <div
                                            key={day}
                                            className="py-2 text-center text-xs font-medium text-gray-500"
                                        >
                                            {day}
                                        </div>
                                    )
                                )}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                                {calendar.map((day, index) => (
                                    <div
                                        key={index}
                                        className="flex aspect-square items-center justify-center"
                                    >
                                        {day && (
                                            <button
                                                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors ${
                                                    day === today
                                                        ? "bg-green-500 font-semibold text-white"
                                                        : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                            >
                                                {day}
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Upcoming Events */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="rounded bg-green-500 px-3 py-1 text-lg font-semibold text-white">
                                {t("upcomingEvents")}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="space-y-3">
                                {todayEvents.map(event => (
                                    <div key={event.id} className="space-y-1">
                                        <h4 className="text-sm font-medium text-gray-900">
                                            {event.title}
                                        </h4>
                                        <div className="flex items-center justify-between text-xs">
                                            <span
                                                className={`rounded px-2 py-1 text-white ${
                                                    event.color === "green"
                                                        ? "bg-green-500"
                                                        : event.color ===
                                                            "purple"
                                                          ? "bg-purple-500"
                                                          : event.color ===
                                                              "yellow"
                                                            ? "bg-amber-500"
                                                            : "bg-gray-500"
                                                }`}
                                            >
                                                {event.className}
                                            </span>
                                            <span className="text-gray-500">
                                                {event.time} {tCommon("min")}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
