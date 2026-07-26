import { Application } from "@/data/candidate/applications";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface OfferPredictionProps {
  application: Application;
}

export function OfferPrediction({ application }: OfferPredictionProps) {
  const { offerProbability, confidence } = application.aiInsights;

  const factors = [
    { label: "Resume Quality", value: application.aiMatch },
    { label: "Interview Performance", value: application.currentStage === "Offer" ? 95 : application.currentStage === "Technical Round" ? 75 : 60 },
    { label: "Company Hiring Speed", value: application.expectedResponse.includes("day") ? 80 : 50 },
    { label: "Skill Match", value: application.aiMatch },
  ];

  return (
    <div className="space-y-6">
      {/* Main Prediction */}
      <div className="text-center p-6 bg-gradient-to-br from-brand-50 to-purple-50 rounded-2xl border border-brand-100">
        <div className="w-24 h-24 mx-auto relative">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="10" />
            <circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="url(#offerGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 42}`}
              strokeDashoffset={`${2 * Math.PI * 42 * (1 - offerProbability / 100)}`}
            />
            <defs>
              <linearGradient id="offerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a6fff" />
                <stop offset="100%" stopColor="#6c5ce7" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-brand-700">
            {offerProbability}%
          </span>
        </div>
        <p className="text-lg font-semibold text-gray-900 mt-3">Offer Probability</p>
        <p className="text-sm text-gray-500">Confidence: {confidence}</p>
      </div>

      {/* Breakdown Factors */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Prediction Factors</h4>
        <div className="space-y-3">
          {factors.map((factor) => (
            <ProgressBar
              key={factor.label}
              label={factor.label}
              value={factor.value}
              size="sm"
              color={factor.value >= 80 ? "green" : factor.value >= 60 ? "yellow" : "red"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
