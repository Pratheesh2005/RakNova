const futureFeatures = [
  { icon: "🎙️", label: "AI Voice Career Coach", desc: "Talk naturally with your personal AI career coach using voice commands" },
  { icon: "📹", label: "AI Video Interview", desc: "Practice interviews with real-time body language and speech feedback" },
  { icon: "📄", label: "Live Resume Builder", desc: "AI-assisted drag-and-drop resume creation with ATS optimization" },
  { icon: "🌐", label: "AI Portfolio Generator", desc: "Auto-generate a stunning portfolio website from your profile" },
  { icon: "💼", label: "AI LinkedIn Optimizer", desc: "Optimize every section of your LinkedIn profile for recruiters" },
  { icon: "💰", label: "AI Salary Negotiator", desc: "Practice negotiation with AI and get market-specific scripts" },
  { icon: "🤝", label: "AI Networking Coach", desc: "Learn networking strategies and get personalized connection requests" },
  { icon: "📊", label: "AI Skill Benchmarking", desc: "Compare your skills with industry peers and get targeted improvements" },
];

export function FutureAIFeatures() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🚀</span>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Coming Soon</h3>
          <p className="text-xs text-purple-600 font-medium">Next-Generation AI Career Features</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {futureFeatures.map((feature) => (
          <div
            key={feature.label}
            className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl border border-gray-100 opacity-60 text-center hover:opacity-80 transition-opacity cursor-not-allowed"
          >
            <span className="text-2xl">{feature.icon}</span>
            <p className="text-sm font-semibold text-gray-900">{feature.label}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-purple-50 rounded-xl text-center">
        <p className="text-sm text-purple-700">
          🔔 Get notified when these features launch. We're building the future of AI career coaching.
        </p>
      </div>
    </div>
  );
}
