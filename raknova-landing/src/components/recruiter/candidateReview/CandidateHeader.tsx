import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CandidateReviewData } from "@/data/recruiter/candidateReview";

interface CandidateHeaderProps {
  candidate: CandidateReviewData;
}

export function CandidateHeader({ candidate }: CandidateHeaderProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-700 flex-shrink-0">
          {candidate.name.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{candidate.name}</h1>
            <Badge variant="default" className="bg-yellow-50 text-yellow-700">{candidate.currentStage}</Badge>
          </div>
          <p className="text-sm text-gray-600 mt-1">{candidate.appliedPosition}</p>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
            <span>Applied: {candidate.applicationDate}</span>
            <span>AI Match: <span className="font-semibold text-green-600">{candidate.aiMatch}%</span></span>
            <span>Resume Score: <span className="font-semibold">{candidate.resumeScore}%</span></span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="md">Download Resume</Button>
          <Button variant="primary" size="md">Move to Next Stage</Button>
        </div>
      </div>
    </div>
  );
}
