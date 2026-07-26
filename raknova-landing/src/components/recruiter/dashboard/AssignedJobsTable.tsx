import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { assignedJobs } from "@/data/recruiter/dashboard";

const priorityStyles: Record<string, string> = {
  High: "bg-red-50 text-red-700",
  Medium: "bg-yellow-50 text-yellow-700",
  Low: "bg-gray-100 text-gray-600",
};

export function AssignedJobsTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">My Assigned Jobs</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Job Title</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Department</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Candidates Assigned</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Open Positions</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Closing Date</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Priority</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {assignedJobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{job.title}</td>
                <td className="px-6 py-4 text-gray-600">{job.department}</td>
                <td className="px-6 py-4 text-center">{job.candidatesAssigned}</td>
                <td className="px-6 py-4 text-center">{job.openPositions}</td>
                <td className="px-6 py-4 text-gray-500">{job.closingDate}</td>
                <td className="px-6 py-4">
                  <Badge variant="default" className={priorityStyles[job.priority]}>{job.priority}</Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="primary" size="sm">View Candidates</Button>
                  <Button variant="ghost" size="sm">Open Job</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
