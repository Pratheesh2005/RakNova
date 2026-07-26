interface AIReviewSummaryProps {
  aiSummary: {
    strengths: string[];
    concerns: string[];
    recommendedAction: string;
  };
}

export function AIReviewSummary({ aiSummary }: AIReviewSummaryProps) {
  return (
    <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
      <h3 className="text-sm font-semibold text-gray-900">AI Summary</h3>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase mb-1">Strengths</p>
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
          <p className="text-xs font-medium text-gray-500 uppercase mb-1">Concerns</p>
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
      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
        <p className="text-xs font-medium text-green-800">Recommended Action: {aiSummary.recommendedAction}</p>
      </div>
    </div>
  );
}
