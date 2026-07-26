import { motion } from "framer-motion";

export function WelcomeBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-brand-700 via-brand-600 to-accent-500 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden"
    >
      {/* Abstract AI particles / grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-white rounded-full translate-y-1/3" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white rounded-full" />
        {/* Grid dots */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-medium">
              ⚡ AI-Powered
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome back, John! 👋
          </h1>
          <p className="mt-2 text-brand-100 max-w-lg">
            You have <span className="font-semibold text-white">5 new AI job matches</span> today. 
            Keep building your professional profile to increase your match rate.
          </p>
        </div>

        {/* Target icon / AI badge */}
        <div className="hidden md:flex items-center justify-center w-20 h-20 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex-shrink-0">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
