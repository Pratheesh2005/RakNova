import { CommunicationHistoryEntry } from "@/data/recruiter/candidateCommunication";

interface CommunicationTimelineProps {
  candidateName: string;
  history: CommunicationHistoryEntry[];
  onClose: () => void;
}

export function CommunicationTimeline({ candidateName, history, onClose }: CommunicationTimelineProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Communication History — {candidateName}</h3>
        <button onClick={onClose} className="text-sm text-blue-600 hover:text-blue-800 font-medium">Close</button>
      </div>
      <div className="relative">
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200" />
        <div className="space-y-4">
          {history.map((entry, idx) => (
            <div key={idx} className="relative pl-10">
              <div className={`absolute left-0 top-0 w-6 h-6 rounded-full flex items-center justify-center ${
                entry.status === "sent" ? "bg-blue-100 border-2 border-blue-500" :
                entry.status === "received" ? "bg-green-100 border-2 border-green-500" :
                "bg-yellow-100 border-2 border-yellow-500"
              }`}>
                {entry.status === "sent" && (
                  <svg className="w-3 h-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
                {entry.status === "received" && (
                  <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900">{entry.type}</p>
                <p className="text-xs text-gray-600 mt-0.5">{entry.description}</p>
                <p className="text-xs text-gray-400 mt-1">{entry.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
