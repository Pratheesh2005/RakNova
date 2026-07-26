import { motion } from "framer-motion";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";

const breakdown = [
  { label: "Technical Skills", value: 90, color: "brand" as const },
  { label: "Projects", value: 85, color: "green" as const },
  { label: "Education", value: 95, color: "brand" as const },
  { label: "Resume", value: 91, color: "green" as const },
  { label: "Certifications", value: 70, color: "yellow" as const },
  { label: "Communication", value: 82, color: "brand" as const },
];

export function AIEmployabilityScore() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-100 p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-brand-100 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">RakNova AI Employability Score</h3>
      </div>

      {/* Main Score Circle */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-36 h-36">
          <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e7eb" strokeWidth="12" />
            <circle
              cx="60" cy="60" r="52"
              fill="none"
              stroke="url(#employabilityGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 52}`}
              strokeDashoffset={`${2 * Math.PI * 52 * (1 - 91 / 100)}`}
            />
            <defs>
              <linearGradient id="employabilityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a6fff" />
                <stop offset="50%" stopColor="#6c5ce7" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-gray-900">91</span>
            <span className="text-sm text-gray-500">/100</span>
          </div>
        </div>
        <Badge variant="success" size="md" className="mt-3">Excellent</Badge>
        <p className="text-sm text-gray-500 mt-1">Top 8% of AI/ML Freshers</p>
      </div>

      {/* Breakdown */}
      <div className="space-y-3">
        {breakdown.map((item) => (
          <ProgressBar
            key={item.label}
            label={item.label}
            value={item.value}
            size="sm"
            color={item.color}
          />
        ))}
      </div>
    </motion.div>
  );
}
