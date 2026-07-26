import { Badge } from "@/components/ui/Badge";
import { jobsPerformance } from "@/data/company/hiringAnalytics";

const statusStyles: Record<string, string> = {
  Active: "bg-green-50 text-green-700",
  Draft: "bg-gray-100 text-gray-600",
  Closed: "bg-red-50 text-red-700",
};

export function ActiveJobPerformanceTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Active Job Performance</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Job</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Applications</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Shortlisted</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Interviews</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Offers</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Hires</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Avg AI Match</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {jobsPerformance.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{job.title}</td>
                <td className="px-6 py-4 text-center">{job.applications}</td>
                <td className="px-6 py-4 text-center">{job.shortlisted}</td>
                <td className="px-6 py-4 text-center">{job.interviews}</td>
                <td className="px-6 py-4 text-center">{job.offers}</td>
                <td className="px-6 py-4 text-center">{job.hires}</td>
                <td className="px-6 py-4 text-center font-medium">{job.avgAIMatch}%</td>
                <td className="px-6 py-4">
                  <Badge variant="default" className={statusStyles[job.status]}>{job.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
