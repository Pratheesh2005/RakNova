import { Button } from "@/components/ui/Button";

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="primary" size="sm">Interview Invitation</Button>
        <Button variant="outline" size="sm">Reminder</Button>
        <Button variant="outline" size="sm">Follow-up</Button>
        <Button variant="outline" size="sm">Offer Discussion</Button>
      </div>
    </div>
  );
}
