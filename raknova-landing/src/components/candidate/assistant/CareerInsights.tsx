import { ProgressBar } from "@/components/ui/ProgressBar";
import { careerInsights } from "@/data/candidate/assistant";

export function CareerInsights() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">📊</span>
        <h3 className="text-lg font-semibold text-gray-900">Career Insights</h3>
      </div>

      <div className="space-y-3">
        <div className="p-3 bg-green-50 rounded-xl flex justify-between items-center">
          <span className="text-sm text-gray-600">Strongest Area</span>
          <span className="text-sm font-semibold text-green-700">{careerInsights.strongestArea}</span>
        </div>
        <div className="p-3 bg-red-50 rounded-xl flex justify-between items-center">
          <span className="text-sm text-gray-600">Weakest Area</span>
          <span className="text-sm font-semibold text-red-700">{careerInsights.weakestArea}</span>
        </div>
        <div className="p-3 bg-brand-50 rounded-xl flex justify-between items-center">
          <span className="text-sm text-gray-600">Industry Demand</span>
          <span className="text-sm font-semibold text-brand-700">{careerInsights.industryDemand}</span>
        </div>
        <div className="p-3 bg-purple-50 rounded-xl flex justify-between items-center">
          <span className="text-sm text-gray-600">Expected Salary</span>
          <span className="text-sm font-semibold text-purple-700">{careerInsights.expectedSalary}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <ProgressBar
          label="Interview Readiness"
          value={careerInsights.interviewReadiness}
          size="sm"
          color="brand"
        />
      </div>
    </div>
  );
}
