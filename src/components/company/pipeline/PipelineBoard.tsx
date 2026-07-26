import { useState } from "react";
import { PipelineStage, PipelineCandidate, pipelineStages } from "@/data/company/pipeline";
import { CandidateCard } from "./CandidateCard";
import { cn } from "@/utils/cn";

interface PipelineBoardProps {
  candidates: PipelineCandidate[];
  onViewCandidate: (candidate: PipelineCandidate) => void;
  onMoveCandidate: (candidate: PipelineCandidate, target: PipelineStage) => void;
}

export function PipelineBoard({ candidates, onViewCandidate, onMoveCandidate }: PipelineBoardProps) {
  const [dragOverStage, setDragOverStage] = useState<PipelineStage | null>(null);

  const handleDragStart = (e: React.DragEvent, candidate: PipelineCandidate) => {
    e.dataTransfer.setData("candidateId", String(candidate.id));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, stage: PipelineStage) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverStage(stage);
  };

  const handleDragLeave = () => {
    setDragOverStage(null);
  };

  const handleDrop = (e: React.DragEvent, targetStage: PipelineStage) => {
    e.preventDefault();
    setDragOverStage(null);
    const id = Number(e.dataTransfer.getData("candidateId"));
    const candidate = candidates.find(c => c.id === id);
    if (candidate && candidate.stage !== targetStage) {
      onMoveCandidate(candidate, targetStage);
    }
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 min-h-[500px]">
      {pipelineStages.map((stage) => {
        const stageCandidates = candidates.filter((c) => c.stage === stage);
        return (
          <div
            key={stage}
            className={cn(
              "flex-shrink-0 w-72 bg-gray-50 rounded-xl p-4 flex flex-col",
              dragOverStage === stage && "bg-blue-50 ring-2 ring-blue-300"
            )}
            onDragOver={(e) => handleDragOver(e, stage)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, stage)}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">{stage}</h3>
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{stageCandidates.length}</span>
            </div>
            <div className="space-y-2 flex-1">
              {stageCandidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  onClick={onViewCandidate}
                  draggable
                  onDragStart={handleDragStart}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
