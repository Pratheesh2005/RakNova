import { CandidateReviewData } from "@/data/recruiter/candidateReview";

interface ActivityHistoryProps {
  history: CandidateReviewData["activityHistory"];
}

export function ActivityHistory({ history }: ActivityHistoryProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity History</h2>
      <div className="relative">
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200" />
        <div className="space-y-4">
          {history.map((entry, idx) => (
            <div key={idx} className="relative pl-10">
              <div className="absolute left-0 top-0 w-6 h-6 bg-blue-100 border-2 border-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900">{entry.action}</p>
                <p className="text-xs text-gray-500">{entry.detail}</p>
                <p className="text-xs text-gray-400 mt-1">{entry.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
