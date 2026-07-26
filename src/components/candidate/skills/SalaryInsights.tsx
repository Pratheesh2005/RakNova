import { motion } from "framer-motion";

const salaryData = [
  { label: "Current Estimated", value: 60, color: "bg-brand-500" },
  { label: "After AWS Cert", value: 75, color: "bg-green-500" },
  { label: "After Docker", value: 82, color: "bg-purple-500" },
  { label: "After Kubernetes", value: 90, color: "bg-indigo-500" },
  { label: "After 2 Years Exp", value: 100, color: "bg-emerald-500" },
];

export function SalaryInsights() {
  const maxValue = 100;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-5">💰 Salary Growth Insights</h3>
      <p className="text-xs text-gray-500 mb-4">Estimated salary based on skills and certifications (LPA)</p>

      <div className="space-y-4">
        {salaryData.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08 }}
            viewport={{ once: true }}
            className="space-y-1"
          >
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">{item.label}</span>
              <span className="font-semibold text-gray-900">
                ₹{((item.value / 100) * 25).toFixed(1)} LPA
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-6 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(item.value / maxValue) * 100}%` }}
                transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className={`h-full ${item.color} rounded-full flex items-center justify-end pr-3`}
              >
                <span className="text-xs text-white font-medium">
                  {item.value === 100 ? "₹25 LPA" : item.value >= 90 ? "₹22.5 LPA" : item.value >= 80 ? "₹20.5 LPA" : item.value >= 70 ? "₹18.8 LPA" : "₹15 LPA"}
                </span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
