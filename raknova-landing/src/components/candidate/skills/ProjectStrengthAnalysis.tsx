import { motion } from "framer-motion";
import { ProgressBar } from "@/components/ui/ProgressBar";

const projects = [
  { name: "RakNova", score: 95, label: "Excellent" },
  { name: "CNN Image Classifier", score: 82, label: "Good" },
  { name: "Sentiment Analysis API", score: 90, label: "Excellent" },
  { name: "Computer Vision App", score: 88, label: "Very Good" },
];

export function ProjectStrengthAnalysis() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">🔧 Project Strength Analysis</h3>
      <div className="space-y-3">
        {projects.map((project, idx) => (
          <motion.div key={project.name} initial={{ opacity: 0, y: 5 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }} viewport={{ once: true }}>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-700">{project.name}</span>
              <span className="text-xs font-medium text-green-600">{project.label}</span>
            </div>
            <ProgressBar value={project.score} size="sm" color={project.score >= 90 ? "green" : "brand"} showPercentage={false} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
