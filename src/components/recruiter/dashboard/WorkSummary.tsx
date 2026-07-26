import { workStats } from "@/data/recruiter/dashboard";

export function WorkSummary() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
      {workStats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
