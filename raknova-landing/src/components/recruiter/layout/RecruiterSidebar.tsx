import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { recruiterInfo } from "@/data/recruiter/dashboard";

const navItems = [
  {
    section: "Main",
    items: [
      { label: "Dashboard", href: "/recruiter", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" },
    ],
  },
  {
    section: "Work",
    items: [
      { label: "Assigned Jobs", href: "/recruiter/jobs", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
      { label: "Assigned Candidates", href: "/recruiter/candidates", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857" },
      { label: "Communication", href: "/recruiter/communication", icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" },
      { label: "Interview Schedule", href: "/recruiter/interviews", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
      { label: "Interview Feedback", href: "/recruiter/feedback", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
    ],
  },
  {
    section: "Performance",
    items: [
      { label: "My Work Insights", href: "/recruiter/work-insights", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10" },
    ],
  },
  {
    section: "Settings & Support",
    items: [
      { label: "Notifications", href: "/recruiter/notifications", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341" },
      { label: "Help & Support", href: "/recruiter/help-support", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" },
      { label: "Settings", href: "/recruiter/settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066" },
    ],
  },
];

export function RecruiterSidebar() {
  const router = useRouter();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 bg-white border-r border-gray-100 z-30">
      <div className="flex items-center gap-3 px-6 h-20 border-b border-gray-100 flex-shrink-0">
        <Image src="/RakNovaLogo.jpg" alt="RakNova" width={40} height={40} className="h-10 w-auto" />
        <div>
          <span className="text-lg font-bold text-gray-900 font-heading">RakNova</span>
          <p className="text-xs text-gray-500">Recruiter Workspace</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navItems.map((section) => (
          <div key={section.section}>
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{section.section}</p>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = router.pathname === item.href || (item.href !== "/recruiter" && router.pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                        isActive ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                      </svg>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-semibold">
            {recruiterInfo.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{recruiterInfo.name}</p>
            <p className="text-xs text-gray-500 truncate">Recruiter</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
