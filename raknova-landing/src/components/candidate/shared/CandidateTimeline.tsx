import { cn } from "@/utils/cn";

const stages = [
  "Applied",
  "AI Screening",
  "Reviewed",
  "Shortlisted",
  "Interview",
  "Offer",
  "Hired",
];

interface CandidateTimelineProps {
  currentStage: string;
}

export function CandidateTimeline({ currentStage }: CandidateTimelineProps) {
  const currentIndex = stages.indexOf(currentStage);
  const displayIndex = currentIndex >= 0 ? currentIndex : 0;

  return (
    <div className="flex items-center space-x-1 overflow-x-auto pb-2">
      {stages.map((stage, idx) => (
        <div key={stage} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all",
                idx < displayIndex
                  ? "bg-blue-100 border-blue-500 text-blue-700"
                  : idx === displayIndex
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-gray-100 border-gray-300 text-gray-500"
              )}
            >
              {idx < displayIndex ? "✓" : idx + 1}
            </div>
            <span className="text-[10px] text-gray-500 mt-1 whitespace-nowrap">{stage}</span>
          </div>
          {idx < stages.length - 1 && (
            <div
              className={cn(
                "h-0.5 w-6 mx-1 mb-4",
                idx < displayIndex ? "bg-blue-500" : "bg-gray-300"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
