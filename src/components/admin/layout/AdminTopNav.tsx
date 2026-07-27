import Link from "next/link";
import { useState } from "react";

export function AdminTopNav() {
  const [search, setSearch] = useState("");

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      {/* Search Input */}
      <div className="w-80 relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search candidates, companies, jobs, logs..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
        {/* System Health Badge */}
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>System Healthy (99.98%)</span>
        </div>

        {/* Notifications Shortcut */}
        <Link
          href="/admin/notifications"
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-500 relative"
          title="Notifications"
        >
          <span className="font-bold">Notifications</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
        </Link>

        {/* Admin Profile Chip */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
            SA
          </div>
          <span className="font-bold text-slate-800">Super Admin</span>
        </div>
      </div>
    </header>
  );
}
