import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const roadmap = [
  { label: "Python", status: "completed" as const, icon: "🐍" },
  { label: "SQL", status: "completed" as const, icon: "🗄️" },
  { label: "Machine Learning", status: "completed" as const, icon: "🤖" },
  { label: "Deep Learning", status: "completed" as const, icon: "🧠" },
  { label: "Docker", status: "in-progress" as const, icon: "🐳" },
  { label: "AWS", status: "upcoming" as const, icon: "☁️" },
  { label: "MLOps", status: "upcoming" as const, icon: "⚙️" },
  { label: "AI Engineer", status: "upcoming" as const, icon: "🏆" },
];

export function LearningRoadmap() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">🗺️</span>
        <h3 className="text-lg font-semibold text-gray-900">AI Learning Roadmap</h3>
      </div>

      <div className="flex items-center gap-1 overflow-x-auto pb-4">
        {roadmap.map((step, idx) => (
          <div key={step.label} className="flex items-center gap-1 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              viewport={{ once: true }}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-2xl min-w-[110px] text-center transition-all",
                step.status === "completed"
                  ? "bg-green-50 border border-green-200"
                  : step.status === "in-progress"
                  ? "bg-brand-50 border-2 border-brand-400 shadow-md"
                  : "bg-gray-50 border border-gray-100"
              )}
            >
              <span className="text-2xl">{step.icon}</span>
              <span
                className={cn(
                  "text-xs font-semibold",
                  step.status === "completed"
                    ? "text-green-700"
                    : step.status === "in-progress"
                    ? "text-brand-700"
                    : "text-gray-500"
                )}
              >
                {step.label}
              </span>
              {step.status === "completed" && (
                <span className="text-xs text-green-600 font-medium">✓ Done</span>
              )}
              {step.status === "in-progress" && (
                <span className="text-xs text-brand-600 font-medium animate-pulse">In Progress</span>
              )}
              {step.status === "upcoming" && (
                <span className="text-xs text-gray-400">Upcoming</span>
              )}
            </motion.div>
            {idx < roadmap.length - 1 && (
              <div className="flex items-center flex-shrink-0">
                <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
