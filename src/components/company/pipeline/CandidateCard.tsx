import { Badge } from "@/components/ui/Badge";
import { PipelineCandidate } from "@/data/company/pipeline";
import { cn } from "@/utils/cn";

interface CandidateCardProps {
  candidate: PipelineCandidate;
  onClick: (candidate: PipelineCandidate) => void;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent, candidate: PipelineCandidate) => void;
}

const priorityStyles: Record<string, string> = {
  High: "bg-red-50 text-red-700",
  Medium: "bg-yellow-50 text-yellow-700",
  Low: "bg-gray-100 text-gray-600",
};

export function CandidateCard({ candidate, onClick, draggable, onDragStart }: CandidateCardProps) {
  return (
    <div
      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(candidate)}
      draggable={draggable}
      onDragStart={(e) => onDragStart?.(e, candidate)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-700">
            {candidate.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{candidate.name}</p>
            <p className="text-xs text-gray-500">{candidate.position}</p>
          </div>
        </div>
        <Badge variant="default" className={priorityStyles[candidate.priority]}>{candidate.priority}</Badge>
      </div>
      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
        <span>Match: <span className={cn("font-medium", candidate.aiMatch >= 90 ? "text-green-600" : candidate.aiMatch >= 80 ? "text-blue-600" : "text-yellow-600")}>{candidate.aiMatch}%</span></span>
        <span>Score: <span className="font-medium">{candidate.resumeScore}%</span></span>
        <span>{candidate.appliedDate}</span>
      </div>
    </div>
  );
}
