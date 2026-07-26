import { learningSuggestions } from "@/data/recruiter/myWorkInsights";

export function LearningSuggestions() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Learning Suggestions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {learningSuggestions.map((suggestion, idx) => (
          <div
            key={idx}
            className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-700"
          >
            {suggestion}
          </div>
        ))}
      </div>
    </div>
  );
}
