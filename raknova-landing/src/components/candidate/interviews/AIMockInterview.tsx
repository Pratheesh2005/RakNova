const mockTypes = [
  { icon: "💻", label: "Technical Interview", desc: "Practice coding and system design", status: "coming-soon" },
  { icon: "🤝", label: "HR Interview", desc: "Practice behavioral questions", status: "coming-soon" },
  { icon: "⚡", label: "Coding Interview", desc: "Solve DSA problems live", status: "coming-soon" },
  { icon: "🎯", label: "Behavioral Interview", desc: "Practice STAR method answers", status: "coming-soon" },
  { icon: "🎤", label: "Voice Practice", desc: "Record and review your answers", status: "coming-soon" },
  { icon: "📹", label: "Video Practice", desc: "Practice with virtual interviewer", status: "coming-soon" },
];

export function AIMockInterview() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-brand-100 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI Mock Interview</h3>
          <p className="text-xs text-purple-600 font-medium">Coming Soon</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {mockTypes.map((mock) => (
          <button
            key={mock.label}
            disabled
            className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl border border-gray-100 text-center opacity-60 cursor-not-allowed hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl">{mock.icon}</span>
            <p className="text-sm font-semibold text-gray-900">{mock.label}</p>
            <p className="text-xs text-gray-500">{mock.desc}</p>
          </button>
        ))}
      </div>

      <div className="mt-4 p-3 bg-purple-50 rounded-xl text-center">
        <p className="text-sm text-purple-700">
          🚀 AI Mock Interviews will be available in the next update. Practice with real-time AI feedback.
        </p>
      </div>
    </div>
  );
}
