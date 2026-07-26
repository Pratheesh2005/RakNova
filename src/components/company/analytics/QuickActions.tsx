import { Button } from "@/components/ui/Button";

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="primary" size="sm">Create Report</Button>
        <Button variant="outline" size="sm">Export Analytics</Button>
        <Button variant="outline" size="sm">Review Pipeline</Button>
        <Button variant="outline" size="sm">View Active Jobs</Button>
      </div>
    </div>
  );
}
