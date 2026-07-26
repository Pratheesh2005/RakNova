import { Button } from "@/components/ui/Button";
import { Interview } from "@/data/candidate/interviews";

interface RecruiterDetailsProps {
  interview: Interview;
}

export function RecruiterDetails({ interview }: RecruiterDetailsProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">👤 Recruiter Details</h3>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-xl font-bold text-gray-500">
          {interview.interviewerName.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{interview.interviewerName}</p>
          <p className="text-sm text-gray-500">{interview.interviewerDesignation}</p>
          <p className="text-sm text-gray-500">{interview.company}</p>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          {interview.interviewerEmail}
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          {interview.interviewerPhone}
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Button variant="outline" size="sm" href={`mailto:${interview.interviewerEmail}`}>Email</Button>
        {interview.interviewerLinkedIn && (
          <Button variant="outline" size="sm" href={interview.interviewerLinkedIn}>LinkedIn</Button>
        )}
      </div>
    </div>
  );
}
