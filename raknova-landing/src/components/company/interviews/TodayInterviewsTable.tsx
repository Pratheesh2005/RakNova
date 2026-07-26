import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Interview } from "@/data/company/interviews";

const statusStyles: Record<string, string> = {
  Scheduled: "bg-blue-50 text-blue-700",
  "In Progress": "bg-green-50 text-green-700",
  Completed: "bg-gray-100 text-gray-600",
  Cancelled: "bg-red-50 text-red-700",
  Rescheduled: "bg-yellow-50 text-yellow-700",
};

interface TodayInterviewsTableProps {
  interviews: Interview[];
  onView: (interview: Interview) => void;
}

export function TodayInterviewsTable({ interviews, onView }: TodayInterviewsTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Today's Interviews</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Time</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Candidate</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Applied Position</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Interviewer</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Mode</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {interviews.map((interview) => (
              <tr key={interview.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-gray-900">{interview.time}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{interview.candidate}</td>
                <td className="px-6 py-4 text-gray-600">{interview.appliedPosition}</td>
                <td className="px-6 py-4 text-gray-600">{interview.interviewType}</td>
                <td className="px-6 py-4 text-gray-600">{interview.interviewer}</td>
                <td className="px-6 py-4 text-gray-600">{interview.meetingMode}</td>
                <td className="px-6 py-4">
                  <Badge variant="default" className={statusStyles[interview.status]}>{interview.status}</Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="primary" size="sm" onClick={() => onView(interview)}>Open</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
