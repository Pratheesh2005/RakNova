import { Badge } from "@/components/ui/Badge";
import { InterviewFeedbackData } from "@/data/recruiter/interviewFeedback";

interface InterviewSummaryProps {
  data: InterviewFeedbackData;
}

export function InterviewSummary({ data }: InterviewSummaryProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-xl font-bold text-blue-700">
          {data.candidateName.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{data.candidateName}</h2>
          <p className="text-sm text-gray-600">{data.appliedPosition}</p>
          <Badge variant="default" className="mt-1 bg-blue-50 text-blue-700">
            {data.currentStage}
          </Badge>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Interview Round", value: data.interviewRound },
          { label: "Date", value: data.interviewDate },
          { label: "Time", value: data.interviewTime },
          { label: "Type", value: data.interviewType },
          { label: "Interviewer", value: data.interviewer },
          { label: "Duration", value: data.interviewDuration },
          { label: "Current Stage", value: data.currentStage },
        ].map((item) => (
          <div key={item.label} className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className="text-sm font-medium text-gray-900 mt-1">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
