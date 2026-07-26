import { savedJobs, getDaysUntilDeadline } from "@/data/candidate/savedJobs";

const highMatchJobs = savedJobs.filter((j) => j.matchPercentage >= 85).length;
const expiringSoon = savedJobs.filter((j) => getDaysUntilDeadline(j.deadline) <= 5).length;
const alreadyApplied = savedJobs.filter((j) => j.hasApplied).length;

const stats = [
  { label: "Total Saved Jobs", value: savedJobs.length.toString(), icon: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z", color: "text-brand-600", bg: "bg-brand-50" },
  { label: "High AI Match (>85%)", value: highMatchJobs.toString(), icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "text-green-600", bg: "bg-green-50" },
  { label: "Expiring Soon", value: expiringSoon.toString(), icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", color: "text-red-600", bg: "bg-red-50" },
  { label: "Already Applied", value: alreadyApplied.toString(), icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", color: "text-blue-600", bg: "bg-blue-50" },
];

export function SavedJobStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
          <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
            <svg className={`w-5 h-5 ${stat.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
            </svg>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
