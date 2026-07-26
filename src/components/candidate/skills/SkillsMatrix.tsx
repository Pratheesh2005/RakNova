import { motion } from "framer-motion";
import { skillCategories } from "@/data/candidate/skills";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/utils/cn";

const levelToValue = { Beginner: 25, Intermediate: 50, Advanced: 75, Expert: 95 };
const levelToColor = { Beginner: "red" as const, Intermediate: "yellow" as const, Advanced: "brand" as const, Expert: "green" as const };
const demandColors = {
  "Extremely High": "bg-red-100 text-red-700",
  "Very High": "bg-orange-100 text-orange-700",
  High: "bg-yellow-100 text-yellow-700",
  Medium: "bg-blue-100 text-blue-700",
  Low: "bg-gray-100 text-gray-600",
};

export function SkillsMatrix() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Skills Matrix</h3>

      <div className="space-y-6">
        {Object.entries(skillCategories).map(([category, data]) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{data.icon}</span>
              <h4 className="text-sm font-semibold text-gray-900">{category}</h4>
            </div>
            <div className="space-y-2">
              {data.skills.map((skill) => (
                <div key={skill.name} className="flex items-center gap-3">
                  <div className="w-28 flex-shrink-0">
                    <span className="text-sm text-gray-700">{skill.name}</span>
                  </div>
                  <div className="flex-1">
                    <ProgressBar
                      value={levelToValue[skill.level]}
                      size="sm"
                      color={levelToColor[skill.level]}
                      showPercentage={false}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-20 text-right">{skill.level}</span>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full w-24 text-center font-medium", demandColors[skill.demand])}>
                    {skill.demand}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
