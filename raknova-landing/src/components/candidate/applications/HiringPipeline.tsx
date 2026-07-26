import { applications, pipelineStages, getStageIndex } from "@/data/candidate/applications";
import { cn } from "@/utils/cn";

export function HiringPipeline() {
  // Count applications at each stage
  const stageCounts = pipelineStages.map((stage) => ({
    ...stage,
    count: applications.filter((a) => a.currentStage === stage.stage).length,
    rejected: stage.stage === "Rejected" ? applications.filter((a) => a.currentStage === "Rejected").length : 0,
  }));

  // Determine the furthest active stage
  const activeStages = applications
    .filter((a) => a.currentStage !== "Rejected" && a.currentStage !== "Hired")
    .map((a) => getStageIndex(a.currentStage));
  const furthestActive = activeStages.length > 0 ? Math.max(...activeStages) : 0;

  const getStageColor = (index: number, stage: string) => {
    if (stage === "Hired") return "bg-green-500";
    if (stage === "Rejected") return "bg-red-400";
    if (index < furthestActive) return "bg-brand-500";
    if (index === furthestActive) return "bg-yellow-500 animate-pulse";
    return "bg-gray-200";
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 overflow-x-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Hiring Pipeline</h3>

      <div className="flex items-start gap-2 min-w-[900px]">
        {stageCounts.map((stage, idx) => (
          <div key={stage.stage} className="flex-1 flex flex-col items-center">
            {/* Stage circle */}
            <div className="relative">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md transition-all",
                  getStageColor(idx, stage.stage)
                )}
              >
                {stage.count > 0 ? stage.count : idx + 1}
              </div>
              {stage.stage === "Hired" && stage.count > 0 && (
                <span className="absolute -top-1 -right-1 text-lg">🎉</span>
              )}
            </div>

            {/* Connector line */}
            {idx < stageCounts.length - 1 && (
              <div className="w-full h-0.5 mt-4 relative">
                <div className="absolute inset-0 bg-gray-200" />
                <div
                  className="absolute inset-0 bg-brand-500 transition-all duration-500"
                  style={{ width: `${idx < furthestActive ? 100 : idx === furthestActive ? 50 : 0}%` }}
                />
              </div>
            )}

            {/* Stage label */}
            <p className="text-xs text-gray-600 text-center mt-2 font-medium leading-tight">
              {stage.label}
            </p>

            {/* Count badge */}
            {stage.count > 0 && (
              <span className="text-xs text-gray-400 mt-1">{stage.count} application{stage.count > 1 ? "s" : ""}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
