import { aiSuggestions } from "@/data/recruiter/dashboard";

export function AITaskSuggestions() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Task Suggestions</h2>
      <div className="space-y-4">
        {aiSuggestions.map((item, idx) => (
          <div key={idx} className="border-l-4 border-blue-500 pl-4">
            <p className="text-sm font-semibold text-gray-900">{item.observation}</p>
            <p className="text-xs text-gray-500 mt-1">{item.reason}</p>
            <p className="text-xs text-gray-700 mt-2 font-medium">Recommended Action: {item.recommendedAction}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
