import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { recentApplicants } from "@/data/company/dashboard";
import { cn } from "@/utils/cn";

const statusStyles = {
  New: "bg-blue-50 text-blue-700",
  Reviewed: "bg-purple-50 text-purple-700",
  Shortlisted: "bg-green-50 text-green-700",
  Rejected: "bg-red-50 text-red-700",
};

export function RecentApplicationsTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
        <Button variant="ghost" size="sm" className="text-blue-600">View All</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Candidate</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Applied Role</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Experience</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">AI Match</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Resume Score</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Applied Date</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {recentApplicants.map((applicant) => (
              <tr key={applicant.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer">
                <td className="px-6 py-4 font-medium text-gray-900">{applicant.name}</td>
                <td className="px-6 py-4 text-gray-600">{applicant.role}</td>
                <td className="px-6 py-4 text-gray-600">{applicant.experience}</td>
                <td className="px-6 py-4 text-center">
                  <span className={cn("font-medium", applicant.aiMatch >= 90 ? "text-green-600" : applicant.aiMatch >= 80 ? "text-blue-600" : "text-yellow-600")}>
                    {applicant.aiMatch}%
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={cn("font-medium", applicant.resumeScore >= 85 ? "text-green-600" : "text-yellow-600")}>
                    {applicant.resumeScore}%
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="default" className={statusStyles[applicant.status]}>{applicant.status}</Badge>
                </td>
                <td className="px-6 py-4 text-gray-500">{applicant.appliedDate}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="primary" size="sm">Shortlist</Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">Reject</Button>
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
