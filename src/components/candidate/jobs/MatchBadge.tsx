import { cn } from "@/utils/cn";

interface MatchBadgeProps {
  percentage: number;
}

export function MatchBadge({ percentage }: MatchBadgeProps) {
  const getColor = () => {
    if (percentage >= 90) return "bg-green-50 text-green-700 border-green-200";
    if (percentage >= 70) return "bg-blue-50 text-blue-700 border-blue-200";
    if (percentage >= 50) return "bg-yellow-50 text-yellow-700 border-yellow-200";
    return "bg-gray-50 text-gray-600 border-gray-200";
  };

  return (
    <div className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-semibold", getColor())}>
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      {percentage}% Match
    </div>
  );
}
