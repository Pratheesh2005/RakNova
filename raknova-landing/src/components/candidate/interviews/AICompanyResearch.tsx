import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Interview } from "@/data/candidate/interviews";

interface AICompanyResearchProps {
  research: Interview["companyResearch"];
  companyName: string;
}

export function AICompanyResearch({ research, companyName }: AICompanyResearchProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🏢</span>
          <h3 className="text-lg font-semibold text-gray-900">AI Company Research: {companyName}</h3>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-brand-600 hover:text-brand-700 font-medium"
        >
          {expanded ? "Collapse" : "Expand All"}
        </button>
      </div>

      <div className="space-y-4">
        {/* Overview */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="text-sm font-semibold text-gray-700 mb-1">📖 Overview</p>
          <p className="text-sm text-gray-600">{research.overview}</p>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 overflow-hidden"
            >
              {/* Culture */}
              <div className="p-4 bg-purple-50 rounded-xl">
                <p className="text-sm font-semibold text-purple-700 mb-1">🌟 Culture</p>
                <p className="text-sm text-purple-800">{research.culture}</p>
              </div>

              {/* Products */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">🚀 Products</p>
                <div className="flex flex-wrap gap-2">
                  {research.products.map((p, i) => (
                    <Badge key={i} variant="default" size="sm">{p}</Badge>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">💻 Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {research.techStack.map((t, i) => (
                    <Badge key={i} variant="info" size="sm">{t}</Badge>
                  ))}
                </div>
              </div>

              {/* Hiring Process */}
              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-sm font-semibold text-blue-700 mb-2">📝 Hiring Process</p>
                <div className="flex flex-wrap items-center gap-2">
                  {research.hiringProcess.map((step, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-sm text-blue-800 bg-white px-3 py-1 rounded-lg">{step}</span>
                      {i < research.hiringProcess.length - 1 && (
                        <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Interview Difficulty */}
              <div className="flex gap-4">
                <div className="flex-1 p-3 bg-yellow-50 rounded-xl">
                  <p className="text-xs text-gray-500">Interview Difficulty</p>
                  <p className="text-lg font-bold text-yellow-700">{research.interviewDifficulty}</p>
                </div>
                <div className="flex-1 p-3 bg-green-50 rounded-xl">
                  <p className="text-xs text-gray-500">Dress Code</p>
                  <p className="text-lg font-bold text-green-700">{research.dressCode}</p>
                </div>
              </div>

              {/* Recent News */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">📰 Recent News</p>
                <div className="space-y-1">
                  {research.recentNews.map((news, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-brand-500">•</span> {news}
                    </div>
                  ))}
                </div>
              </div>

              {/* Interview Tips */}
              <div className="p-4 bg-brand-50 rounded-xl">
                <p className="text-sm font-semibold text-brand-700 mb-2">💡 Interview Tips</p>
                <div className="space-y-1">
                  {research.interviewTips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-brand-800">
                      <svg className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
