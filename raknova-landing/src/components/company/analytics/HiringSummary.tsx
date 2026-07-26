import { summary } from "@/data/company/hiringAnalytics";

const stats = [
  { label: "Applications", value: summary.applications },
  { label: "Interviews Conducted", value: summary.interviewsConducted },
  { label: "Offers Sent", value: summary.offersSent },
  { label: "Successful Hires", value: summary.successfulHires },
  { label: "Average Time to Hire", value: summary.avgTimeToHire },
  { label: "Offer Acceptance Rate", value: `${summary.offerAcceptanceRate}%` },
];

export function HiringSummary() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
