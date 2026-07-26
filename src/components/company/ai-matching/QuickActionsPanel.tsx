import { Button } from "@/components/ui/Button";

export function QuickActionsPanel() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="primary" size="sm">Interview</Button>
        <Button variant="outline" size="sm">Shortlist</Button>
        <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">Reject</Button>
        <Button variant="outline" size="sm">Open Profile</Button>
        <Button variant="outline" size="sm" className="col-span-2">Download Resume</Button>
      </div>
    </div>
  );
}
