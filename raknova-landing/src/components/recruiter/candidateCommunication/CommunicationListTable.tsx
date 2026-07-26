import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CommunicationItem } from "@/data/recruiter/candidateCommunication";

const typeStyles: Record<string, string> = {
  Email: "bg-blue-50 text-blue-700",
  Phone: "bg-purple-50 text-purple-700",
  Interview: "bg-indigo-50 text-indigo-700",
  Offer: "bg-green-50 text-green-700",
  "Follow-up": "bg-yellow-50 text-yellow-700",
};

const statusStyles: Record<string, string> = {
  Pending: "bg-gray-100 text-gray-600",
  "Waiting Reply": "bg-yellow-50 text-yellow-700",
  Completed: "bg-green-50 text-green-700",
  Overdue: "bg-red-50 text-red-700",
};

interface CommunicationListTableProps {
  communications: CommunicationItem[];
  onSelectCandidate: (item: CommunicationItem) => void;
}

export function CommunicationListTable({ communications, onSelectCandidate }: CommunicationListTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Communication List</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Candidate</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Applied Job</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Last Communication</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Recruiter</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Next Follow-up</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {communications.map((comm) => (
              <tr key={comm.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer" onClick={() => onSelectCandidate(comm)}>
                <td className="px-6 py-4 font-medium text-gray-900">{comm.candidate}</td>
                <td className="px-6 py-4 text-gray-600">{comm.appliedJob}</td>
                <td className="px-6 py-4 text-gray-600">{comm.lastCommunication}</td>
                <td className="px-6 py-4">
                  <Badge variant="default" className={typeStyles[comm.communicationType]}>{comm.communicationType}</Badge>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="default" className={statusStyles[comm.status]}>{comm.status}</Badge>
                </td>
                <td className="px-6 py-4 text-gray-600">{comm.assignedRecruiter}</td>
                <td className="px-6 py-4 text-gray-600">{comm.nextFollowUp}</td>
                <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <Button variant="primary" size="sm">Open</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
