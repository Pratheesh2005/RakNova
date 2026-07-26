import { Button } from "@/components/ui/Button";

const futureFeatures = [
  { icon: "📅", label: "AI Learning Planner", desc: "Personalized weekly study schedule" },
  { icon: "📊", label: "Weekly Progress Report", desc: "Automated skill progress tracking" },
  { icon: "⚡", label: "Live Skill Benchmarking", desc: "Compare with peers in real-time" },
  { icon: "🧠", label: "AI Mentor", desc: "24/7 AI-powered career guidance" },
];

export function FutureAISkillsFeatures() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🚀</span>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Coming Soon</h3>
          <p className="text-xs text-purple-600 font-medium">AI-Powered Learning Features</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {futureFeatures.map((f) => (
          <div key={f.label} className="p-4 bg-gray-50 rounded-xl border border-gray-100 opacity-60 text-center">
            <span className="text-2xl">{f.icon}</span>
            <p className="text-sm font-semibold text-gray-900 mt-2">{f.label}</p>
            <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
