import { motion } from "framer-motion";

const stats = [
  { label: "Career Readiness", value: "92%", color: "text-brand-600", bg: "bg-brand-50", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { label: "Resume Health", value: "89%", color: "text-green-600", bg: "bg-green-50", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586" },
  { label: "AI Confidence", value: "94%", color: "text-purple-600", bg: "bg-purple-50", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707" },
  { label: "Weekly Tasks", value: "3/5", color: "text-yellow-600", bg: "bg-yellow-50", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7" },
];

export function AssistantHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500 rounded-full translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl">🤖</div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">RakNova AI Career Assistant</h1>
            <p className="text-gray-400 text-sm mt-1">
              Your personal AI career coach, resume expert, interview mentor, and job advisor
            </p>
          </div>
        </div>

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
