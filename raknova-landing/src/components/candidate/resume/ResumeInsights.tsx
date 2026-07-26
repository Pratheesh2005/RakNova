const insights = [
  { type: "positive" as const, text: "Resume looks professional and well-structured" },
  { type: "positive" as const, text: "Good formatting with consistent spacing" },
  { type: "positive" as const, text: "Strong technical skills section" },
  { type: "positive" as const, text: "Work experience is clearly presented" },
  { type: "warning" as const, text: "Add more quantifiable projects" },
  { type: "warning" as const, text: "Include relevant certifications" },
  { type: "warning" as const, text: "Improve professional summary with metrics" },
];

export function ResumeInsights() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Insights</h3>
      <div className="space-y-2">
        {insights.map((insight, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
            {insight.type === "positive" ? (
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : (
              <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3.5 h-3.5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            )}
            <span className="text-sm text-gray-700">{insight.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
