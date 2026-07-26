import { motion } from "framer-motion";
import { applications } from "@/data/candidate/applications";

export function AICareerProgress() {
  const total = applications.length;
  const interviews = applications.filter((a) =>
    ["Technical Round", "Manager Round", "HR Discussion", "Offer", "Hired"].includes(a.currentStage)
  ).length;
  const interviewRate = total > 0 ? Math.round((interviews / total) * 100) : 0;
  const avgMatch = Math.round(applications.reduce((sum, a) => sum + a.aiMatch, 0) / total);
  const offers = applications.filter((a) => a.currentStage === "Offer" || a.currentStage === "Hired").length;
  const offerProb = total > 0 ? Math.round((offers / total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-2xl border border-gray-100 p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-brand-100 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">RakNova AI Career Progress</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gradient-to-br from-brand-50 to-brand-100/50 rounded-xl">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Applications Sent</p>
          <p className="text-3xl font-bold text-brand-700 mt-1">{total}</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Interview Rate</p>
          <p className="text-3xl font-bold text-green-700 mt-1">{interviewRate}%</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Offer Probability</p>
          <p className="text-3xl font-bold text-purple-700 mt-1">{offerProb}%</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Average AI Match</p>
          <p className="text-3xl font-bold text-blue-700 mt-1">{avgMatch}%</p>
        </div>
      </div>

      {/* Hiring Momentum */}
      <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">Current Hiring Momentum</p>
            <p className="text-2xl font-bold text-green-700 mt-1">High 🚀</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
