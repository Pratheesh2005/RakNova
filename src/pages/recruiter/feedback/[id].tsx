import { useState } from "react";
import { useRouter } from "next/router";
import { RecruiterLayout } from "@/components/recruiter/layout/RecruiterLayout";
import { InterviewFeedbackHeader } from "@/components/recruiter/interviewFeedback/InterviewFeedbackHeader";
import { InterviewSummary } from "@/components/recruiter/interviewFeedback/InterviewSummary";
import { InterviewEvaluation } from "@/components/recruiter/interviewFeedback/InterviewEvaluation";
import { DetailedObservations } from "@/components/recruiter/interviewFeedback/DetailedObservations";
import { InterviewChecklist } from "@/components/recruiter/interviewFeedback/InterviewChecklist";
import { AIFeedbackAssistant } from "@/components/recruiter/interviewFeedback/AIFeedbackAssistant";
import { FinalRecommendation } from "@/components/recruiter/interviewFeedback/FinalRecommendation";
import { Attachments } from "@/components/recruiter/interviewFeedback/Attachments";
import { FeedbackHistory } from "@/components/recruiter/interviewFeedback/FeedbackHistory";
import { QuickActions } from "@/components/recruiter/interviewFeedback/QuickActions";
import { EmptyFeedbackState } from "@/components/recruiter/interviewFeedback/EmptyFeedbackState";
import { interviewFeedbackData } from "@/data/recruiter/interviewFeedback";

export default function InterviewFeedbackPage() {
  const router = useRouter();
  const { id } = router.query;

  // Use static data; could map by id if multiple
  const feedback = interviewFeedbackData; // demo only

  const [ratings, setRatings] = useState(feedback.evaluationRatings);
  const [observations, setObservations] = useState(feedback.observations);
  const [checklist, setChecklist] = useState(feedback.checklistItems);

  const handleRatingChange = (category: string, value: number) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  const handleObservationChange = (field: string, value: string) => {
    setObservations((prev) => ({ ...prev, [field]: value }));
  };

  const toggleChecklist = (index: number) => {
    const updated = [...checklist];
    updated[index] = { ...updated[index], checked: !updated[index].checked };
    setChecklist(updated);
  };

  if (!feedback) {
    return (
      <RecruiterLayout>
        <EmptyFeedbackState />
      </RecruiterLayout>
    );
  }

  return (
    <RecruiterLayout>
      <div className="space-y-6">
        <InterviewFeedbackHeader />
        <InterviewSummary data={feedback} />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <InterviewEvaluation ratings={ratings} onRatingChange={handleRatingChange} />
            <DetailedObservations observations={observations} onChange={handleObservationChange} />
            <AIFeedbackAssistant aiAssistant={feedback.aiAssistant} />
            <Attachments attachments={feedback.attachments} />
            <FeedbackHistory history={feedback.feedbackHistory} />
          </div>
          <div className="space-y-6">
            <InterviewChecklist items={checklist} onToggle={toggleChecklist} />
            <FinalRecommendation />
            <QuickActions />
          </div>
        </div>
      </div>
    </RecruiterLayout>
  );
}
