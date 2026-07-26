import { Button } from "@/components/ui/Button";

export function MyWorkInsightsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Work Insights</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track your recruitment activity and discover opportunities to improve your workflow.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="md">View Weekly Summary</Button>
        <Button variant="primary" size="md">Export Personal Report</Button>
      </div>
    </div>
  );
}
