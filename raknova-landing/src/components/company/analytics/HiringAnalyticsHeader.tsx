import { Button } from "@/components/ui/Button";

export function HiringAnalyticsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hiring Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">
          Understand recruitment performance and identify opportunities for improvement.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="md">Select Time Period</Button>
        <Button variant="primary" size="md">Export Report</Button>
      </div>
    </div>
  );
}
