import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Job } from "@/data/company/jobs";

const statusStyles: Record<string, string> = {
  Active: "bg-green-50 text-green-700",
  Draft: "bg-gray-100 text-gray-600",
  Paused: "bg-yellow-50 text-yellow-700",
  Closed: "bg-red-50 text-red-700",
};

interface JobTableProps {
  jobs: Job[];
  onView: (job: Job) => void;
  onEdit: (job: Job) => void;
  onDuplicate: (job: Job) => void;
  onPause: (job: Job) => void;
  onClose: (job: Job) => void;
  onDelete: (job: Job) => void;
}

export function JobTable({ jobs, onView, onEdit, onDuplicate, onPause, onClose, onDelete }: JobTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Job Title</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Department</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Employment Type</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Applications</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">AI Qualified</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Closing Date</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Hiring Manager</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer" onClick={() => onView(job)}>
                <td className="px-6 py-4 font-medium text-gray-900">{job.title}</td>
                <td className="px-6 py-4 text-gray-600">{job.department}</td>
                <td className="px-6 py-4 text-gray-600">{job.location}</td>
                <td className="px-6 py-4 text-gray-600">{job.employmentType} / {job.workMode}</td>
                <td className="px-6 py-4 text-center font-medium">{job.applications}</td>
                <td className="px-6 py-4 text-center font-medium text-blue-600">{job.aiQualified}</td>
                <td className="px-6 py-4">
                  <Badge variant="default" className={statusStyles[job.status]}>{job.status}</Badge>
                </td>
                <td className="px-6 py-4 text-gray-500">{job.closingDate || "—"}</td>
                <td className="px-6 py-4 text-gray-600">{job.hiringManager}</td>
                <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onView(job); }}>View</Button>
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(job); }}>Edit</Button>
                    {job.status === "Active" && (
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onPause(job); }}>Pause</Button>
                    )}
                    {job.status !== "Closed" && (
                      <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50" onClick={(e) => { e.stopPropagation(); onClose(job); }}>Close</Button>
                    )}
                    <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50" onClick={(e) => { e.stopPropagation(); onDelete(job); }}>Delete</Button>
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
