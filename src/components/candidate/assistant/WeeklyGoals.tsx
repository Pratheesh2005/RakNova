import { weeklyGoals } from "@/data/candidate/assistant";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/utils/cn";

export function WeeklyGoals() {
  const completed = weeklyGoals.filter((g) => g.done).length;
  const total = weeklyGoals.length;
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎯</span>
          <h3 className="text-lg font-semibold text-gray-900">AI Weekly Goals</h3>
        </div>
        <span className="text-sm font-medium text-brand-600">
          {completed}/{total} completed
        </span>
      </div>

      <ProgressBar value={percentage} size="sm" color="brand" className="mb-4" />

      <div className="space-y-2">
        {weeklyGoals.map((goal, idx) => (
          <div
            key={idx}
            className={cn(
              "flex items-center gap-3 p-2.5 rounded-xl transition-all",
              goal.done ? "bg-green-50" : "bg-gray-50 hover:bg-gray-100"
            )}
          >
            <div
              className={cn(
                "w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0",
                goal.done ? "bg-green-500" : "bg-white border-2 border-gray-300"
              )}
            >
              {goal.done && (
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span
              className={cn(
                "text-sm",
                goal.done ? "text-gray-500 line-through" : "text-gray-700"
              )}
            >
              {goal.task}
            </span>
            {goal.done && (
              <span className="text-xs text-green-600 font-medium ml-auto">Done</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
