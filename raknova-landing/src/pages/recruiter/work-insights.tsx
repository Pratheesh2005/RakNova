import { RecruiterLayout } from "@/components/recruiter/layout/RecruiterLayout";
import { MyWorkInsightsHeader } from "@/components/recruiter/myWorkInsights/MyWorkInsightsHeader";
import { ThisWeekAtAGlance } from "@/components/recruiter/myWorkInsights/ThisWeekAtAGlance";
import { WorkloadOverview } from "@/components/recruiter/myWorkInsights/WorkloadOverview";
import { AIProductivityInsights } from "@/components/recruiter/myWorkInsights/AIProductivityInsights";
import { MyRecentActivity } from "@/components/recruiter/myWorkInsights/MyRecentActivity";
import { UpcomingResponsibilities } from "@/components/recruiter/myWorkInsights/UpcomingResponsibilities";
import { LearningSuggestions } from "@/components/recruiter/myWorkInsights/LearningSuggestions";
import { QuickActions } from "@/components/recruiter/myWorkInsights/QuickActions";
import { EmptyState } from "@/components/recruiter/myWorkInsights/EmptyState";
import { weekStats } from "@/data/recruiter/myWorkInsights";

export default function MyWorkInsightsPage() {
  // Show empty state if no activity (e.g., all zeros) but for demo we have data
  const hasActivity =
    weekStats.candidatesReviewed > 0 ||
    weekStats.interviewsConducted > 0 ||
    weekStats.feedbackSubmitted > 0;

  return (
    <RecruiterLayout>
      {!hasActivity ? (
        <EmptyState />
      ) : (
        <div className="space-y-6">
          <MyWorkInsightsHeader />
          <ThisWeekAtAGlance />
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <WorkloadOverview />
              <AIProductivityInsights />
              <MyRecentActivity />
            </div>
            <div className="space-y-6">
              <UpcomingResponsibilities />
              <LearningSuggestions />
              <QuickActions />
            </div>
          </div>
        </div>
      )}
    </RecruiterLayout>
  );
}
