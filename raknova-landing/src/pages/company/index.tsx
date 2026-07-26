import { CompanyLayout } from "@/components/company/layout/CompanyLayout";
import { DashboardHeader } from "@/components/company/dashboard/DashboardHeader";
import { TodayPriorities } from "@/components/company/dashboard/TodayPriorities";
import { HiringOverview } from "@/components/company/dashboard/HiringOverview";
import { ActiveJobsTable } from "@/components/company/dashboard/ActiveJobsTable";
import { RecentApplicationsTable } from "@/components/company/dashboard/RecentApplicationsTable";
import { AIInsightsPanel } from "@/components/company/dashboard/AIInsightsPanel";
import { TodaySchedule } from "@/components/company/dashboard/TodaySchedule";
import { ActivityFeed } from "@/components/company/dashboard/ActivityFeed";
import { QuickActions } from "@/components/company/dashboard/QuickActions";
import { NotificationsPreview } from "@/components/company/dashboard/NotificationsPreview";

export default function CompanyDashboardPage() {
  return (
    <CompanyLayout>
      <div className="space-y-6">
        <DashboardHeader />

        <TodayPriorities />

        <HiringOverview />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActiveJobsTable />
          </div>
          <div>
            <TodaySchedule />
          </div>
        </div>

        <RecentApplicationsTable />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AIInsightsPanel />
          </div>
          <div className="space-y-6">
            <QuickActions />
            <NotificationsPreview />
          </div>
        </div>

        <ActivityFeed />
      </div>
    </CompanyLayout>
  );
}
