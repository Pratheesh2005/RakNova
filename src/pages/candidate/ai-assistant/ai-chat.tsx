import { useState, useRef, useEffect } from "react";
import { CandidateLayout } from "@/components/candidate/layout/CandidateLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";
import { getApiEndpoint, smartFetch } from "@/utils/apiConfig";

interface Message {
  role: "user" | "ai";
  content: string;
  suggestedFollowups?: string[];
  relevantTopics?: string[];
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "Hello! I am your RakNova AI Career Coach. How can I assist you with resume optimization, interview preparation, or career roadmaps today?",
      suggestedFollowups: [
        "How do I optimize my resume for ATS?",
        "What questions are asked in full-stack technical interviews?",
        "How do I build a portfolio for Senior roles?"
      ],
      relevantTopics: ["ATS Optimization", "Technical Interviews", "Career Growth"]
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (userText?: string) => {
    const textToSend = userText || input;
    if (!textToSend.trim() || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: textToSend }];
    setMessages(newMessages);
    if (!userText) setInput("");
    setLoading(true);

    try {
      const payload = {
        messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
      };

      const res = await smartFetch("/ai/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setMessages([
          ...newMessages,
          {
            role: "ai",
            content: json.data.reply,
            suggestedFollowups: json.data.suggested_followups,
            relevantTopics: json.data.relevant_topics,
          },
        ]);
      } else {
        setMessages([
          ...newMessages,
          { role: "ai", content: "I encountered an issue processing your prompt. Please try asking again." },
        ]);
      }
    } catch {
      setMessages([
        ...newMessages,
        { role: "ai", content: "Could not connect to RakNova AI service." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CandidateLayout>
      <Breadcrumb items={[{ label: "AI Career Assistant" }, { label: "AI Career Chat" }]} className="mb-4" />
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">AI Career Coach Chat</h1>
            <p className="text-xs text-slate-500 mt-0.5">Real-time career guidance, resume feedback, and interview coaching</p>
          </div>
          <Badge variant="default" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-bold">
            🟢 AI Coach Active
          </Badge>
        </div>

        {/* Chat Window Container */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col h-[580px]">
          
          {/* Scrollable Message List */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex flex-col space-y-2 max-w-[85%]",
                  msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                <div
                  className={cn(
                    "p-4 rounded-2xl text-xs leading-relaxed shadow-2xs whitespace-pre-wrap",
                    msg.role === "user"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-slate-100 text-slate-900 rounded-bl-none border border-slate-200/80 font-normal"
                  )}
                >
                  {msg.content}
                </div>

                {/* Suggested Followups */}
                {msg.role === "ai" && msg.suggestedFollowups && msg.suggestedFollowups.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.suggestedFollowups.map((f, fIdx) => (
                      <button
                        key={fIdx}
                        onClick={() => handleSend(f)}
                        className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3 py-1 rounded-full transition-all text-left"
                      >
                        💡 {f}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="mr-auto p-4 bg-slate-100 rounded-2xl text-xs text-slate-500 font-medium animate-pulse flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                RakNova AI is formulating a response...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask anything about career advice, code reviews, or interview prep..."
              className="flex-1 border border-slate-300 rounded-2xl px-4 py-3 text-xs focus:ring-2 focus:ring-indigo-500 font-medium"
            />
            <Button variant="primary" size="md" loading={loading} disabled={!input.trim() || loading} onClick={() => handleSend()}>
              Send
            </Button>
          </div>

        </div>

      </div>
    </CandidateLayout>
  );
}
