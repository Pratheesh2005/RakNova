import { Button } from "@/components/ui/Button";
import { companyNotifications } from "@/data/company/dashboard";

const typeIcons: Record<string, React.ReactNode> = {
  application: (
    <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  interview: (
    <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  offer: (
    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  deadline: (
    <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export function NotificationsPreview() {
  return (
    <div className="bg-white rounded-xl border border-gray-100">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
        <Button variant="ghost" size="sm" className="text-blue-600">View All</Button>
      </div>
      <div className="divide-y divide-gray-50">
        {companyNotifications.length === 0 ? (
          <p className="p-6 text-sm text-gray-500 text-center">No new notifications.</p>
        ) : (
          companyNotifications.map((notif) => (
            <div key={notif.id} className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50/50 transition-colors">
              <span className="flex-shrink-0">{typeIcons[notif.type]}</span>
              <p className="text-sm text-gray-700 flex-1 min-w-0">{notif.message}</p>
              <span className="text-xs text-gray-400 flex-shrink-0">{notif.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
