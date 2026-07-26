import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const recommendations = [
  { type: "Course", title: "Docker & Kubernetes Masterclass", provider: "Udemy", difficulty: "Beginner", duration: "12 hours", priority: "Critical", icon: "🎓" },
  { type: "Book", title: "Designing Data-Intensive Applications", provider: "O'Reilly", difficulty: "Advanced", duration: "4 weeks", priority: "High", icon: "📖" },
  { type: "Certification", title: "AWS Solutions Architect Associate", provider: "AWS", difficulty: "Intermediate", duration: "8 weeks", priority: "Critical", icon: "📜" },
  { type: "Project", title: "End-to-End MLOps Pipeline", provider: "Self-Guided", difficulty: "Advanced", duration: "3 weeks", priority: "High", icon: "🔧" },
  { type: "Practice", title: "LeetCode SQL Problems", provider: "LeetCode", difficulty: "Intermediate", duration: "1 week", priority: "Medium", icon: "💻" },
  { type: "Course", title: "System Design for ML Engineers", provider: "Educative", difficulty: "Advanced", duration: "6 hours", priority: "High", icon: "🎓" },
];

const priorityColors = { Critical: "bg-red-100 text-red-700", High: "bg-orange-100 text-orange-700", Medium: "bg-yellow-100 text-yellow-700" };
const difficultyColors = { Beginner: "bg-green-100 text-green-700", Intermediate: "bg-yellow-100 text-yellow-700", Advanced: "bg-red-100 text-red-700" };

export function LearningRecommendations() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 AI Learning Recommendations</h3>
      <div className="space-y-3">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <span className="text-2xl flex-shrink-0">{rec.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold text-gray-900">{rec.title}</p>
                <Badge variant="default" size="sm" className={priorityColors[rec.priority as keyof typeof priorityColors]}>{rec.priority}</Badge>
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                <span>{rec.provider}</span>
                <span>•</span>
                <Badge variant="default" size="sm" className={difficultyColors[rec.difficulty as keyof typeof difficultyColors]}>{rec.difficulty}</Badge>
                <span>•</span>
                <span>⏱️ {rec.duration}</span>
              </div>
            </div>
            <Button variant="outline" size="sm">Start</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
