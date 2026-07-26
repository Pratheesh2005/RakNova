import { CandidateLayout } from "@/components/candidate/layout/CandidateLayout";
import { WelcomeBanner } from "@/components/candidate/dashboard/WelcomeBanner";
import { StatsGrid } from "@/components/candidate/dashboard/StatsGrid";
import { ProfileProgress } from "@/components/candidate/dashboard/ProfileProgress";
import { RecentActivity } from "@/components/candidate/dashboard/RecentActivity";
import { QuickActions } from "@/components/candidate/dashboard/QuickActions";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function CandidateDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["candidate", "admin"]}>
      <CandidateLayout>
        <Breadcrumb items={[{ label: "Dashboard" }]} className="mb-4" />
        <div className="space-y-6">
          <WelcomeBanner />
          <StatsGrid />
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <RecentActivity />
            </div>
            <div className="space-y-6">
              <ProfileProgress />
              <QuickActions />
            </div>
          </div>
        </div>
      </CandidateLayout>
    </ProtectedRoute>
  );
}
