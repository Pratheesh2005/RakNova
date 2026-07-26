import { useState } from "react";
import { CompanyLayout } from "@/components/company/layout/CompanyLayout";
import { InterviewManagementHeader } from "@/components/company/interviews/InterviewManagementHeader";
import { TodayInterviewPriorities } from "@/components/company/interviews/TodayInterviewPriorities";
import { TodayInterviewsTable } from "@/components/company/interviews/TodayInterviewsTable";
import { InterviewDetailDrawer } from "@/components/company/interviews/InterviewDetailDrawer";
import { PendingFeedbackTable } from "@/components/company/interviews/PendingFeedbackTable";
import { AIInterviewInsights } from "@/components/company/interviews/AIInterviewInsights";
import { UpcomingInterviews } from "@/components/company/interviews/UpcomingInterviews";
import { InterviewActivity } from "@/components/company/interviews/InterviewActivity";
import { QuickActions } from "@/components/company/interviews/QuickActions";
import { EmptyInterviewState } from "@/components/company/interviews/EmptyInterviewState";
import { interviews, Interview } from "@/data/company/interviews";

export default function InterviewManagementPage() {
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);

  if (interviews.length === 0) {
    return (
      <CompanyLayout>
        <EmptyInterviewState />
      </CompanyLayout>
    );
  }

  return (
    <CompanyLayout>
      <div className="space-y-6">
        <InterviewManagementHeader />
        <TodayInterviewPriorities />
        <TodayInterviewsTable interviews={interviews} onView={setSelectedInterview} />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PendingFeedbackTable interviews={interviews} />
            <AIInterviewInsights />
          </div>
          <div className="space-y-6">
            <UpcomingInterviews interviews={interviews} />
            <InterviewActivity />
            <QuickActions />
          </div>
        </div>
      </div>
      <InterviewDetailDrawer interview={selectedInterview} onClose={() => setSelectedInterview(null)} />
    </CompanyLayout>
  );
}
