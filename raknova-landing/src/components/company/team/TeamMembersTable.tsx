import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TeamMember } from "@/data/company/team";

const statusStyles: Record<string, string> = {
  Active: "bg-green-50 text-green-700",
  Away: "bg-yellow-50 text-yellow-700",
  Inactive: "bg-gray-100 text-gray-600",
  "Pending Invitation": "bg-blue-50 text-blue-700",
};

interface TeamMembersTableProps {
  members: TeamMember[];
}

export function TeamMembersTable({ members }: TeamMembersTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Department</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Assigned Jobs</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Active Candidates</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Last Active</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                <td className="px-6 py-4 text-gray-600">{member.role}</td>
                <td className="px-6 py-4 text-gray-600">{member.department}</td>
                <td className="px-6 py-4 text-gray-600">{member.email}</td>
                <td className="px-6 py-4 text-center">{member.assignedJobs.length}</td>
                <td className="px-6 py-4 text-center">{member.activeCandidates}</td>
                <td className="px-6 py-4">
                  <Badge variant="default" className={statusStyles[member.status]}>{member.status}</Badge>
                </td>
                <td className="px-6 py-4 text-gray-500">{member.lastActive}</td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm">View</Button>
                  <Button variant="ghost" size="sm">Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
