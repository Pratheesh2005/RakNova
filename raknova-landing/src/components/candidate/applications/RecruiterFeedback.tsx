interface RecruiterFeedbackProps {
  feedback: {
    strengths: string[];
    improvements: string[];
  };
}

export function RecruiterFeedback({ feedback }: RecruiterFeedbackProps) {
  return (
    <div className="space-y-6">
      {/* Strengths */}
      <div>
        <h4 className="text-sm font-semibold text-green-700 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Strengths
        </h4>
        <div className="space-y-2">
          {feedback.strengths.map((s, i) => (
            <div key={i} className="flex items-center gap-2 p-3 bg-green-50 rounded-xl text-sm text-green-800">
              <span className="text-green-500">✓</span> {s}
            </div>
          ))}
        </div>
      </div>

      {/* Areas to Improve */}
      <div>
        <h4 className="text-sm font-semibold text-yellow-700 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Areas to Improve
        </h4>
        <div className="space-y-2">
          {feedback.improvements.map((imp, i) => (
            <div key={i} className="flex items-center gap-2 p-3 bg-yellow-50 rounded-xl text-sm text-yellow-800">
              <span className="text-yellow-500">→</span> {imp}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
