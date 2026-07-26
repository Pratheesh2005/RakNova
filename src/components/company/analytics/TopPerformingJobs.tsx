import { topPerformingJobs } from "@/data/company/hiringAnalytics";

export function TopPerformingJobs() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Jobs</h2>
      <div className="space-y-3">
        {topPerformingJobs.map((job, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">{job.title}</p>
              <p className="text-xs text-gray-500">{job.applications} applications | Avg Match {job.avgAIMatch}%</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{job.offers} offers</p>
              <p className="text-xs text-gray-500">{job.hires} hires</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
