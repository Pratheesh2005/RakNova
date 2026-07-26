import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { careerPredictions } from "@/data/candidate/skills";
import { cn } from "@/utils/cn";

export function AICareerPrediction() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-xl">🔮</span>
        <h3 className="text-lg font-semibold text-gray-900">AI Career Prediction</h3>
      </div>

      <div className="mb-5 p-4 bg-gradient-to-r from-brand-50 to-purple-50 rounded-xl">
        <p className="text-sm text-gray-500">Current Career</p>
        <p className="text-lg font-bold text-gray-900">AI/ML Student</p>
      </div>

      <div className="space-y-3">
        {careerPredictions.map((career, idx) => (
          <motion.div
            key={career.role}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06 }}
            viewport={{ once: true }}
            className={cn(
              "p-4 rounded-xl border transition-all",
              idx === 0 ? "bg-brand-50 border-brand-200" : "bg-gray-50 border-gray-100 hover:border-gray-200"
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">{career.role}</span>
                {idx === 0 && <Badge variant="success" size="sm">Best Match</Badge>}
              </div>
              <span className="text-sm font-bold text-brand-600">{career.confidence}%</span>
            </div>
            <ProgressBar value={career.confidence} size="sm" color={idx === 0 ? "brand" : "yellow"} showPercentage={false} />
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              <span>💰 {career.salary}</span>
              <span>•</span>
              <span>📊 Demand: {career.demand}</span>
              <span>•</span>
              <span>🎯 Skills: {career.skillsMatch}%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
