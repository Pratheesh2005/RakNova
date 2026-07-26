import { quickActions } from "@/data/candidate/dashboard";
import Link from "next/link";

export function QuickActions() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-brand-200 hover:bg-brand-50/50 transition-all text-center"
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="text-sm font-medium text-gray-700">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
