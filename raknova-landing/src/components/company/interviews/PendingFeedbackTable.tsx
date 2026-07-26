import { Button } from "@/components/ui/Button";
import { Interview } from "@/data/company/interviews";

interface PendingFeedbackTableProps {
  interviews: Interview[];
}

export function PendingFeedbackTable({ interviews }: PendingFeedbackTableProps) {
  const pending = interviews.filter((i) => i.feedbackStatus === "Pending");
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Pending Feedback</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Candidate</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Interviewer</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Round</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Completed</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {pending.map((interview) => (
              <tr key={interview.id}>
                <td className="px-6 py-4 font-medium">{interview.candidate}</td>
                <td className="px-6 py-4 text-gray-600">{interview.interviewer}</td>
                <td className="px-6 py-4 text-gray-600">{interview.interviewType}</td>
                <td className="px-6 py-4 text-gray-600">{interview.completedOn || "—"}</td>
                <td className="px-6 py-4">
                  <span className="text-yellow-600 text-xs font-medium bg-yellow-50 px-2 py-1 rounded-full">Pending</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="primary" size="sm">Submit Feedback</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
