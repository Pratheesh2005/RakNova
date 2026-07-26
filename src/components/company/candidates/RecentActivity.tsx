import { recentActivity } from "@/data/company/candidates";

export function RecentActivity() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {recentActivity.map((activity, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activity.action}</span>
                {" — "}{activity.detail}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
