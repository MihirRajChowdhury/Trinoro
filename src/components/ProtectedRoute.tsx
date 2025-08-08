"use client";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import { LogIn } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!session) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-emerald-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-emerald-200 to-purple-200 dark:from-emerald-400/80 dark:to-purple-400/80 flex items-center justify-center">
            <LogIn className="w-12 h-12 text-purple-600 dark:text-emerald-200" />
          </div>
          <h1 className="text-3xl font-bold text-emerald-700 dark:text-emerald-200">
            Sign in Required
          </h1>
          <p className="text-lg text-emerald-600 dark:text-emerald-300">
            Please sign in to access this feature and track your progress.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
