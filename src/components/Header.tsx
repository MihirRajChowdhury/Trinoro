"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flower, LogIn, LogOut, User } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const navLinks = [
    { href: "/meditate", label: "Meditate" },
    { href: "/journal", label: "Journal" },
    { href: "/streak", label: "Streak" },
  ];

  const handleSignIn = async () => {
    try {
      await signIn("google", {
        callbackUrl: "/",
        redirect: true
      });
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut({
        callbackUrl: "/",
        redirect: true
      });
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

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

        {status === "loading" ? (
          <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        ) : session ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-purple-400 flex items-center justify-center">
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>
              <span className="hidden md:inline text-emerald-700 dark:text-emerald-200 text-sm font-medium truncate max-w-[120px]">
                {session.user?.name || session.user?.email}
              </span>
            </div>
            <button
              onClick={handleSignOut}
              className="px-3 py-1.5 rounded-full bg-gradient-to-br from-purple-200 to-emerald-200 dark:from-purple-700 dark:to-emerald-700 text-purple-700 dark:text-emerald-200 text-xs font-semibold shadow hover:from-purple-300 hover:to-emerald-300 dark:hover:from-purple-600 dark:hover:to-emerald-600 transition flex items-center gap-1"
            >
              <LogOut className="w-3 h-3" />
              Sign out
            </button>
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            className="px-3 py-1.5 rounded-full bg-gradient-to-br from-emerald-400 to-purple-400 dark:from-purple-700 dark:to-emerald-500 text-white text-xs font-semibold shadow hover:from-emerald-500 hover:to-purple-500 dark:hover:from-purple-600 dark:hover:to-emerald-400 transition flex items-center gap-1"
          >
            <LogIn className="w-3 h-3" />
            Sign in
          </button>
        )}
      </div>
    </header>
  );
}