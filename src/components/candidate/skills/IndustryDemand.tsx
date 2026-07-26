import { motion } from "framer-motion";

const industries = [
  { name: "Healthcare", demand: 92, color: "bg-emerald-500" },
  { name: "Finance", demand: 88, color: "bg-blue-500" },
  { name: "Manufacturing", demand: 75, color: "bg-yellow-500" },
  { name: "Automotive", demand: 70, color: "bg-orange-500" },
  { name: "Education", demand: 65, color: "bg-purple-500" },
  { name: "Cybersecurity", demand: 95, color: "bg-red-500" },
  { name: "Retail", demand: 60, color: "bg-pink-500" },
  { name: "Agriculture", demand: 45, color: "bg-green-600" },
];

export function IndustryDemand() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-5">🏭 Industry Demand for AI/ML</h3>

      <div className="space-y-3">
        {industries.map((industry, idx) => (
          <motion.div
            key={industry.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <span className="w-28 text-sm text-gray-700 flex-shrink-0">{industry.name}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${industry.demand}%` }}
                transition={{ duration: 0.8, delay: idx * 0.06 }}
                viewport={{ once: true }}
                className={`h-full ${industry.color} rounded-full`}
              />
            </div>
            <span className="text-sm font-semibold text-gray-700 w-10 text-right">{industry.demand}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
