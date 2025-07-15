"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flower } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const navLinks = [
    { href: "/meditate", label: "Meditate" },
    { href: "/journal", label: "Journal" },
    { href: "/streak", label: "Streak" },
  ];
  return (
    <header className="w-full px-6 py-3 bg-gradient-to-r from-emerald-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 shadow-lg dark:shadow-purple-900/30 border-b border-emerald-100/40 dark:border-purple-900/40 flex items-center justify-between sticky top-0 z-50 transition-all duration-500">
      <Link href="/" className="flex items-center gap-3 group">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-emerald-200 to-purple-200 dark:from-emerald-400/80 dark:to-purple-400/80 shadow-md dark:shadow-purple-500/25 group-hover:scale-105 transition-transform">
          <Flower className="w-7 h-7 text-purple-600 dark:text-emerald-200" />
        </span>
        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-purple-600 to-teal-500 dark:from-emerald-300 dark:via-purple-300 dark:to-teal-300 bg-clip-text text-transparent tracking-tight select-none group-hover:underline">
          Trinoro
        </span>
      </Link>
      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center gap-6 text-emerald-700 dark:text-emerald-200 font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={
                `transition font-semibold ` +
                (pathname.startsWith(href)
                  ? "text-purple-600 dark:text-emerald-200 underline underline-offset-4"
                  : "text-emerald-700 dark:text-emerald-300 hover:text-purple-600 dark:hover:text-emerald-200")
              }
            >
              {label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
} 