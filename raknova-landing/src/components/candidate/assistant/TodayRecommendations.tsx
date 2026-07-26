import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { todayRecommendations } from "@/data/candidate/assistant";

const priorityColors: Record<string, string> = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
};

export function TodayRecommendations() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">📅</span>
        <h3 className="text-lg font-semibold text-gray-900">Today's AI Recommendations</h3>
      </div>
      <div className="space-y-3">
        {todayRecommendations.map((rec, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-gradient-to-r from-brand-50/50 to-white rounded-xl border border-brand-100 hover:shadow-md transition-shadow"
          >
            <span className="text-3xl flex-shrink-0">{rec.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold text-gray-900">{rec.task}</p>
                <Badge variant="default" size="sm" className={priorityColors[rec.priority]}>
                  {rec.priority} Priority
                </Badge>
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                <span>📈 {rec.benefit}</span>
                <span>•</span>
                <span>⏱️ {rec.time}</span>
              </div>
            </div>
            <Button variant="primary" size="sm" className="flex-shrink-0">
              Start Now
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
