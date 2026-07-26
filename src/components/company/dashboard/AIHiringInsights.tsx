import { Button } from "@/components/ui/Button";
import { aiInsights } from "@/data/company/dashboard";

export function AIHiringInsights() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-900">AI Hiring Insights</h2>
      </div>

      <div className="space-y-4">
        {aiInsights.map((insight, idx) => (
          <div key={idx} className="p-4 rounded-xl border bg-blue-50 border-blue-200">
            <p className="text-sm font-semibold text-gray-900">{insight.observation}</p>
            <p className="text-sm text-gray-600 mt-1">{insight.reason}</p>
            <Button variant="outline" size="sm" className="mt-3" href={insight.actionUrl}>
              {insight.actionLabel}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
