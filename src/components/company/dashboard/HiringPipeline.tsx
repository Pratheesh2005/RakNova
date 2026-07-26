import { cn } from "@/utils/cn";

export interface PipelineStage {
  stage: string;
  count: number;
  bottleneck?: boolean;
}

const pipelineStages: PipelineStage[] = [
  { stage: "Applied", count: 487 },
  { stage: "Screened", count: 240 },
  { stage: "Technical Test", count: 120 },
  { stage: "Interview", count: 42, bottleneck: true },
  { stage: "Offer", count: 15 },
  { stage: "Hired", count: 8 },
];

export function HiringPipeline() {
  const maxCount = Math.max(...pipelineStages.map((s) => s.count));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Hiring Pipeline</h2>

      <div className="flex items-start gap-2 overflow-x-auto pb-2 min-w-[700px]">
        {pipelineStages.map((stage, idx) => (
          <div key={stage.stage} className="flex items-center flex-1 min-w-[90px]">
            <div className="flex flex-col items-center w-full">
              {/* Bar */}
              <div className="w-full bg-gray-100 rounded-t-lg overflow-hidden flex flex-col justify-end" style={{ height: "80px" }}>
                <div
                  className={cn(
                    "w-full rounded-t-lg transition-all duration-500",
                    stage.bottleneck ? "bg-yellow-400" : "bg-blue-500"
                  )}
                  style={{ height: `${(stage.count / maxCount) * 100}%` }}
                />
              </div>

              {/* Count */}
              <div className="mt-2 text-center">
                <p className={cn("text-lg font-bold", stage.bottleneck ? "text-yellow-600" : "text-gray-900")}>
                  {stage.count}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 leading-tight">{stage.stage}</p>
                {stage.bottleneck && (
                  <p className="text-xs text-yellow-600 font-medium mt-1">⚠ Bottleneck</p>
                )}
              </div>
            </div>

            {/* Arrow */}
            {idx < pipelineStages.length - 1 && (
              <div className="flex-shrink-0 pt-8">
                <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-4">
        The Interview stage is currently the bottleneck. Consider adding more interview slots or streamlining the process.
      </p>
    </div>
  );
}
