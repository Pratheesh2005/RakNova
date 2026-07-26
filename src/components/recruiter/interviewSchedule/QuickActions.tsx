import { Button } from "@/components/ui/Button";

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="primary" size="sm">Schedule Interview</Button>
        <Button variant="outline" size="sm">Open Candidate</Button>
        <Button variant="outline" size="sm">View Calendar</Button>
        <Button variant="outline" size="sm">Export Schedule</Button>
      </div>
    </div>
  );
}
