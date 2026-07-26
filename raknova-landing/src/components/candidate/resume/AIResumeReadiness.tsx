import { ProgressBar } from "@/components/ui/ProgressBar";

const metrics = [
  { label: "Resume Score", value: 88, color: "brand" as const },
  { label: "ATS Compatibility", value: 91, color: "green" as const },
  { label: "Keyword Coverage", value: 83, color: "brand" as const },
];

const quickChecks = [
  { label: "Formatting", status: "Excellent", color: "text-green-600", bg: "bg-green-50" },
  { label: "Grammar", status: "Excellent", color: "text-green-600", bg: "bg-green-50" },
  { label: "Contact Info", status: "Complete", color: "text-green-600", bg: "bg-green-50" },
  { label: "File Format", status: "Optimal", color: "text-green-600", bg: "bg-green-50" },
];

export function AIResumeReadiness() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">AI Resume Readiness</h3>
      </div>

      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <ProgressBar label={metric.label} value={metric.value} size="md" color={metric.color} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-5">
        {quickChecks.map((check) => (
          <div key={check.label} className={`${check.bg} rounded-xl p-3 text-center`}>
            <p className={`text-lg font-bold ${check.color}`}>{check.status}</p>
            <p className="text-xs text-gray-600 mt-1">{check.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
