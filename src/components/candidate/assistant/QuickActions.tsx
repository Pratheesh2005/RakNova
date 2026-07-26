import { motion } from "framer-motion";
import { quickActions, AssistantType } from "@/data/candidate/assistant";

interface QuickActionsProps {
  onAction: (assistant: AssistantType, prompt: string) => void;
  assistants: AssistantType[];
}

export function QuickActions({ onAction, assistants }: QuickActionsProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((action, idx) => {
          const assistant = assistants.find((a) => a.id === action.assistantId);
          return (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => assistant && onAction(assistant, action.prompt)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all hover:shadow-md hover:scale-[1.02] ${action.color}`}
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-sm font-medium">{action.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
