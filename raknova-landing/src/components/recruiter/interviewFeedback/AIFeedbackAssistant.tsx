import { InterviewFeedbackData } from "@/data/recruiter/interviewFeedback";

interface AIFeedbackAssistantProps {
  aiAssistant: InterviewFeedbackData["aiAssistant"];
}

export function AIFeedbackAssistant({ aiAssistant }: AIFeedbackAssistantProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Feedback Assistant</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Observations</h3>
          <ul className="space-y-1">
            {aiAssistant.observations.map((obs, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {obs}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <p className="text-xs text-gray-500 uppercase mb-1">Strengths</p>
            <div className="flex flex-wrap gap-2">
              {aiAssistant.strengths.map((s) => (
                <span key={s} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">{s}</span>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 uppercase mb-1">Risks</p>
            <div className="flex flex-wrap gap-2">
              {aiAssistant.risks.map((r) => (
                <span key={r} className="px-2 py-1 bg-yellow-50 text-yellow-700 text-xs rounded-full">{r}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-800">Suggested Recommendation: {aiAssistant.suggestedAction}</p>
        </div>
      </div>
    </div>
  );
}
