import { PipelineCandidate, pipelineStages } from "@/data/company/pipeline";
import { TrendBadge } from "@/components/company/shared/TrendBadge";

interface PipelineOverviewProps {
  candidates: PipelineCandidate[];
}

export function PipelineOverview({ candidates }: PipelineOverviewProps) {
  // For demo, static changes; could be derived from previous state
  const stageCounts = pipelineStages.map((stage) => ({
    label: stage,
    count: candidates.filter((c) => c.stage === stage).length,
    change: Math.floor(Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1), // random demo change
  }));

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {stageCounts.map((s) => (
        <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900">{s.count}</p>
            <TrendBadge change={s.change} />
          </div>
          <p className="text-xs text-gray-500 mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
