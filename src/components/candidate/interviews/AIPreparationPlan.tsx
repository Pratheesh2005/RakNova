import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const todayPlan = [
  { task: "Review Python fundamentals", done: true, time: "30 min" },
  { task: "Revise Machine Learning concepts", done: true, time: "45 min" },
  { task: "Practice SQL queries", done: false, time: "30 min" },
  { task: "Solve 3 DSA problems", done: false, time: "45 min" },
  { task: "Read Microsoft company profile", done: false, time: "15 min" },
  { task: "Mock interview practice", done: false, time: "30 min" },
];

export function AIPreparationPlan() {
  const completed = todayPlan.filter((t) => t.done).length;
  const total = todayPlan.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="bg-white rounded-2xl border border-gray-100 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">📋</span>
          <h3 className="text-lg font-semibold text-gray-900">Today's AI Preparation Plan</h3>
        </div>
        <Badge variant="info" size="sm">{completed}/{total} done</Badge>
      </div>

      <div className="space-y-2">
        {todayPlan.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
              item.done ? "bg-green-50" : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <button
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                item.done
                  ? "bg-green-500 border-green-500"
                  : "border-gray-300 hover:border-brand-400"
              }`}
            >
              {item.done && (
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <span className={`flex-1 text-sm ${item.done ? "text-gray-500 line-through" : "text-gray-700"}`}>
              {item.task}
            </span>
            <span className="text-xs text-gray-400">{item.time}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          ⏱️ Estimated time: <span className="font-semibold text-gray-700">3 Hours</span>
        </div>
        <Button variant="primary" size="sm">Regenerate Plan</Button>
      </div>
    </motion.div>
  );
}
