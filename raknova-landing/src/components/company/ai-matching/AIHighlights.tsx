import { RecommendedCandidate, aiHighlightsData } from "@/data/company/aiMatching";

interface AIHighlightsProps {
  candidates: RecommendedCandidate[];
}

export function AIHighlights({ candidates }: AIHighlightsProps) {
  const { highlyRecommended, excellentMatches, strongMatches, needsReview, avgMatch } = aiHighlightsData(candidates);

  const stats = [
    { label: "Highly Recommended (90%+)", value: highlyRecommended, color: "text-green-600 bg-green-50" },
    { label: "Excellent Matches (80–89%)", value: excellentMatches, color: "text-blue-600 bg-blue-50" },
    { label: "Strong Matches (70–79%)", value: strongMatches, color: "text-yellow-600 bg-yellow-50" },
    { label: "Needs Review (<70%)", value: needsReview, color: "text-red-600 bg-red-50" },
    { label: "Average Match Score", value: `${avgMatch}%`, color: "text-gray-700 bg-gray-50" },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Highlights</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`rounded-xl border border-gray-100 p-4 ${stat.color}`}>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
