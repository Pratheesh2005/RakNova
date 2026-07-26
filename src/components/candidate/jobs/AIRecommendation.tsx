import { SavedJob } from "@/data/candidate/savedJobs";

interface AIRecommendationProps {
  job: SavedJob;
}

export function AIRecommendation({ job }: AIRecommendationProps) {
  return (
    <div className="bg-gradient-to-r from-brand-50/50 to-purple-50/50 rounded-xl p-4 border border-brand-100">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm">🤖</span>
        <p className="text-sm font-semibold text-gray-900">Why Save This Job</p>
      </div>

      <div className="space-y-2">
        {job.aiInsights.skillMatches.map((skill, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Matches your {skill} skills
          </div>
        ))}

        <div className="flex items-center gap-2 text-sm text-gray-700">
          {job.aiInsights.resumeSuitable ? (
            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-yellow-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {job.aiInsights.resumeSuitable ? "Resume score is suitable" : "Improve resume for this role"}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <svg className="w-4 h-4 text-brand-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          High hiring probability: {job.aiInsights.hiringProbability}
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-brand-200/50">
        <p className="text-xs text-brand-700 font-medium">💡 {job.aiInsights.recommendedAction}</p>
      </div>
    </div>
  );
}
