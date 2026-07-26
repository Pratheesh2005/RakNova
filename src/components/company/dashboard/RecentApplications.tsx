import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { recentApplicants } from "@/data/company/dashboard";
import { formatRelativeTime } from "@/utils/formatDate";

const matchColor = (score: number) => {
  if (score >= 90) return "text-green-600 bg-green-50";
  if (score >= 80) return "text-brand-600 bg-brand-50";
  return "text-yellow-600 bg-yellow-50";
};

export function RecentApplications() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
        <Button variant="ghost" size="sm" className="text-brand-600">View All</Button>
      </div>

      <div className="divide-y divide-gray-50">
        {recentApplicants.map((applicant) => (
          <div key={applicant.id} className="flex items-center gap-4 p-4 hover:bg-gray-50/50 transition-colors">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600 flex-shrink-0">
              {applicant.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{applicant.name}</p>
              <p className="text-xs text-gray-500">{applicant.role}</p>
            </div>
            <Badge variant="default" size="sm" className={matchColor(applicant.aiMatch)}>
              {applicant.aiMatch}% Match
            </Badge>
            <span className="text-xs text-gray-400">{applicant.appliedDate}</span>
            <div className="flex items-center gap-1">
              <Button variant="primary" size="sm">Shortlist</Button>
              <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">Reject</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
