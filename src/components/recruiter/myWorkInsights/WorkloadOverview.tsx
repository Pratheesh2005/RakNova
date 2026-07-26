import { ProgressBar } from "@/components/ui/ProgressBar";
import { workloadItems } from "@/data/recruiter/myWorkInsights";

export function WorkloadOverview() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Workload Overview</h2>
      <div className="space-y-4">
        {workloadItems.map((item) => (
          <ProgressBar
            key={item.label}
            label={item.label}
            value={item.value}
            size="md"
            color="brand"
          />
        ))}
      </div>
    </div>
  );
}
