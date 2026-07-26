import { RecruiterLayout } from "@/components/recruiter/layout/RecruiterLayout";
import { RecruiterHeader } from "@/components/recruiter/dashboard/RecruiterHeader";
import { TodayTasks } from "@/components/recruiter/dashboard/TodayTasks";
import { WorkSummary } from "@/components/recruiter/dashboard/WorkSummary";
import { AssignedJobsTable } from "@/components/recruiter/dashboard/AssignedJobsTable";
import { TodayCandidatesTable } from "@/components/recruiter/dashboard/TodayCandidatesTable";
import { TodayInterviews } from "@/components/recruiter/dashboard/TodayInterviews";
import { AITaskSuggestions } from "@/components/recruiter/dashboard/AITaskSuggestions";
import { RecentActivity } from "@/components/recruiter/dashboard/RecentActivity";
import { QuickActions } from "@/components/recruiter/dashboard/QuickActions";
import { NotificationsPreview } from "@/components/recruiter/dashboard/NotificationsPreview";
import { EmptyRecruiterState } from "@/components/recruiter/dashboard/EmptyRecruiterState";
import { recruiterInfo } from "@/data/recruiter/dashboard";

export default function RecruiterDashboardPage() {
  // If no tasks, show empty (but we have data)
  const hasTasks = recruiterInfo.tasksCount > 0;

  if (!hasTasks) {
    return (
      <RecruiterLayout>
        <EmptyRecruiterState />
      </RecruiterLayout>
    );
  }

  return (
    <RecruiterLayout>
      <div className="space-y-6">
        <RecruiterHeader />
        <TodayTasks />
        <WorkSummary />
        <div className="grid lg:grid-cols-2 gap-6">
          <AssignedJobsTable />
          <TodayInterviews />
        </div>
        <TodayCandidatesTable />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AITaskSuggestions />
            <RecentActivity />
          </div>
          <div className="space-y-6">
            <QuickActions />
            <NotificationsPreview />
          </div>
        </div>
      </div>
    </RecruiterLayout>
  );
}
