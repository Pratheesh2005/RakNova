import { useState } from "react";
import { Button } from "@/components/ui/Button";

const suggestions = [
  "Improve my resume",
  "Find matching jobs",
  "Explain this job description",
  "Suggest missing skills",
  "Prepare interview questions",
];

export function AICareerAssistant() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hello John! 👋 I'm your AI Career Assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages([...messages, { role: "user", text }]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      let response = "That's a great question! Let me analyze your profile...";
      if (text.toLowerCase().includes("resume")) response = "I've analyzed your resume. Your ATS score is 78%. I suggest adding more quantifiable achievements and industry-specific keywords like 'Agile' and 'CI/CD'. Would you like me to show specific improvements?";
      else if (text.toLowerCase().includes("skill")) response = "Based on your target jobs, I recommend adding these skills: Docker, GraphQL, and AWS. These appear in 85% of job descriptions matching your profile.";
      else if (text.toLowerCase().includes("interview")) response = "For your TechCorp interview, I suggest preparing for: 1) React hooks and performance optimization, 2) System design for scalable frontends, 3) Behavioral questions about team leadership.";
      setMessages((prev) => [...prev, { role: "ai", text: response }]);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 flex flex-col h-[600px]">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">🤖 AI Career Assistant</h3>
        <p className="text-sm text-gray-500">Powered by RakNova AI</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
              msg.role === "user"
                ? "bg-brand-600 text-white rounded-br-md"
                : "bg-gray-100 text-gray-900 rounded-bl-md"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      <div className="px-4 py-2 flex flex-wrap gap-2 border-t border-gray-50">
        {suggestions.slice(0, 4).map((s) => (
          <button key={s} onClick={() => sendMessage(s)} className="px-3 py-1.5 text-xs border border-gray-200 rounded-full hover:border-brand-300 hover:bg-brand-50 transition-colors text-gray-600">
            💡 {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Ask me anything about your career..."
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
          />
          <Button variant="primary" size="sm" onClick={() => sendMessage(input)}>Send</Button>
        </div>
      </div>
    </div>
  );
}
