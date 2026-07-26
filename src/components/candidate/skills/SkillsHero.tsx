import { motion } from "framer-motion";

const stats = [
  { label: "Overall Skill Score", value: "87/100", color: "text-brand-600", bg: "bg-brand-50", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { label: "Career Readiness", value: "85%", color: "text-green-600", bg: "bg-green-50", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { label: "AI Employability", value: "91/100", color: "text-purple-600", bg: "bg-purple-50", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547" },
  { label: "Skills Completed", value: "18/23", color: "text-yellow-600", bg: "bg-yellow-50", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
];

export function SkillsHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-brand-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-500 rounded-full translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="relative z-10">
        <h1 className="text-2xl md:text-3xl font-bold">Skill Analytics & Career Intelligence</h1>
        <p className="mt-2 text-gray-400 max-w-2xl">
          Understand your strengths, identify skill gaps, and build the career path recommended by RakNova AI.
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
