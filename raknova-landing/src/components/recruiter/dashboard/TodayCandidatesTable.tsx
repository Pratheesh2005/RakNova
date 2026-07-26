import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { todayCandidates } from "@/data/recruiter/dashboard";
import { cn } from "@/utils/cn";

const priorityStyles: Record<string, string> = {
  High: "bg-red-50 text-red-700",
  Medium: "bg-yellow-50 text-yellow-700",
  Low: "bg-gray-100 text-gray-600",
};

export function TodayCandidatesTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Today's Candidates</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Candidate</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Applied Role</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">AI Match</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Resume Score</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Current Stage</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Priority</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {todayCandidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{candidate.name}</td>
                <td className="px-6 py-4 text-gray-600">{candidate.appliedRole}</td>
                <td className="px-6 py-4 text-center">
                  <span className={cn("font-medium", candidate.aiMatch >= 90 ? "text-green-600" : candidate.aiMatch >= 80 ? "text-blue-600" : "text-yellow-600")}>
                    {candidate.aiMatch}%
                  </span>
                </td>
                <td className="px-6 py-4 text-center font-medium">{candidate.resumeScore}%</td>
                <td className="px-6 py-4 text-gray-600">{candidate.currentStage}</td>
                <td className="px-6 py-4">
                  <Badge variant="default" className={priorityStyles[candidate.priority]}>{candidate.priority}</Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex gap-1 justify-end">
                    <Button variant="primary" size="sm">Review</Button>
                    <Button variant="ghost" size="sm">Shortlist</Button>
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
