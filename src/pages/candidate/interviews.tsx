import { CandidateLayout } from "@/components/candidate/layout/CandidateLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { InterviewHero } from "@/components/candidate/interviews/InterviewHero";
import { TodayInterviews } from "@/components/candidate/interviews/TodayInterviews";
import { InterviewCalendar } from "@/components/candidate/interviews/InterviewCalendar";
import { AIInterviewReadiness } from "@/components/candidate/interviews/AIInterviewReadiness";
import { AIPreparationPlan } from "@/components/candidate/interviews/AIPreparationPlan";
import { AICompanyResearch } from "@/components/candidate/interviews/AICompanyResearch";
import { AIMockInterview } from "@/components/candidate/interviews/AIMockInterview";
import { AISuggestedQuestions } from "@/components/candidate/interviews/AISuggestedQuestions";
import { AIPerformancePrediction } from "@/components/candidate/interviews/AIPerformancePrediction";
import { PreviousInterviews } from "@/components/candidate/interviews/PreviousInterviews";
import { RecruiterDetails } from "@/components/candidate/interviews/RecruiterDetails";
import { DocumentsRequired } from "@/components/candidate/interviews/DocumentsRequired";
import { InterviewNotes } from "@/components/candidate/interviews/InterviewNotes";
import { InterviewResources } from "@/components/candidate/interviews/InterviewResources";
import { todayInterviews, upcomingInterviews, previousInterviews } from "@/data/candidate/interviews";

export default function InterviewsPage() {
  const mainInterview = todayInterviews[0] || upcomingInterviews[0];

  return (
    <CandidateLayout>
      <Breadcrumb items={[{ label: "Interview Center" }]} className="mb-4" />

      <div className="space-y-6">
        {/* Hero */}
        <InterviewHero />

        {/* Today's Interviews */}
        <TodayInterviews interviews={todayInterviews} />

        {/* Calendar */}
        <InterviewCalendar />

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - AI Readiness + Prep Plan */}
          <div className="space-y-6">
            <AIInterviewReadiness />
            <AIPreparationPlan />
          </div>

          {/* Middle Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Company Research */}
            {mainInterview && (
              <AICompanyResearch
                research={mainInterview.companyResearch}
                companyName={mainInterview.company}
              />
            )}

            {/* AI Suggested Questions */}
            {mainInterview && mainInterview.suggestedQuestions.length > 0 && (
              <AISuggestedQuestions questions={mainInterview.suggestedQuestions} />
            )}

            {/* AI Performance Prediction */}
            {mainInterview && (
              <AIPerformancePrediction interviewId={mainInterview.id} />
            )}

            {/* Recruiter Details */}
            {mainInterview && <RecruiterDetails interview={mainInterview} />}

            {/* Documents Required */}
            {mainInterview && (
              <DocumentsRequired documents={mainInterview.requiredDocuments} />
            )}

            {/* Interview Notes */}
            {mainInterview && <InterviewNotes notes={mainInterview.notes} />}
          </div>
        </div>

        {/* AI Mock Interview */}
        <AIMockInterview />

        {/* Interview Resources */}
        <InterviewResources />

        {/* Previous Interviews */}
        {previousInterviews.length > 0 && (
          <PreviousInterviews interviews={previousInterviews} />
        )}
      </div>
    </CandidateLayout>
  );
}
