import { useState } from "react";
import { getDemoAccounts } from "@/services/authService";
import { cn } from "@/utils/cn";
import { Badge } from "@/components/ui/Badge";

const roleLabels: Record<string, { label: string; color: string }> = {
  candidate: { label: "Candidate", color: "bg-blue-50 text-blue-700" },
  company: { label: "Company", color: "bg-purple-50 text-purple-700" },
  recruiter: { label: "Recruiter", color: "bg-green-50 text-green-700" },
  admin: { label: "Super Admin", color: "bg-red-50 text-red-700" },
};

export function DemoAccountsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const demoAccounts = getDemoAccounts();

  return (
    <div className="mt-6 border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
      >
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Demo Accounts
        </span>
        <svg
          className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-2">
          <p className="text-xs text-gray-500 mb-3">
            Use these accounts to test each portal. Password for all: <code className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-brand-600 font-mono">123456</code>
          </p>
          <div className="space-y-2">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                onClick={() => {
                  const emailInput = document.getElementById("email-input") as HTMLInputElement;
                  const passwordInput = document.getElementById("password-input") as HTMLInputElement;
                  if (emailInput) emailInput.value = account.email;
                  if (passwordInput) passwordInput.value = "123456";
                }}
                className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-brand-300 hover:bg-brand-50/50 transition-all text-left"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{account.name}</p>
                  <p className="text-xs text-gray-500">{account.email}</p>
                </div>
                <Badge variant="default" size="sm" className={roleLabels[account.role]?.color}>
                  {roleLabels[account.role]?.label}
                </Badge>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">
            This panel is for demo purposes only and will be removed in production.
          </p>
        </div>
      )}
    </div>
  );
}
