import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const roadmapSteps = [
  { label: "Python", status: "completed" as const, icon: "🐍" },
  { label: "SQL", status: "completed" as const, icon: "🗄️" },
  { label: "Machine Learning", status: "completed" as const, icon: "🤖" },
  { label: "Deep Learning", status: "in-progress" as const, icon: "🧠" },
  { label: "Cloud (AWS)", status: "upcoming" as const, icon: "☁️" },
  { label: "MLOps", status: "upcoming" as const, icon: "⚙️" },
  { label: "Senior AI Engineer", status: "upcoming" as const, icon: "🏆" },
];

export function CareerRoadmap() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">🚀 Career Roadmap</h3>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-6">
          {roadmapSteps.map((step, idx) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="relative pl-14"
            >
              {/* Circle */}
              <div
                className={cn(
                  "absolute left-2.5 top-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm",
                  step.status === "completed"
                    ? "border-green-500 bg-green-100"
                    : step.status === "in-progress"
                    ? "border-brand-500 bg-brand-100 animate-pulse"
                    : "border-gray-300 bg-white"
                )}
              >
                {step.status === "completed" ? (
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : step.status === "in-progress" ? (
                  <div className="w-3 h-3 bg-brand-500 rounded-full" />
                ) : (
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                )}
              </div>

              {/* Content */}
              <div
                className={cn(
                  "p-3 rounded-xl transition-all",
                  step.status === "completed"
                    ? "bg-green-50"
                    : step.status === "in-progress"
                    ? "bg-brand-50 border border-brand-200"
                    : "bg-gray-50"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{step.icon}</span>
                  <span className={cn(
                    "font-semibold",
                    step.status === "completed" ? "text-green-700" : step.status === "in-progress" ? "text-brand-700" : "text-gray-500"
                  )}>
                    {step.label}
                  </span>
                  {step.status === "in-progress" && (
                    <span className="text-xs text-brand-600 font-medium ml-auto">In Progress</span>
                  )}
                  {step.status === "completed" && (
                    <span className="text-xs text-green-600 font-medium ml-auto">✓ Done</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
