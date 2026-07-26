import { motion } from "framer-motion";

const questions = [
  "How do I improve my resume ATS score?",
  "Which internship should I apply for?",
  "Explain Kubernetes in simple terms",
  "Review my LinkedIn profile for improvements",
  "Practice HR interview questions with me",
  "Create a 3-month study plan for AI/ML",
  "What's the best career path for AI/ML freshers?",
  "How do I negotiate salary as a fresher?",
  "Should I pursue MS or get a job first?",
  "What projects should I add to my portfolio?",
];

interface SuggestedQuestionsProps {
  onAsk: (question: string) => void;
}

export function SuggestedQuestions({ onAsk }: SuggestedQuestionsProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">💬</span>
        <h3 className="text-lg font-semibold text-gray-900">AI Suggested Questions</h3>
      </div>

      <div className="space-y-2">
        {questions.map((q, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.04 }}
            viewport={{ once: true }}
            onClick={() => onAsk(q)}
            className="w-full text-left p-3 bg-gray-50 rounded-xl text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-all border border-transparent hover:border-brand-200 flex items-center gap-2 group"
          >
            <svg
              className="w-4 h-4 text-gray-400 group-hover:text-brand-500 flex-shrink-0 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            {q}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
