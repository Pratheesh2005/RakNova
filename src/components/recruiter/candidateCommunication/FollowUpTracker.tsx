import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { followUpItems } from "@/data/recruiter/candidateCommunication";

const priorityStyles: Record<string, string> = {
  High: "bg-red-50 text-red-700",
  Medium: "bg-yellow-50 text-yellow-700",
  Low: "bg-gray-100 text-gray-600",
};

const statusStyles: Record<string, string> = {
  Pending: "bg-yellow-50 text-yellow-700",
  Completed: "bg-green-50 text-green-700",
};

export function FollowUpTracker() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Follow-up Tracker</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Candidate</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Reason</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Due Date</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Priority</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {followUpItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 font-medium text-gray-900">{item.candidate}</td>
                <td className="px-6 py-4 text-gray-600">{item.reason}</td>
                <td className="px-6 py-4 text-gray-600">{item.dueDate}</td>
                <td className="px-6 py-4">
                  <Badge variant="default" className={priorityStyles[item.priority]}>{item.priority}</Badge>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="default" className={statusStyles[item.status]}>{item.status}</Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="primary" size="sm">Follow Up</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
