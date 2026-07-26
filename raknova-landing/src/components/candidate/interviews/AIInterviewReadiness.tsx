import { motion } from "framer-motion";
import { ProgressBar } from "@/components/ui/ProgressBar";

const readinessData = {
  overall: 92,
  technical: 90,
  communication: 85,
  confidence: 88,
  problemSolving: 93,
  behavioral: 80,
};

export function AIInterviewReadiness() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-2xl border border-gray-100 p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-purple-100 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">AI Interview Readiness</h3>
      </div>

      {/* Overall Score */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-gradient-to-br from-brand-50 to-purple-50 rounded-2xl">
        <div className="relative w-20 h-20 flex-shrink-0">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="34" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <circle
              cx="40" cy="40" r="34"
              fill="none"
              stroke="url(#readinessGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 34}`}
              strokeDashoffset={`${2 * Math.PI * 34 * (1 - readinessData.overall / 100)}`}
            />
            <defs>
              <linearGradient id="readinessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a6fff" />
                <stop offset="100%" stopColor="#6c5ce7" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-brand-700">
            {readinessData.overall}%
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">Overall Readiness</p>
          <p className="text-xs text-gray-500 mt-1">You're well-prepared for upcoming interviews</p>
        </div>
      </div>

      {/* Skill Breakdown */}
      <div className="space-y-3">
        {[
          { label: "Technical Knowledge", value: readinessData.technical, color: "brand" as const },
          { label: "Communication", value: readinessData.communication, color: "green" as const },
          { label: "Confidence", value: readinessData.confidence, color: "yellow" as const },
          { label: "Problem Solving", value: readinessData.problemSolving, color: "brand" as const },
          { label: "Behavioral Skills", value: readinessData.behavioral, color: "green" as const },
        ].map((skill) => (
          <ProgressBar
            key={skill.label}
            label={skill.label}
            value={skill.value}
            size="sm"
            color={skill.color}
          />
        ))}
      </div>
    </motion.div>
  );
}
