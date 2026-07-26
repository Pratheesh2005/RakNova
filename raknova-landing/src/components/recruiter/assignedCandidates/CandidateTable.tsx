import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AssignedCandidate } from "@/data/recruiter/assignedCandidates";
import { cn } from "@/utils/cn";

const stageStyles: Record<string, string> = {
  "Assigned": "bg-blue-50 text-blue-700",
  "Under Review": "bg-yellow-50 text-yellow-700",
  "Interview Ready": "bg-purple-50 text-purple-700",
  "Interview Scheduled": "bg-indigo-50 text-indigo-700",
  "Feedback Pending": "bg-orange-50 text-orange-700",
  "Offer Recommended": "bg-green-50 text-green-700",
};

const priorityStyles: Record<string, string> = {
  High: "bg-red-50 text-red-700",
  Medium: "bg-yellow-50 text-yellow-700",
  Low: "bg-gray-100 text-gray-600",
};

interface CandidateTableProps {
  candidates: AssignedCandidate[];
  selectedIds: number[];
  onSelect: (id: number) => void;
  onSelectAll: (checked: boolean) => void;
  onViewCandidate: (candidate: AssignedCandidate) => void;
}

export function CandidateTable({ candidates, selectedIds, onSelect, onSelectAll, onViewCandidate }: CandidateTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={candidates.length > 0 && selectedIds.length === candidates.length}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Candidate</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Applied Job</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Experience</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Education</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">AI Match</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Resume Score</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Current Stage</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Assigned Date</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Priority</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {candidates.map((candidate) => (
              <tr
                key={candidate.id}
                className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                onClick={() => onViewCandidate(candidate)}
              >
                <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(candidate.id)}
                    onChange={() => onSelect(candidate.id)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{candidate.name}</td>
                <td className="px-6 py-4 text-gray-600">{candidate.appliedJob}</td>
                <td className="px-6 py-4 text-gray-600">{candidate.experience}</td>
                <td className="px-6 py-4 text-gray-600">{candidate.education}</td>
                <td className="px-6 py-4 text-center">
                  <span className={cn("font-medium", candidate.aiMatch >= 90 ? "text-green-600" : candidate.aiMatch >= 80 ? "text-blue-600" : "text-yellow-600")}>
                    {candidate.aiMatch}%
                  </span>
                </td>
                <td className="px-6 py-4 text-center font-medium">{candidate.resumeScore}%</td>
                <td className="px-6 py-4">
                  <Badge variant="default" className={stageStyles[candidate.currentStage]}>{candidate.currentStage}</Badge>
                </td>
                <td className="px-6 py-4 text-gray-500">{candidate.assignedDate}</td>
                <td className="px-6 py-4">
                  <Badge variant="default" className={priorityStyles[candidate.priority]}>{candidate.priority}</Badge>
                </td>
                <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <Button variant="primary" size="sm" onClick={() => onViewCandidate(candidate)}>View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
