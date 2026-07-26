import { Application } from "@/data/candidate/applications";
import { Button } from "@/components/ui/Button";

interface AIInsightsPanelProps {
  application: Application;
}

export function AIInsightsPanel({ application }: AIInsightsPanelProps) {
  return (
    <div className="space-y-6">
      {/* Chances */}
      <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-brand-50 to-purple-50 rounded-2xl border border-brand-100">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
          <span className="text-2xl font-bold text-brand-600">{application.aiInsights.offerProbability}%</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
              {application.aiInsights.chances}
            </span>
            <span className="text-xs text-gray-400">Confidence: {application.aiInsights.confidence}</span>
          </div>
          <p className="text-lg font-semibold text-gray-900 mt-1">Your Chances: {application.aiInsights.chances}</p>
          <div className="mt-2 space-y-1">
            {application.aiInsights.reason.map((r, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {r}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Actions */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">💡 Recommended Actions</h4>
        <div className="space-y-2">
          {application.aiInsights.recommendedActions.map((action, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-brand-200 transition-colors">
              <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600 font-semibold text-sm flex-shrink-0">
                {i + 1}
              </div>
              <span className="text-sm text-gray-700">{action}</span>
              <Button variant="ghost" size="sm" className="ml-auto text-brand-600">Do This</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
