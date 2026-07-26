const features = [
  { icon: "💰", label: "AI Salary Prediction", desc: "Get salary estimates based on your skills and market data" },
  { icon: "📈", label: "Market Demand", desc: "See which skills are trending in your industry" },
  { icon: "🔎", label: "Skill Gap Analysis", desc: "Identify skills you need for your target roles" },
  { icon: "🚀", label: "Career Growth Forecast", desc: "AI-powered career trajectory predictions" },
];

export function ComingSoonAI() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-brand-100 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI-Powered Insights</h3>
          <p className="text-xs text-purple-600 font-medium">Coming Soon</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {features.map((feature) => (
          <div key={feature.label} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 opacity-60">
            <span className="text-2xl flex-shrink-0">{feature.icon}</span>
            <div>
              <p className="text-sm font-semibold text-gray-900">{feature.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
