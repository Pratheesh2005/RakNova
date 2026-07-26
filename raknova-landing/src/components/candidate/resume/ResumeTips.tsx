const tips = [
  "Keep to one page for maximum impact",
  "Add measurable achievements with numbers",
  "Use ATS-friendly format with standard fonts",
  "Include your GitHub profile link",
  "Add LinkedIn profile for networking",
  "Mention relevant projects with live demos",
  "Use action verbs like 'built', 'led', 'optimized'",
  "Tailor resume for each job application",
];

export function ResumeTips() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Resume Tips</h3>
      <div className="space-y-2">
        {tips.map((tip, idx) => (
          <div key={idx} className="flex items-start gap-3 p-2 hover:bg-brand-50/50 rounded-lg transition-colors">
            <svg className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm text-gray-700">{tip}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
