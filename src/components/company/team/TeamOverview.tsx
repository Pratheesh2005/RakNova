import { teamOverview } from "@/data/company/team";

const stats = [
  { label: "Total Members", value: teamOverview.totalMembers },
  { label: "Active Recruiters", value: teamOverview.activeRecruiters },
  { label: "Hiring Managers", value: teamOverview.hiringManagers },
  { label: "Pending Invitations", value: teamOverview.pendingInvitations },
];

export function TeamOverview() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
