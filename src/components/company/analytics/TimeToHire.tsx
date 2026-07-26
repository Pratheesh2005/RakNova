import { timeToHireStages } from "@/data/company/hiringAnalytics";

export function TimeToHire() {
  const maxDays = Math.max(...timeToHireStages.map(s => s.days));
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Time to Hire</h2>
      <div className="space-y-4">
        {timeToHireStages.map((stage) => {
          const isSlowest = stage.days === maxDays;
          return (
            <div key={stage.stage}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{stage.stage}</span>
                <span className={`font-medium ${isSlowest ? "text-red-600" : "text-gray-500"}`}>{stage.days} days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full ${isSlowest ? "bg-red-400" : "bg-blue-500"}`}
                  style={{ width: `${(stage.days / maxDays) * 100}%` }}
                />
              </div>
              {isSlowest && <p className="text-xs text-red-500 mt-1">Slowest stage</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
