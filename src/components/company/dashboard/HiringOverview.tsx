import { hiringStats } from "@/data/company/dashboard";
import { TrendBadge } from "@/components/company/shared/TrendBadge";

export function HiringOverview() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Hiring Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {hiringStats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <TrendBadge change={stat.change} />
            </div>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
