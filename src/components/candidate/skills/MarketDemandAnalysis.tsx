import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";

const marketSkills = [
  { name: "Python", demand: "Extremely High", jobs: "45,000+", growth: "+35%" },
  { name: "SQL", demand: "Very High", jobs: "38,000+", growth: "+28%" },
  { name: "TensorFlow", demand: "High", jobs: "12,000+", growth: "+22%" },
  { name: "Docker", demand: "Extremely High", jobs: "32,000+", growth: "+40%" },
  { name: "AWS", demand: "Extremely High", jobs: "50,000+", growth: "+45%" },
  { name: "Kubernetes", demand: "Very High", jobs: "18,000+", growth: "+50%" },
  { name: "React", demand: "Very High", jobs: "28,000+", growth: "+20%" },
  { name: "Machine Learning", demand: "Extremely High", jobs: "25,000+", growth: "+38%" },
];

const demandColors: Record<string, string> = {
  "Extremely High": "bg-red-100 text-red-700",
  "Very High": "bg-orange-100 text-orange-700",
  High: "bg-yellow-100 text-yellow-700",
  Medium: "bg-blue-100 text-blue-700",
};

export function MarketDemandAnalysis() {
  const maxJobs = Math.max(...marketSkills.map((s) => parseInt(s.jobs.replace(/[^0-9]/g, ""))));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-5">📈 Market Demand Analysis</h3>

      <div className="space-y-3">
        {marketSkills.map((skill, idx) => {
          const jobsNum = parseInt(skill.jobs.replace(/[^0-9]/g, ""));
          const barWidth = (jobsNum / maxJobs) * 100;

          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <span className="w-32 text-sm font-medium text-gray-700 flex-shrink-0">{skill.name}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${barWidth}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full"
                />
              </div>
              <Badge variant="default" size="sm" className={demandColors[skill.demand]}>
                {skill.demand}
              </Badge>
              <span className="text-xs text-green-600 font-medium w-12 text-right">{skill.growth}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
