import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface InterviewPrepProps {
  interview: {
    type: string;
    date: string;
    time: string;
    preparationTips: string[];
    estimatedPrepTime: string;
  };
}

export function InterviewPrep({ interview }: InterviewPrepProps) {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Badge variant="success" size="md">📅 Scheduled</Badge>
          <h4 className="text-lg font-semibold text-gray-900 mt-2">{interview.type}</h4>
          <p className="text-sm text-gray-500">
            {new Date(interview.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            {" at "}{interview.time}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Est. Prep Time</p>
          <p className="text-lg font-bold text-brand-700">{interview.estimatedPrepTime}</p>
        </div>
      </div>

      {/* AI Recommended Preparation */}
      <div>
        <h5 className="text-sm font-semibold text-gray-700 mb-3">🤖 AI Recommended Preparation</h5>
        <div className="space-y-2">
          {interview.preparationTips.map((tip, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-brand-50 rounded-xl">
              <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center text-brand-700 font-semibold text-sm flex-shrink-0">
                {i + 1}
              </div>
              <span className="text-sm text-gray-700">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      <Button variant="primary" size="sm">
        Start Preparation
      </Button>
    </div>
  );
}
