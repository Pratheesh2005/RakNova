import { useState } from "react";
import { useRouter } from "next/router";
import { RecruiterLayout } from "@/components/recruiter/layout/RecruiterLayout";
import { CandidateHeader } from "@/components/recruiter/candidateReview/CandidateHeader";
import { CandidateOverview } from "@/components/recruiter/candidateReview/CandidateOverview";
import { ResumePreview } from "@/components/recruiter/candidateReview/ResumePreview";
import { ProfessionalProfile } from "@/components/recruiter/candidateReview/ProfessionalProfile";
import { AICandidateAnalysis } from "@/components/recruiter/candidateReview/AICandidateAnalysis";
import { RecruiterNotes } from "@/components/recruiter/candidateReview/RecruiterNotes";
import { EvaluationChecklist } from "@/components/recruiter/candidateReview/EvaluationChecklist";
import { ActionCenter } from "@/components/recruiter/candidateReview/ActionCenter";
import { ActivityHistory } from "@/components/recruiter/candidateReview/ActivityHistory";
import { RelatedCandidates } from "@/components/recruiter/candidateReview/RelatedCandidates";
import { candidateReviewData } from "@/data/recruiter/candidateReview";

export default function CandidateReviewPage() {
  const router = useRouter();
  const { id } = router.query;
  // In a real app, fetch candidate by id; here we use static data
  const candidate = candidateReviewData; // could map by id if multiple

  const [checklist, setChecklist] = useState(candidate.checklistItems);

  const toggleChecklist = (index: number) => {
    const updated = [...checklist];
    updated[index] = { ...updated[index], checked: !updated[index].checked };
    setChecklist(updated);
  };

  return (
    <RecruiterLayout>
      <div className="space-y-6">
        <CandidateHeader candidate={candidate} />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CandidateOverview candidate={candidate} />
            <ResumePreview />
            <ProfessionalProfile candidate={candidate} />
            <AICandidateAnalysis analysis={candidate.aiAnalysis} />
            <RecruiterNotes initialNotes={candidate.recruiterNotes} />
          </div>
          <div className="space-y-6">
            <EvaluationChecklist items={checklist} onToggle={toggleChecklist} />
            <ActionCenter />
            <ActivityHistory history={candidate.activityHistory} />
            <RelatedCandidates candidates={candidate.relatedCandidates} />
          </div>
        </div>
      </div>
    </RecruiterLayout>
  );
}
