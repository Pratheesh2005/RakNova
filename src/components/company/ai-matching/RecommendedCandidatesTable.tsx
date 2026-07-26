import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { RecommendedCandidate } from "@/data/company/aiMatching";
import { cn } from "@/utils/cn";

interface RecommendedCandidatesTableProps {
  candidates: RecommendedCandidate[];
  selectedIds: number[];
  onToggleSelect: (id: number) => void;
  onViewBreakdown: (candidate: RecommendedCandidate) => void;
  onCompare: () => void;
  compareEnabled: boolean;
}

const recommendationStyles: Record<string, string> = {
  "Interview Immediately": "bg-green-50 text-green-700",
  "Strong Candidate": "bg-blue-50 text-blue-700",
  "Needs Manual Review": "bg-yellow-50 text-yellow-700",
  "Not Recommended": "bg-red-50 text-red-700",
};

export function RecommendedCandidatesTable({
  candidates,
  selectedIds,
  onToggleSelect,
  onViewBreakdown,
  onCompare,
  compareEnabled,
}: RecommendedCandidatesTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="w-10 px-4 py-3">
                <span className="sr-only">Select</span>
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Candidate</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">AI Match</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Resume Score</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Experience</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Key Skills</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Education</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Current Stage</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Recommendation</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {candidates.map((candidate) => {
              const isSelected = selectedIds.includes(candidate.id);
              return (
                <tr
                  key={candidate.id}
                  className={cn(
                    "hover:bg-gray-50/50 transition-colors",
                    isSelected && "bg-blue-50/30"
                  )}
                >
                  <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(candidate.id)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{candidate.name}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={cn("font-bold", candidate.matchPercentage >= 90 ? "text-green-600" : candidate.matchPercentage >= 80 ? "text-blue-600" : "text-yellow-600")}>
                      {candidate.matchPercentage}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-medium">{candidate.resumeScore}%</td>
                  <td className="px-6 py-4 text-gray-600">{candidate.experience}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {candidate.keySkills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="default" className="bg-gray-100 text-gray-700 text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{candidate.education}</td>
                  <td className="px-6 py-4 text-gray-600">{candidate.currentStage}</td>
                  <td className="px-6 py-4">
                    <Badge variant="default" className={recommendationStyles[candidate.recommendation] || ""}>
                      {candidate.recommendation}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="primary" size="sm" onClick={() => onViewBreakdown(candidate)}>View</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {compareEnabled && (
        <div className="border-t border-gray-100 p-3 flex justify-end">
          <Button variant="outline" size="sm" onClick={onCompare}>Compare Selected ({selectedIds.length})</Button>
        </div>
      )}
    </div>
  );
}
