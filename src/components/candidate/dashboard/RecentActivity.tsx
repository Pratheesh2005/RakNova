import { recentActivities } from "@/data/candidate/dashboard";
import { formatRelativeTime } from "@/utils/formatDate";

const activityIcons: Record<string, string> = {
  application: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  view: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  interview: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  save: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z",
  match: "M13 10V3L4 14h7v7l9-11h-7z",
};

const activityColors: Record<string, string> = {
  application: "bg-blue-50 text-blue-600",
  view: "bg-purple-50 text-purple-600",
  interview: "bg-green-50 text-green-600",
  save: "bg-yellow-50 text-yellow-600",
  match: "bg-brand-50 text-brand-600",
};

export function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {recentActivities.slice(0, 5).map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${activityColors[activity.type]}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={activityIcons[activity.type]} />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">{activity.message}</p>
              <p className="text-xs text-gray-500 mt-0.5">{formatRelativeTime(activity.time)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
