import { todaySchedule } from "@/data/company/dashboard";

const typeIcons: Record<string, React.ReactNode> = {
  Interview: (
    <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Meeting: (
    <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  "Offer Discussion": (
    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Assessment: (
    <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
};

export function TodaySchedule() {
  return (
    <div className="bg-white rounded-xl border border-gray-100">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
      </div>
      <div className="divide-y divide-gray-50">
        {todaySchedule.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">No events scheduled for today.</div>
        ) : (
          todaySchedule.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-gray-50/50 transition-colors">
              <div className="w-1 h-10 bg-blue-500 rounded-full flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{item.title}</p>
                {item.candidate && (
                  <p className="text-xs text-gray-500">{item.candidate} {item.role ? `— ${item.role}` : ""}</p>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                {typeIcons[item.type]}
                <span>{item.type}</span>
              </div>
              <span className="text-sm text-gray-500 min-w-[80px] text-right">{item.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
