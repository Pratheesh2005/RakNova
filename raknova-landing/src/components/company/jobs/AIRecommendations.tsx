import { Button } from "@/components/ui/Button";
import { aiInsightsForJobs } from "@/data/company/jobs";

export function AIRecommendations() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h2>
      <div className="space-y-5">
        {aiInsightsForJobs.map((insight, idx) => (
          <div key={idx} className="border-l-4 border-blue-500 pl-4">
            <p className="text-sm font-semibold text-gray-900">{insight.observation}</p>
            <p className="text-xs text-gray-500 mt-1">{insight.reason}</p>
            <p className="text-xs text-gray-700 mt-2 font-medium">Recommendation: {insight.recommendation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
