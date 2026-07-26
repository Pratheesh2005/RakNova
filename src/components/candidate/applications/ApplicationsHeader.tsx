import { motion } from "framer-motion";
import { applications } from "@/data/candidate/applications";

export function ApplicationsHeader() {
  const total = applications.length;
  const active = applications.filter((a) => a.currentStage !== "Rejected" && a.currentStage !== "Hired").length;
  const interviews = applications.filter((a) => a.currentStage === "Technical Round" || a.currentStage === "Manager Round" || a.currentStage === "HR Discussion").length;
  const offers = applications.filter((a) => a.currentStage === "Offer" || a.currentStage === "Hired").length;

  const stats = [
    { label: "Total Applications", value: total, color: "text-brand-600", bg: "bg-brand-50" },
    { label: "Active Applications", value: active, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Interviews Scheduled", value: interviews, color: "text-green-600", bg: "bg-green-50" },
    { label: "Offers Received", value: offers, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full translate-y-1/3 -translate-x-1/4" />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="0.8" fill="white" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative z-10">
        <h1 className="text-2xl md:text-3xl font-bold">My Applications</h1>
        <p className="mt-2 text-gray-400 max-w-2xl">
          Track every application, understand your hiring progress, and let AI guide your next move.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
