import { CompanyLayout } from "@/components/company/layout/CompanyLayout";
import { HiringAnalyticsHeader } from "@/components/company/analytics/HiringAnalyticsHeader";
import { HiringSummary } from "@/components/company/analytics/HiringSummary";
import { HiringFunnel } from "@/components/company/analytics/HiringFunnel";
import { ActiveJobPerformanceTable } from "@/components/company/analytics/ActiveJobPerformanceTable";
import { TimeToHire } from "@/components/company/analytics/TimeToHire";
import { AIHiringInsights } from "@/components/company/analytics/AIHiringInsights";
import { TopPerformingJobs } from "@/components/company/analytics/TopPerformingJobs";
import { RecentReports } from "@/components/company/analytics/RecentReports";
import { QuickActions } from "@/components/company/analytics/QuickActions";
import { EmptyAnalyticsState } from "@/components/company/analytics/EmptyAnalyticsState";

export default function HiringAnalyticsPage() {
  const hasData = true; // placeholder; in real app, check if any recruitment data exists

  return (
    <CompanyLayout>
      {!hasData ? (
        <EmptyAnalyticsState />
      ) : (
        <div className="space-y-6">
          <HiringAnalyticsHeader />
          <HiringSummary />
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ActiveJobPerformanceTable />
            </div>
            <div>
              <TopPerformingJobs />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <HiringFunnel />
            <TimeToHire />
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AIHiringInsights />
            </div>
            <div className="space-y-6">
              <RecentReports />
              <QuickActions />
            </div>
          </div>
        </div>
      )}
    </CompanyLayout>
  );
}
