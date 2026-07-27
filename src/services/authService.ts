export type UserRole = "candidate" | "company" | "recruiter" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyName?: string;
  loginTime: string;
  status?: "Active" | "Pending Verification" | "Suspended";
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
      status: "Active",
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
      status: "Active",
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
      status: "Active",
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
      status: "Active",
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
 */
export function login(email: string, password: string): AuthUser | null {
  const account = demoAccounts.find(
    (a) => a.email === email.toLowerCase().trim() && a.password === password
  );

  if (!account) return null;

  if (account.user.status === "Pending Verification") {
    alert("Your account is currently Pending Approval by Super Admin.");
    return null;
  }

  const user: AuthUser = {
    ...account.user,
    loginTime: new Date().toISOString(),
  };

  saveUser(user);
  return user;
}

/**
 * Register candidate account.
 */
export function registerCandidate(name: string, email: string): AuthUser {
  const newCandidate: AuthUser = {
    id: `can-${Date.now()}`,
    name,
    email,
    role: "candidate",
    loginTime: new Date().toISOString(),
    status: "Active",
  };
  saveUser(newCandidate);
  return newCandidate;
}

/**
 * Register company account (Pending Verification).
 */
export function registerCompany(name: string, email: string, companyName: string): AuthUser {
  const newCompany: AuthUser = {
    id: `cmp-${Date.now()}`,
    name,
    email,
    role: "company",
    companyName,
    loginTime: new Date().toISOString(),
    status: "Pending Verification",
  };
  saveUser(newCompany);
  return newCompany;
}

/**
 * Logout current user.
 */
export function logout(): void {
  removeUser();
}

/**
 * Get current user.
 */
export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const user: AuthUser = JSON.parse(stored);
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
 * Check if authenticated.
 */
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

/**
 * Get dashboard route for role.
 */
export function getDashboardRoute(role: UserRole): string {
  return dashboardRoutes[role] || "/candidate";
}

/**
 * Get all demo accounts.
 */
export function getDemoAccounts(): { email: string; role: UserRole; name: string }[] {
  return demoAccounts.map((a) => ({
    email: a.email,
    role: a.user.role,
    name: a.user.name,
  }));
}

/**
 * Check if user has access to a specific role list.
 */
export function hasAccess(user: AuthUser | null, allowedRoles: UserRole[]): boolean {
  if (!user) return false;
  return allowedRoles.includes(user.role);
}

/**
 * Check route-level authorization & returning redirect path if unauthorized.
 */
export function checkRouteAccess(path: string, user: AuthUser | null): { allowed: boolean; redirectUrl?: string } {
  if (!user) {
    if (path.startsWith("/candidate") || path.startsWith("/company") || path.startsWith("/recruiter") || path.startsWith("/admin")) {
      return { allowed: false, redirectUrl: "/login" };
    }
    return { allowed: true };
  }

  // Super Admin has universal portal access
  if (user.role === "admin") return { allowed: true };

  if (path.startsWith("/admin")) {
    return { allowed: false, redirectUrl: getDashboardRoute(user.role) };
  }

  if (path.startsWith("/company") && user.role !== "company") {
    return { allowed: false, redirectUrl: getDashboardRoute(user.role) };
  }

  if (path.startsWith("/recruiter") && user.role !== "recruiter") {
    return { allowed: false, redirectUrl: getDashboardRoute(user.role) };
  }

  if (path.startsWith("/candidate") && user.role !== "candidate") {
    return { allowed: false, redirectUrl: getDashboardRoute(user.role) };
  }

  return { allowed: true };
}

/**
 * Switch role for testing.
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
 * Auth change listener.
 */
export function onAuthChange(callback: (user: AuthUser | null) => void): () => void {
  const handler = () => callback(getCurrentUser());
  window.addEventListener(AUTH_EVENT, handler);
  return () => window.removeEventListener(AUTH_EVENT, handler);
}

function saveUser(user: AuthUser): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(AUTH_EVENT));
}

function removeUser(): void {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}
