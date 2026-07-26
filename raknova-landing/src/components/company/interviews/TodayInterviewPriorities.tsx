import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { interviewPriorities } from "@/data/company/interviews";
import { cn } from "@/utils/cn";

const priorityStyles: Record<string, string> = {
  High: "bg-red-50 text-red-700 border-red-200",
  Medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
};

export function TodayInterviewPriorities() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Interview Priorities</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {interviewPriorities.map((task, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col justify-between hover:shadow-sm transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="default" className={cn("text-xs font-medium", priorityStyles[task.priority])}>
                  {task.priority}
                </Badge>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{task.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{task.description}</p>
            </div>
            <div className="mt-4">
              <Button variant="primary" size="sm">{task.actionLabel}</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
