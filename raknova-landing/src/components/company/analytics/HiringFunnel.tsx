import { funnel } from "@/data/company/hiringAnalytics";

export function HiringFunnel() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Hiring Funnel</h2>
      <div className="space-y-4">
        {funnel.map((stage, idx) => (
          <div key={stage.stage}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">{stage.stage}</span>
              <span className="text-gray-500">{stage.count} candidates</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${(stage.count / funnel[0].count) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Conversion: {stage.conversion}%</span>
              {stage.dropOff > 0 && <span>Drop-off: {stage.dropOff}%</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
