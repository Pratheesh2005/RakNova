import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  AuthUser,
  UserRole,
  getCurrentUser,
  login as authLogin,
  logout as authLogout,
  getDashboardRoute,
  hasAccess,
  onAuthChange,
  switchRole as authSwitchRole,
} from "@/services/authService";

export function useAuth(requiredRole?: UserRole | UserRole[]) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user on mount
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);

    // Subscribe to auth changes
    const unsubscribe = onAuthChange((updatedUser) => {
      setUser(updatedUser);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (loading) return;

    // If no user, redirect to login
    if (!user) {
      router.push("/auth/login");
      return;
    }

    // If required role specified, check access
    if (requiredRole) {
      const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
      if (!hasAccess(user, roles)) {
        const correctRoute = getDashboardRoute(user.role);
        router.push(correctRoute);
      }
    }
  }, [user, loading, requiredRole, router]);

  const login = (email: string, password: string): AuthUser | null => {
    const loggedInUser = authLogin(email, password);
    if (loggedInUser) {
      setUser(loggedInUser);
      return loggedInUser;
    }
    return null;
  };

  const logout = () => {
    authLogout();
    setUser(null);
    router.push("/auth/login");
  };

  const switchRole = (role: UserRole) => {
    const switchedUser = authSwitchRole(role);
    setUser(switchedUser);
    const route = getDashboardRoute(role);
    router.push(route);
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    switchRole,
  };
}
