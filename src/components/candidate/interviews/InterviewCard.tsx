import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatDateTime } from "@/utils/formatDate";

interface Interview {
  id: number;
  company: string;
  position: string;
  date: string;
  type: "Video Call" | "Phone" | "In-person";
  status: "upcoming" | "completed" | "cancelled";
  meetingLink?: string;
  interviewer?: string;
  notes?: string;
}

export function InterviewCard({ interview }: { interview: Interview }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{interview.position}</h3>
          <p className="text-sm text-gray-600">{interview.company}</p>
        </div>
        <Badge
          variant={interview.status === "upcoming" ? "success" : interview.status === "completed" ? "default" : "danger"}
          size="sm"
        >
          {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
        </Badge>
      </div>

      <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDateTime(interview.date)}
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {interview.type}
        </div>
        {interview.interviewer && (
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {interview.interviewer}
          </div>
        )}
      </div>

      {interview.status === "upcoming" && interview.meetingLink && (
        <div className="mt-4 flex gap-2">
          <Button variant="primary" size="sm" href={interview.meetingLink}>Join Meeting</Button>
          <Button variant="outline" size="sm">Reschedule</Button>
        </div>
      )}
    </div>
  );
}
