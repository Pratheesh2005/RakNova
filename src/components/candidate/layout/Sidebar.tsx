import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const navItems = [
  {
    section: "Main",
    items: [
      { label: "Dashboard", href: "/candidate", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" },
    ],
  },
  {
    section: "Profile",
    items: [
      { label: "My Profile", href: "/candidate/profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
      { label: "Resume Manager", href: "/candidate/resume", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    ],
  },
  {
    section: "Jobs",
    items: [
      { label: "Recommendations", href: "/candidate/jobs", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
      { label: "Job Search", href: "/candidate/job-search", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
      { label: "Saved Jobs", href: "/candidate/saved-jobs", icon: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" },
    ],
  },
  {
    section: "Career",
    items: [
      { label: "Applications", href: "/candidate/applications", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
      { label: "Interviews", href: "/candidate/interviews", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
      { label: "Skill Analytics", href: "/candidate/skill-analytics", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
    ],
  },
  {
    section: "Tools",
    items: [
      { label: "AI Assistant", href: "/candidate/ai-assistant", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
      { label: "Notifications", href: "/candidate/notifications", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
    ],
  },
  {
    section: "Settings",
    items: [
      { label: "Settings", href: "/candidate/settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
    ],
  },
];

export function Sidebar() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 h-20 border-b border-gray-100 flex-shrink-0">
        <Image src="/RakNovaLogo.jpg" alt="RakNova" width={40} height={40} className="h-10 w-auto" />
        <span className="text-xl font-bold text-gray-900 font-heading">RakNova</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navItems.map((section) => (
          <div key={section.section}>
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {section.section}
            </p>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = router.pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => isMobile && setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                        isActive
                          ? "bg-brand-50 text-brand-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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

      {/* User footer */}
      <div className="p-4 border-t border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-sm font-semibold">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
            <p className="text-xs text-gray-500 truncate">john@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile sidebar with overlay
  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden fixed top-3 left-3 z-40 p-2 rounded-lg bg-white shadow-md border border-gray-200"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl">
              {sidebarContent}
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop sidebar
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 bg-white border-r border-gray-100 z-30">
      {sidebarContent}
    </aside>
  );
}
