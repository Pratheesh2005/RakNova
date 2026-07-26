import { motion } from "framer-motion";
import { candidateStats } from "@/data/candidate/dashboard";
import { cn } from "@/utils/cn";

const stats = [
  {
    label: "RakNova AI Match Score",
    value: candidateStats.aiMatchScore,
    suffix: "%",
    subtext: "Excellent match potential",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    label: "Applied Jobs",
    value: candidateStats.appliedJobs,
    suffix: "",
    subtext: "3 under review",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    label: "Interview Invitations",
    value: candidateStats.interviewInvitations,
    suffix: "",
    subtext: "2 upcoming this week",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    label: "Saved Jobs",
    value: candidateStats.savedJobs,
    suffix: "",
    subtext: "3 expiring soon",
    icon: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", stat.bgColor)}>
            <svg className={cn("w-5 h-5", stat.color)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
            </svg>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {stat.value}{stat.suffix}
          </p>
          <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          {stat.subtext && (
            <p className="text-xs text-gray-400 mt-0.5">{stat.subtext}</p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
