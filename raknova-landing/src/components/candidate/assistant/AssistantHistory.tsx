import { assistantHistory } from "@/data/candidate/assistant";

export function AssistantHistory() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">📅</span>
        <h3 className="text-lg font-semibold text-gray-900">Assistant History</h3>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-5">
          {assistantHistory.map((day, idx) => (
            <div key={idx} className="relative pl-8">
              {/* Timeline dot */}
              <div className="absolute left-0 top-1 w-5 h-5 bg-brand-100 border-2 border-brand-500 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
              </div>

              <p className="text-sm font-semibold text-gray-700 mb-2">{day.date}</p>

              <div className="space-y-2">
                {day.sessions.map((session, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{session.title}</p>
                      <span className="text-xs text-gray-400">{session.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{session.assistant}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
