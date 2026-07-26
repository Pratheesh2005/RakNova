import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { CommandPalette } from "@/components/ui/CommandPalette";

export function RecruiterTopNav() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between h-16 px-4 lg:px-8">
          <button
            onClick={() => setPaletteOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-500 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search...</span>
            <kbd className="ml-2 px-1.5 py-0.5 text-xs text-gray-400 bg-gray-100 border border-gray-200 rounded font-mono">⌘K</kbd>
          </button>

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={() => setPaletteOpen(true)}
              className="sm:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <Link href="/recruiter/notifications" className="relative p-2 rounded-lg hover:bg-gray-100 block" title="Notifications">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
            </Link>

            <div ref={profileRef} className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100">
                <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-semibold">RK</div>
                <svg className="w-4 h-4 text-gray-400 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-30">
                  <Link href="/recruiter/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Settings</Link>
                  <Link href="/recruiter/help-support" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Help & Support</Link>
                  <hr className="my-1 border-gray-100" />
                  <Link href="/auth/login" className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Logout</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
