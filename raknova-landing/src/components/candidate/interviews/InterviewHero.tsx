import { motion } from "framer-motion";
import { allInterviews } from "@/data/candidate/interviews";

export function InterviewHero() {
  const upcoming = allInterviews.filter((i) => i.status === "upcoming").length;
  const completed = allInterviews.filter((i) => i.status === "completed").length;
  const offers = allInterviews.filter((i) => i.status === "completed" && (i.score ?? 0) >= 80).length;
  const avgScore = Math.round(
    allInterviews
      .filter((i) => i.score)
      .reduce((sum, i) => sum + (i.score ?? 0), 0) /
      Math.max(allInterviews.filter((i) => i.score).length, 1)
  );

  const stats = [
    { label: "Upcoming Interviews", value: upcoming, color: "text-brand-600", bg: "bg-brand-50", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { label: "Completed", value: completed, color: "text-green-600", bg: "bg-green-50", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "Offers Waiting", value: offers, color: "text-purple-600", bg: "bg-purple-50", icon: "M9 12l2 2 4-4M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
    { label: "Avg Interview Score", value: `${avgScore}%`, color: "text-yellow-600", bg: "bg-yellow-50", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-500 rounded-full translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="relative z-10">
        <h1 className="text-2xl md:text-3xl font-bold">Interview Center</h1>
        <p className="mt-2 text-gray-400 max-w-2xl">
          Manage every interview, prepare smarter with AI, and maximize your chances of getting hired.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className={`w-8 h-8 ${stat.bg} rounded-lg flex items-center justify-center mb-2`}>
                <svg className={`w-4 h-4 ${stat.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
