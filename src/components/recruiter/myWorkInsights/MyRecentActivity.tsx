import { recentActivity } from "@/data/recruiter/myWorkInsights";

export function MyRecentActivity() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">My Recent Activity</h2>
      <div className="space-y-4">
        {recentActivity.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{item.action}</span>
                {" — "}{item.detail}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
