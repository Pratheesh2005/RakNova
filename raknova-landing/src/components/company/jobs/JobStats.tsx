import { jobStats } from "@/data/company/jobs";
import { TrendBadge } from "@/components/company/shared/TrendBadge";

export function JobStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {jobStats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <TrendBadge change={stat.change} />
          </div>
          <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
