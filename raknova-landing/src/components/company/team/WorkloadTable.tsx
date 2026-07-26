import { Badge } from "@/components/ui/Badge";
import { WorkloadItem } from "@/data/company/team";

const workloadStatusStyles: Record<string, string> = {
  Light: "bg-green-50 text-green-700",
  Normal: "bg-blue-50 text-blue-700",
  Busy: "bg-yellow-50 text-yellow-700",
  Overloaded: "bg-red-50 text-red-700",
};

interface WorkloadTableProps {
  items: WorkloadItem[];
}

export function WorkloadTable({ items }: WorkloadTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Workload</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Recruiter</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Jobs Assigned</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Candidates</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Interviews This Week</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Pending Reviews</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Workload Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{item.recruiter}</td>
                <td className="px-6 py-4 text-center">{item.jobsAssigned}</td>
                <td className="px-6 py-4 text-center">{item.candidates}</td>
                <td className="px-6 py-4 text-center">{item.interviewsThisWeek}</td>
                <td className="px-6 py-4 text-center">{item.pendingReviews}</td>
                <td className="px-6 py-4">
                  <Badge variant="default" className={workloadStatusStyles[item.workloadStatus]}>{item.workloadStatus}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
