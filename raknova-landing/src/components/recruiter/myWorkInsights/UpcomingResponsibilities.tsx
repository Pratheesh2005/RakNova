import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { upcomingResponsibilities } from "@/data/recruiter/myWorkInsights";

const priorityStyles: Record<string, string> = {
  High: "bg-red-50 text-red-700",
  Medium: "bg-yellow-50 text-yellow-700",
  Low: "bg-gray-100 text-gray-600",
};

export function UpcomingResponsibilities() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Responsibilities</h2>
      <div className="space-y-3">
        {upcomingResponsibilities.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-900">{item.title}</p>
                <Badge variant="default" className={priorityStyles[item.priority]}>
                  {item.priority}
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1">Due: {item.dueDate}</p>
            </div>
            <Button variant="primary" size="sm">{item.actionLabel}</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
