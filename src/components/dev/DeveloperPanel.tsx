import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/services/authService";
import { cn } from "@/utils/cn";
import { Badge } from "@/components/ui/Badge";

const roles: { role: UserRole; label: string; color: string }[] = [
  { role: "candidate", label: "Candidate", color: "bg-blue-500" },
  { role: "company", label: "Company", color: "bg-purple-500" },
  { role: "recruiter", label: "Recruiter", color: "bg-green-500" },
  { role: "admin", label: "Admin", color: "bg-red-500" },
];

export function DeveloperPanel() {
  const { user, switchRole, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Only show in development
  if (process.env.NODE_ENV !== "development") return null;
  if (!user) return null;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors"
        title="Developer Panel"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-72 bg-gray-900 text-white rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-yellow-400">🔧 Developer Panel</span>
              <Badge variant="default" size="sm" className="bg-yellow-400/20 text-yellow-400 text-xs">
                Dev Only
              </Badge>
            </div>
          </div>

          <div className="p-4 space-y-3">
            {/* Current User Info */}
            <div className="space-y-1 text-sm">
              <p className="text-gray-400">Current User</p>
              <p className="font-medium">{user.email}</p>
              <Badge variant="default" size="sm" className="capitalize">
                {user.role}
              </Badge>
            </div>

            {/* Role Switcher */}
            <div>
              <p className="text-xs text-gray-400 mb-2">Switch Role</p>
              <div className="grid grid-cols-2 gap-2">
                {roles.map((r) => (
                  <button
                    key={r.role}
                    onClick={() => switchRole(r.role)}
                    disabled={user.role === r.role}
                    className={cn(
                      "px-3 py-2 text-xs rounded-lg font-medium transition-all capitalize",
                      user.role === r.role
                        ? "bg-gray-700 text-gray-300 cursor-default"
                        : "bg-gray-800 hover:bg-gray-700 text-gray-200"
                    )}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="w-full py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 p-1 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
