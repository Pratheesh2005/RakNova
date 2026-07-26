export type UserRole = "candidate" | "company" | "recruiter" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyName?: string;
  loginTime: string;
}

interface DemoAccount {
  email: string;
  password: string;
  user: AuthUser;
}

const demoAccounts: DemoAccount[] = [
  {
    email: "candidate@raknova.com",
    password: "123456",
    user: {
      id: "demo-candidate-001",
      name: "John Doe",
      email: "candidate@raknova.com",
      role: "candidate",
      loginTime: "",
    },
  },
  {
    email: "company@raknova.com",
    password: "123456",
    user: {
      id: "demo-company-001",
      name: "TechNova Solutions",
      email: "company@raknova.com",
      role: "company",
      companyName: "TechNova Solutions",
      loginTime: "",
    },
  },
  {
    email: "recruiter@raknova.com",
    password: "123456",
    user: {
      id: "demo-recruiter-001",
      name: "Priya Sharma",
      email: "recruiter@raknova.com",
      role: "recruiter",
      companyName: "TechNova Solutions",
      loginTime: "",
    },
  },
  {
    email: "admin@raknova.com",
    password: "123456",
    user: {
      id: "demo-admin-001",
      name: "RakNova Admin",
      email: "admin@raknova.com",
      role: "admin",
      loginTime: "",
    },
  },
];

const STORAGE_KEY = "raknova_auth_user";
const AUTH_EVENT = "raknova_auth_change";

const dashboardRoutes: Record<UserRole, string> = {
  candidate: "/candidate",
  company: "/company",
  recruiter: "/recruiter",
  admin: "/admin",
};

/**
 * Authenticate user with email and password.
 * Returns AuthUser on success, null on failure.
 */
export function login(email: string, password: string): AuthUser | null {
  const account = demoAccounts.find(
    (a) => a.email === email.toLowerCase().trim() && a.password === password
  );

  if (!account) return null;

  const user: AuthUser = {
    ...account.user,
    loginTime: new Date().toISOString(),
  };

  saveUser(user);
  return user;
}

/**
 * Logout the current user.
 */
export function logout(): void {
  removeUser();
}

/**
 * Get the currently logged-in user from storage.
 */
export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const user: AuthUser = JSON.parse(stored);

    // Validate user data
    if (!user.id || !user.email || !user.role) {
      removeUser();
      return null;
    }

    return user;
  } catch {
    removeUser();
    return null;
  }
}

/**
 * Check if user is authenticated.
 */
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

/**
 * Get the dashboard route for a given role.
 */
export function getDashboardRoute(role: UserRole): string {
  return dashboardRoutes[role] || "/candidate";
}

/**
 * Get all demo accounts for display purposes.
 */
export function getDemoAccounts(): { email: string; role: UserRole; name: string }[] {
  return demoAccounts.map((a) => ({
    email: a.email,
    role: a.user.role,
    name: a.user.name,
  }));
}

/**
 * Check if user has access to a specific route.
 */
export function hasAccess(user: AuthUser | null, allowedRoles: UserRole[]): boolean {
  if (!user) return false;
  return allowedRoles.includes(user.role);
}

/**
 * Switch to a different demo account (development only).
 */
export function switchRole(role: UserRole): AuthUser {
  const account = demoAccounts.find((a) => a.user.role === role);
  if (!account) throw new Error(`No demo account for role: ${role}`);

  const user: AuthUser = {
    ...account.user,
    loginTime: new Date().toISOString(),
  };

  saveUser(user);
  return user;
}

/**
 * Subscribe to auth state changes.
 */
export function onAuthChange(callback: (user: AuthUser | null) => void): () => void {
  const handler = () => callback(getCurrentUser());
  window.addEventListener(AUTH_EVENT, handler);
  return () => window.removeEventListener(AUTH_EVENT, handler);
}

// Private helpers

function saveUser(user: AuthUser): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(AUTH_EVENT));
}

function removeUser(): void {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}
