import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/utils/cn";

export interface NavItem {
  label: string;
  href: string;
  badge?: string | number;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "User Management", href: "/admin/users" },
  { label: "Company Management", href: "/admin/companies", badge: "2" },
  { label: "Recruiter Management", href: "/admin/recruiters" },
  { label: "Candidate Management", href: "/admin/candidates" },
  { label: "Job Management", href: "/admin/jobs" },
  { label: "Applications", href: "/admin/applications" },
  { label: "Platform Analytics", href: "/admin/analytics" },
  { label: "AI Analytics", href: "/admin/ai-analytics" },
  { label: "Subscriptions", href: "/admin/subscriptions" },
  { label: "Roles & Permissions", href: "/admin/roles" },
  { label: "Audit Logs", href: "/admin/audit-logs" },
  { label: "Notifications", href: "/admin/notifications", badge: "5" },
  { label: "System Settings", href: "/admin/settings" },
];

export function AdminSidebar() {
  const router = useRouter();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0 select-none min-h-screen">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800 justify-between">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-white text-base shadow-xs">
            R
          </div>
          <div>
            <span className="font-extrabold text-white text-base tracking-tight block">RakNova</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block -mt-1">
              Super Admin
            </span>
          </div>
        </Link>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive =
            router.pathname === item.href ||
            (item.href !== "/admin" && router.pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors",
                isActive
                  ? "bg-indigo-600 text-white shadow-xs font-bold"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
              )}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-extrabold",
                    isActive ? "bg-white/20 text-white" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / User Badge */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-900/60 text-indigo-200 border border-indigo-700/50 flex items-center justify-center text-xs font-bold">
            SA
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">System Administrator</p>
            <p className="text-[10px] text-slate-400 truncate">sysadmin@raknova.io</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
