import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const suggestionsByRoute: Record<string, { title: string; action: string }[]> = {
  "/company": [
    { title: "Summarize today's priorities", action: "You have 5 high-priority tasks. Start with 'Review 7 new resumes'." },
    { title: "Identify hiring bottleneck", action: "The 'Interview' stage is currently the bottleneck. Consider adding more interview slots." },
  ],
  "/company/candidates": [
    { title: "Summarize Priya Sharma", action: "Priya has 96% match, strong React skills, missing Docker. Recommendation: Schedule interview." },
    { title: "Compare top candidates", action: "Arun Kumar and Rahul Mehta are the top two. Arun has better AI match." },
  ],
  "/company/jobs": [
    { title: "Optimize job descriptions", action: "The ML Engineer role receives many applications but few qualified. Consider adjusting required skills." },
  ],
  "/recruiter": [
    { title: "Prioritize my tasks", action: "Start with 'Review 7 new resumes', then 'Schedule 3 interviews'." },
  ],
  "/recruiter/candidates": [
    { title: "Evaluate Priya Sharma", action: "Strong frontend skills, 5 years experience. She is ready for interview." },
  ],
  default: [
    { title: "Analyze this page", action: "I can help you review candidates, schedule interviews, or compare applicants." },
  ],
};

export function FloatingAI() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const routeSuggestions = suggestionsByRoute[router.pathname] || suggestionsByRoute.default;

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center"
        title="AI Assistant"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">RakNova AI Assistant</h3>
              <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-gray-100">
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              {routeSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  className="w-full text-left p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-200"
                >
                  <p className="text-sm font-medium text-gray-900">{suggestion.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{suggestion.action}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
