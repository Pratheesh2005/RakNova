import { useState } from "react";
import { CompanyLayout } from "@/components/company/layout/CompanyLayout";
import { TeamManagementHeader } from "@/components/company/team/TeamManagementHeader";
import { TeamOverview } from "@/components/company/team/TeamOverview";
import { TeamMembersTable } from "@/components/company/team/TeamMembersTable";
import { WorkloadTable } from "@/components/company/team/WorkloadTable";
import { RoleManagement } from "@/components/company/team/RoleManagement";
import { InviteMemberModal } from "@/components/company/team/InviteMemberModal";
import { RecentTeamActivity } from "@/components/company/team/RecentTeamActivity";
import { QuickActions } from "@/components/company/team/QuickActions";
import { EmptyTeamState } from "@/components/company/team/EmptyTeamState";
import { teamMembers, workload } from "@/data/company/team";

export default function TeamManagementPage() {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  if (teamMembers.length === 0) {
    return (
      <CompanyLayout>
        <EmptyTeamState />
      </CompanyLayout>
    );
  }

  return (
    <CompanyLayout>
      <div className="space-y-6">
        <TeamManagementHeader />
        <TeamOverview />
        <TeamMembersTable members={teamMembers} />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <WorkloadTable items={workload} />
            <RoleManagement />
          </div>
          <div className="space-y-6">
            <RecentTeamActivity />
            <QuickActions />
          </div>
        </div>
      </div>
      <InviteMemberModal isOpen={inviteModalOpen} onClose={() => setInviteModalOpen(false)} />
      <button onClick={() => setInviteModalOpen(true)} className="hidden">Open invite</button> {/* trigger from header button will be wired later */}
    </CompanyLayout>
  );
}
