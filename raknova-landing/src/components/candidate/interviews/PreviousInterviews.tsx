import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Interview } from "@/data/candidate/interviews";

interface PreviousInterviewsProps {
  interviews: Interview[];
}

export function PreviousInterviews({ interviews }: PreviousInterviewsProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Previous Interviews</h3>

      <div className="space-y-3">
        {interviews.map((interview) => (
          <div key={interview.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-sm font-bold text-gray-500 shadow-sm flex-shrink-0">
              {interview.company.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">{interview.company}</p>
              <p className="text-xs text-gray-500">{interview.position} • {new Date(interview.date).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-2">
              {interview.score && (
                <Badge variant={interview.score >= 80 ? "success" : interview.score >= 60 ? "warning" : "danger"} size="sm">
                  Score: {interview.score}%
                </Badge>
              )}
              <Badge variant="default" size="sm">{interview.status === "completed" ? "Completed" : interview.status}</Badge>
            </div>
            <Button variant="outline" size="sm">View Feedback</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
