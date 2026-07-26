import { Badge } from "@/components/ui/Badge";
import { Interview } from "@/data/company/interviews";

interface UpcomingInterviewsProps {
  interviews: Interview[];
}

const statusStyles: Record<string, string> = {
  Scheduled: "bg-blue-50 text-blue-700",
  "In Progress": "bg-green-50 text-green-700",
  Completed: "bg-gray-100 text-gray-600",
  Cancelled: "bg-red-50 text-red-700",
  Rescheduled: "bg-yellow-50 text-yellow-700",
};

export function UpcomingInterviews({ interviews }: UpcomingInterviewsProps) {
  const upcoming = interviews.filter((i) => i.status === "Scheduled" || i.status === "Rescheduled");
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Interviews</h2>
      <div className="space-y-3">
        {upcoming.map((interview) => (
          <div key={interview.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">{interview.candidate} — {interview.appliedPosition}</p>
              <p className="text-xs text-gray-500">{interview.date} at {interview.time} | {interview.interviewType} | {interview.interviewer}</p>
            </div>
            <Badge variant="default" className={statusStyles[interview.status]}>{interview.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
