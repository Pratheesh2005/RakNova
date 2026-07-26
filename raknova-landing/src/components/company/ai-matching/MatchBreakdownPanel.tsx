import { Button } from "@/components/ui/Button";
import { RecommendedCandidate } from "@/data/company/aiMatching";

interface MatchBreakdownPanelProps {
  candidate: RecommendedCandidate;
  onClose: () => void;
}

export function MatchBreakdownPanel({ candidate, onClose }: MatchBreakdownPanelProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{candidate.name} — Match Breakdown</h2>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100">
          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Overall Match */}
      <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
        <span className="text-3xl font-bold text-blue-600">{candidate.matchPercentage}%</span>
        <div>
          <p className="text-sm font-medium text-gray-900">Overall Match</p>
          <p className="text-xs text-gray-600">{candidate.recommendation}</p>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-3">
        {Object.entries(candidate.matchBreakdown).map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              <span className="font-medium">{value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${value}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Reasons */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Why AI Recommended</h3>
        <ul className="space-y-1">
          {candidate.reasons.map((reason, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
              <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {reason}
            </li>
          ))}
        </ul>
      </div>

      {/* Risks */}
      {candidate.risks.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Potential Risks</h3>
          <ul className="space-y-1">
            {candidate.risks.map((risk, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <svg className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {risk}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommended Action */}
      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
        <p className="text-sm font-medium text-green-800">Recommended Action: {candidate.recommendedAction}</p>
      </div>

      <Button variant="primary" size="sm">View Full Profile</Button>
    </div>
  );
}
