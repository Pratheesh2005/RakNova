import { Button } from "@/components/ui/Button";
import { aiInsights } from "@/data/company/dashboard";

export function AIInsightsPanel() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Hiring Insights</h2>
      <div className="space-y-5">
        {aiInsights.map((insight, idx) => (
          <div key={idx} className="border-l-4 border-blue-500 pl-4">
            <p className="text-sm font-semibold text-gray-900">{insight.observation}</p>
            <p className="text-xs text-gray-500 mt-1">{insight.reason}</p>
            <p className="text-xs text-gray-700 mt-2 font-medium">Recommendation: {insight.recommendation}</p>
            <Button variant="outline" size="sm" className="mt-3" href={insight.actionUrl}>
              {insight.actionLabel}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
