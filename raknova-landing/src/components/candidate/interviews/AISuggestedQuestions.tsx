import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

interface AISuggestedQuestionsProps {
  questions: string[];
}

export function AISuggestedQuestions({ questions }: AISuggestedQuestionsProps) {
  const [revealed, setRevealed] = useState<number[]>([]);

  const toggleReveal = (idx: number) => {
    setRevealed((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const revealAll = () => {
    setRevealed(questions.map((_, i) => i));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🤖</span>
          <h3 className="text-lg font-semibold text-gray-900">AI Suggested Questions</h3>
        </div>
        <Button variant="outline" size="sm" onClick={revealAll}>
          Reveal All
        </Button>
      </div>

      <div className="space-y-2">
        {questions.map((q, idx) => (
          <div
            key={idx}
            onClick={() => toggleReveal(idx)}
            className={cn(
              "p-3 rounded-xl border cursor-pointer transition-all",
              revealed.includes(idx)
                ? "bg-brand-50 border-brand-200"
                : "bg-gray-50 border-gray-100 hover:border-gray-200"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold flex-shrink-0",
                revealed.includes(idx) ? "bg-brand-100 text-brand-700" : "bg-gray-200 text-gray-500"
              )}>
                {idx + 1}
              </div>
              <span className={cn(
                "text-sm",
                revealed.includes(idx) ? "text-gray-900 font-medium" : "text-gray-500"
              )}>
                {revealed.includes(idx) ? q : "Click to reveal question..."}
              </span>
              {!revealed.includes(idx) && (
                <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
