import { motion } from "framer-motion";
import { careerHealth } from "@/data/candidate/assistant";

export function CareerHealthReport() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">🩺</span>
        <h3 className="text-lg font-semibold text-gray-900">AI Career Health Report</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {careerHealth.map((item, idx) => (
          <motion.div
            key={item.category}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.08 }}
            className="flex flex-col items-center p-4 bg-gray-50 rounded-2xl"
          >
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="30" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                <circle
                  cx="40" cy="40" r="30"
                  fill="none"
                  stroke={item.color}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 30}`}
                  strokeDashoffset={`${2 * Math.PI * 30 * (1 - item.score / 100)}`}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-900">
                {item.score}%
              </span>
            </div>
            <p className="text-sm font-medium text-gray-700 mt-2 text-center">{item.category}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
