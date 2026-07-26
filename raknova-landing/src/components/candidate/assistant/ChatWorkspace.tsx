import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AssistantType } from "@/data/candidate/assistant";

interface Message {
  role: "user" | "ai";
  text: string;
  time: string;
}

interface ChatWorkspaceProps {
  assistant: AssistantType;
  onClose: () => void;
}

export function ChatWorkspace({ assistant, onClose }: ChatWorkspaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: `Hello! I'm your ${assistant.title}. ${assistant.description} How can I help you today?`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { role: "user", text, time: now }]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        "career-coach": "Based on your profile analysis, I recommend focusing on Cloud Computing and MLOps over the next 3 months. Your Python skills are strong, but adding Docker and Kubernetes will make you significantly more employable. Here's a suggested roadmap:\n\n1. Month 1-2: Docker & Containerization\n2. Month 3-4: Kubernetes Basics\n3. Month 5-6: AWS Services & MLOps\n\nWould you like me to create a detailed weekly plan?",
        "resume-expert": "I've analyzed your resume. Your ATS score is 89% — excellent! Here are specific improvements:\n\n✅ Strengths: Clear formatting, good action verbs, quantified achievements\n⚠️ Improvements:\n- Add Docker & Kubernetes to skills section\n- Include your RakNova project with metrics\n- Rewrite summary to be more role-specific\n\nWould you like me to rewrite your professional summary?",
        "job-advisor": "Based on your profile (ML skills, Python expert, 85% match), I recommend applying for these roles:\n\n1. ML Engineer at Google — 92% match\n2. Data Scientist at Amazon — 88% match\n3. AI Engineer at Microsoft — 85% match\n\nYour strongest differentiator is your end-to-end project experience. Highlight that in your applications.",
        "interview-mentor": "Let's practice! I'll ask you a common ML Engineer interview question:\n\n'Explain the bias-variance tradeoff and how you handle it in practice.'\n\nTake your time to answer. I'll provide feedback on your response structure, technical accuracy, and communication clarity.",
      };

      const responseText = responses[assistant.id] || "That's an excellent question. Let me analyze your profile and provide a detailed response tailored to your career goals.";

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: responseText, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
      ]);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-2xl border border-gray-200 shadow-2xl flex flex-col h-[700px] overflow-hidden"
    >
      {/* Header */}
      <div className={`flex items-center justify-between p-5 border-b border-gray-100 bg-gradient-to-r ${assistant.gradient} text-white`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl">{assistant.icon}</div>
          <div>
            <h3 className="font-bold">{assistant.title}</h3>
            <p className="text-xs text-white/70">{assistant.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">Export</Button>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] ${msg.role === "user" ? "order-1" : ""}`}>
              <div className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                  msg.role === "ai" ? assistant.bgColor : "bg-gray-200"
                }`}>
                  {msg.role === "ai" ? assistant.icon : "👤"}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-brand-600 text-white rounded-br-md"
                    : "bg-white text-gray-900 rounded-bl-md border border-gray-100 shadow-sm"
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <p className={`text-xs mt-2 ${msg.role === "user" ? "text-brand-200" : "text-gray-400"}`}>{msg.time}</p>
                </div>
              </div>
              {msg.role === "ai" && (
                <div className="flex gap-2 mt-1 ml-10">
                  <button className="text-xs text-gray-400 hover:text-gray-600">📋 Copy</button>
                  <button className="text-xs text-gray-400 hover:text-gray-600">💾 Save</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Prompts */}
      <div className="px-5 py-2 border-t border-gray-100 bg-white flex gap-2 overflow-x-auto">
        {assistant.examplePrompts.slice(0, 3).map((prompt, i) => (
          <button
            key={i}
            onClick={() => sendMessage(prompt)}
            className="px-3 py-1.5 text-xs border border-gray-200 rounded-full hover:border-brand-300 hover:bg-brand-50 transition-colors whitespace-nowrap text-gray-600"
          >
            💡 {prompt}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder={`Ask your ${assistant.title} anything...`}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
          />
          <Button variant="primary" size="md" onClick={() => sendMessage(input)}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
