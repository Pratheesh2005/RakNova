import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";

const skillData = [
  { name: "React", level: 90, demand: "High" },
  { name: "TypeScript", level: 85, demand: "High" },
  { name: "Next.js", level: 80, demand: "High" },
  { name: "Tailwind CSS", level: 88, demand: "Medium" },
  { name: "Node.js", level: 65, demand: "High" },
  { name: "GraphQL", level: 45, demand: "Medium" },
  { name: "Docker", level: 30, demand: "High" },
  { name: "AWS", level: 25, demand: "High" },
];

const learningRecommendations = [
  "Complete AWS Solutions Architect certification",
  "Build a full-stack project with GraphQL",
  "Learn Docker containerization for deployment",
  "Practice system design interviews",
];

export function SkillAnalytics() {
  return (
    <div className="space-y-6">
      {/* Skill Strength */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Strength</h3>
        <div className="space-y-4">
          {skillData.map((skill) => (
            <div key={skill.name} className="flex items-center gap-4">
              <div className="w-32 flex-shrink-0">
                <span className="text-sm font-medium text-gray-700">{skill.name}</span>
              </div>
              <div className="flex-1">
                <ProgressBar value={skill.level} size="sm" showPercentage={false} color={skill.level >= 70 ? "green" : skill.level >= 40 ? "yellow" : "red"} />
              </div>
              <Badge variant={skill.demand === "High" ? "success" : "default"} size="sm">{skill.demand} Demand</Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Recommendations */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 Learning Recommendations</h3>
        <div className="space-y-3">
          {learningRecommendations.map((rec, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-brand-50 rounded-xl">
              <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-semibold text-sm flex-shrink-0">
                {idx + 1}
              </div>
              <p className="text-sm text-gray-700">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Job Readiness Score */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-800 rounded-2xl p-6 text-white">
        <h3 className="text-lg font-semibold">Job Readiness Score</h3>
        <div className="mt-4 flex items-center gap-4">
          <div className="w-20 h-20 rounded-full border-4 border-white/30 flex items-center justify-center">
            <span className="text-3xl font-bold">72</span>
          </div>
          <div>
            <p className="text-brand-100">Your profile matches 72% of job requirements in your target role.</p>
            <p className="text-sm text-brand-200 mt-1">Improve your score by adding missing skills and certifications.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
