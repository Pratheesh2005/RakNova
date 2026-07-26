import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { skillGaps } from "@/data/candidate/skills";

const priorityColors = {
  Critical: "bg-red-100 text-red-700 border-red-200",
  High: "bg-orange-100 text-orange-700 border-orange-200",
  Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
};

export function SkillGapAnalysis() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🎯</span>
            <h3 className="text-lg font-semibold text-gray-900">Skill Gap Analysis</h3>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Target Job: <span className="font-semibold text-gray-700">Machine Learning Engineer</span>
            {" • "}
            Current Match: <span className="font-semibold text-green-600">82%</span>
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {skillGaps.map((gap, idx) => (
          <motion.div
            key={gap.skill}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-gray-900">{gap.skill}</span>
                <Badge variant="default" size="sm" className={priorityColors[gap.priority]}>{gap.priority}</Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>Current: {gap.currentLevel}</span>
                <span>→</span>
                <span className="text-green-600 font-medium">Required: {gap.requiredLevel}</span>
                <span>•</span>
                <span>⏱️ {gap.estimatedTime}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">📚 {gap.learningResource}</p>
            </div>
            <Button variant="outline" size="sm">Start Learning</Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
