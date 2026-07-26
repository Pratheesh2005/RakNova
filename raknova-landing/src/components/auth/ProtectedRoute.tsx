import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCurrentUser, hasAccess, getDashboardRoute, UserRole } from "@/services/authService";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole | UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();

    if (!user) {
      router.push("/auth/login");
      return;
    }

    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

    if (!hasAccess(user, roles)) {
      const correctRoute = getDashboardRoute(user.role);
      router.push(correctRoute);
      return;
    }

    setAuthorized(true);
    setChecking(false);
  }, [allowedRoles, router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <svg className="animate-spin w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-gray-500">Loading...</span>
        </div>
      </div>
    );
  }

  if (!authorized) return null;

  return <>{children}</>;
}
