import { useState } from "react";
import { RecruiterLayout } from "@/components/recruiter/layout/RecruiterLayout";
import { InterviewScheduleHeader } from "@/components/recruiter/interviewSchedule/InterviewScheduleHeader";
import { TodayInterviewTasks } from "@/components/recruiter/interviewSchedule/TodayInterviewTasks";
import { TodayInterviewsTable } from "@/components/recruiter/interviewSchedule/TodayInterviewsTable";
import { InterviewCalendar } from "@/components/recruiter/interviewSchedule/InterviewCalendar";
import { InterviewDetailDrawer } from "@/components/recruiter/interviewSchedule/InterviewDetailDrawer";
import { InterviewPreparationChecklist } from "@/components/recruiter/interviewSchedule/InterviewPreparationChecklist";
import { UpcomingInterviews } from "@/components/recruiter/interviewSchedule/UpcomingInterviews";
import { RecentInterviewActivity } from "@/components/recruiter/interviewSchedule/RecentInterviewActivity";
import { QuickActions } from "@/components/recruiter/interviewSchedule/QuickActions";
import { EmptyInterviewState } from "@/components/recruiter/interviewSchedule/EmptyInterviewState";
import { todayInterviews, RecruiterInterview } from "@/data/recruiter/interviewSchedule";

export default function InterviewSchedulePage() {
  const [selectedInterview, setSelectedInterview] = useState<RecruiterInterview | null>(null);

  // If no interviews at all, show empty; todayInterviews is not empty, so we'll just proceed.
  const hasInterviews = todayInterviews.length > 0;

  return (
    <RecruiterLayout>
      {!hasInterviews ? (
        <EmptyInterviewState />
      ) : (
        <div className="space-y-6">
          <InterviewScheduleHeader />
          <TodayInterviewTasks />
          <TodayInterviewsTable
            interviews={todayInterviews}
            onViewDetails={setSelectedInterview}
          />
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <InterviewCalendar />
              <RecentInterviewActivity />
            </div>
            <div className="space-y-6">
              <InterviewPreparationChecklist />
              <UpcomingInterviews />
              <QuickActions />
            </div>
          </div>
        </div>
      )}
      <InterviewDetailDrawer interview={selectedInterview} onClose={() => setSelectedInterview(null)} />
    </RecruiterLayout>
  );
}
