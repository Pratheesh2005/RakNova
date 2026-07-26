import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { assistants, AssistantType } from "@/data/candidate/assistant";

interface AssistantCardsProps {
  onLaunch: (assistant: AssistantType) => void;
}

export function AssistantCards({ onLaunch }: AssistantCardsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {assistants.map((assistant, idx) => (
        <motion.div
          key={assistant.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className={`bg-white rounded-2xl border ${assistant.borderColor} p-6 hover:shadow-lg transition-all duration-200 relative overflow-hidden group cursor-pointer`}
          onClick={() => onLaunch(assistant)}
        >
          {/* Background gradient */}
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${assistant.gradient} opacity-5 rounded-bl-full -translate-y-1/4 translate-x-1/4 group-hover:opacity-10 transition-opacity`} />

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 ${assistant.bgColor} rounded-2xl flex items-center justify-center text-2xl`}>
                {assistant.icon}
              </div>
              <span className={`text-xs font-medium ${assistant.color} bg-white px-2 py-1 rounded-full border ${assistant.borderColor}`}>
                {assistant.subtitle}
              </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900">{assistant.title}</h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{assistant.description}</p>

            {/* Example prompts */}
            <div className="mt-4 space-y-1.5">
              {assistant.examplePrompts.slice(0, 3).map((prompt, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  {prompt}
                </div>
              ))}
            </div>

            <Button variant="primary" size="sm" className="mt-5">
              Launch Assistant
              <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
