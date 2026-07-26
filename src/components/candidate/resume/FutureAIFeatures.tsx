import { Button } from "@/components/ui/Button";

const features = [
  { icon: "🔍", label: "Analyze Resume", desc: "Deep AI analysis of your resume content" },
  { icon: "📊", label: "Generate ATS Score", desc: "See how your resume performs with ATS systems" },
  { icon: "✨", label: "Improve Resume", desc: "Get AI-powered suggestions to enhance your resume" },
  { icon: "🔎", label: "Skill Gap Analysis", desc: "Identify missing skills for your target roles" },
  { icon: "📝", label: "Generate Cover Letter", desc: "AI-generated cover letter tailored to your resume" },
  { icon: "📜", label: "Suggest Certifications", desc: "Get certification recommendations based on your profile" },
];

export function FutureAIFeatures() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-brand-100 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI-Powered Features</h3>
          <p className="text-xs text-purple-600 font-medium">Coming Soon</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {features.map((feature) => (
          <button
            key={feature.label}
            disabled
            className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 text-left opacity-60 cursor-not-allowed hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl flex-shrink-0">{feature.icon}</span>
            <div>
              <p className="text-sm font-semibold text-gray-900">{feature.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{feature.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
