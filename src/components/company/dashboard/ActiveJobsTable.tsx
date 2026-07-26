import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { activeJobs } from "@/data/company/dashboard";

const statusStyles = {
  Active: "bg-green-50 text-green-700",
  Draft: "bg-gray-100 text-gray-600",
  Closed: "bg-red-50 text-red-700",
};

export function ActiveJobsTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Active Jobs</h2>
        <Button variant="primary" size="sm" href="/company/jobs/create">Create Job</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Job Title</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Department</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Applications</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">AI Qualified</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Closing Date</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {activeJobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{job.title}</td>
                <td className="px-6 py-4 text-gray-600">{job.department}</td>
                <td className="px-6 py-4 text-gray-600">{job.location}</td>
                <td className="px-6 py-4 text-center font-medium">{job.applications}</td>
                <td className="px-6 py-4 text-center font-medium text-blue-600">{job.aiQualified}</td>
                <td className="px-6 py-4">
                  <Badge variant="default" className={statusStyles[job.status]}>{job.status}</Badge>
                </td>
                <td className="px-6 py-4 text-gray-500">{job.closingDate}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="sm">View</Button>
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">Close</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
