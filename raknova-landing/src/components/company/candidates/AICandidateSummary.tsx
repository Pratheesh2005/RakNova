import { Candidate } from "@/data/company/candidates";

interface AICandidateSummaryProps {
  candidate: Candidate;
}

export function AICandidateSummary({ candidate }: AICandidateSummaryProps) {
  const { aiSummary, aiMatch } = candidate;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">AI Candidate Summary</h3>
        <span className="text-2xl font-bold text-blue-600">{aiMatch}%</span>
      </div>
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm font-medium text-blue-800">{aiSummary.recommendation}</p>
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase mb-2">Strengths</p>
        <ul className="space-y-1">
          {aiSummary.strengths.map((s, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
              <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {s}
            </li>
          ))}
        </ul>
      </div>
      {aiSummary.concerns.length > 0 && (
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase mb-2">Potential Concerns</p>
          <ul className="space-y-1">
            {aiSummary.concerns.map((c, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <svg className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
