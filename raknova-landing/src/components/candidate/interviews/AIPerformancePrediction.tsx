import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface AIPerformancePredictionProps {
  interviewId: number;
}

export function AIPerformancePrediction({ interviewId }: AIPerformancePredictionProps) {
  const prediction = {
    successProbability: 88,
    confidence: "High",
    strongAreas: ["Python", "Projects", "Machine Learning", "Problem Solving"],
    weakAreas: ["Communication", "System Design", "Docker", "Leadership Examples"],
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-xl">🔮</span>
        <h3 className="text-lg font-semibold text-gray-900">AI Performance Prediction</h3>
      </div>

      {/* Success Probability */}
      <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-brand-50 to-green-50 rounded-2xl mb-5">
        <div className="relative w-20 h-20 flex-shrink-0">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="34" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <circle
              cx="40" cy="40" r="34"
              fill="none"
              stroke="url(#predGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 34}`}
              strokeDashoffset={`${2 * Math.PI * 34 * (1 - prediction.successProbability / 100)}`}
            />
            <defs>
              <linearGradient id="predGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a6fff" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-brand-700">
            {prediction.successProbability}%
          </span>
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-900">Interview Success Probability</p>
          <Badge variant="success" size="sm" className="mt-1">Confidence: {prediction.confidence}</Badge>
        </div>
      </div>

      {/* Strong Areas */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-green-700 mb-2">💪 Strong Areas</p>
        <div className="flex flex-wrap gap-2">
          {prediction.strongAreas.map((area) => (
            <Badge key={area} variant="success" size="md">{area}</Badge>
          ))}
        </div>
      </div>

      {/* Weak Areas */}
      <div>
        <p className="text-sm font-semibold text-yellow-700 mb-2">🎯 Areas to Improve</p>
        <div className="space-y-2">
          {prediction.weakAreas.map((area) => (
            <ProgressBar key={area} label={area} value={Math.floor(Math.random() * 40 + 30)} size="sm" color="yellow" />
          ))}
        </div>
      </div>
    </div>
  );
}
