import { aiInsights } from "@/data/candidate/skills";

export function AIInsightsPanel() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">🤖 AI Career Insights</h3>
      <div className="space-y-2">
        {aiInsights.map((insight, idx) => (
          <div key={idx} className={`p-3 rounded-xl text-sm ${insight.startsWith("✔") ? "bg-green-50 text-green-800" : "bg-yellow-50 text-yellow-800"}`}>
            {insight}
          </div>
        ))}
      </div>
    </div>
  );
}
