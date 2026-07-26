import { Button } from "@/components/ui/Button";
import { recruiterNotifications } from "@/data/recruiter/dashboard";

export function NotificationsPreview() {
  return (
    <div className="bg-white rounded-xl border border-gray-100">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
        <Button variant="ghost" size="sm" className="text-blue-600">View All</Button>
      </div>
      <div className="divide-y divide-gray-50">
        {recruiterNotifications.map((notif, idx) => (
          <div key={idx} className="flex items-center gap-3 px-6 py-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
            <p className="text-sm text-gray-700 flex-1">{notif.message}</p>
            <span className="text-xs text-gray-400 flex-shrink-0">{notif.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
