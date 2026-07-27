import { useState } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

interface RoleDef {
  id: string;
  name: string;
  description: string;
  userCount: number;
  status: "Active" | "System Locked";
  lastUpdated: string;
}

interface PermissionRule {
  module: string;
  candidate: { view: boolean; create: boolean; edit: boolean; delete: boolean; approve: boolean };
  company: { view: boolean; create: boolean; edit: boolean; delete: boolean; approve: boolean };
  recruiter: { view: boolean; create: boolean; edit: boolean; delete: boolean; approve: boolean };
  superAdmin: { view: boolean; create: boolean; edit: boolean; delete: boolean; approve: boolean };
}

const initialRoles: RoleDef[] = [
  { id: "r1", name: "Candidate", description: "Job seekers utilizing AI resume tools, application tracker, and interview assistant.", userCount: 18420, status: "Active", lastUpdated: "2026-03-01" },
  { id: "r2", name: "Company Admin", description: "Corporate organization administrators managing job postings, team recruiters, and billing.", userCount: 1240, status: "Active", lastUpdated: "2026-03-10" },
  { id: "r3", name: "Recruiter", description: "Talent acquisition specialists managing candidate pipelines, screening, and interview scheduling.", userCount: 5190, status: "Active", lastUpdated: "2026-03-15" },
  { id: "r4", name: "Super Admin", description: "Full platform platform administrators with total read, write, system config, and audit privileges.", userCount: 12, status: "System Locked", lastUpdated: "2026-03-27" },
];

const initialMatrix: PermissionRule[] = [
  { module: "Dashboard", candidate: { view: true, create: false, edit: false, delete: false, approve: false }, company: { view: true, create: false, edit: false, delete: false, approve: false }, recruiter: { view: true, create: false, edit: false, delete: false, approve: false }, superAdmin: { view: true, create: true, edit: true, delete: true, approve: true } },
  { module: "Jobs", candidate: { view: true, create: false, edit: false, delete: false, approve: false }, company: { view: true, create: true, edit: true, delete: true, approve: false }, recruiter: { view: true, create: true, edit: true, delete: false, approve: false }, superAdmin: { view: true, create: true, edit: true, delete: true, approve: true } },
  { module: "Applications", candidate: { view: true, create: true, edit: false, delete: true, approve: false }, company: { view: true, create: false, edit: true, delete: false, approve: true }, recruiter: { view: true, create: false, edit: true, delete: false, approve: true }, superAdmin: { view: true, create: true, edit: true, delete: true, approve: true } },
  { module: "Candidates", candidate: { view: true, create: true, edit: true, delete: true, approve: false }, company: { view: true, create: false, edit: false, delete: false, approve: false }, recruiter: { view: true, create: false, edit: true, delete: false, approve: false }, superAdmin: { view: true, create: true, edit: true, delete: true, approve: true } },
  { module: "Companies", candidate: { view: true, create: false, edit: false, delete: false, approve: false }, company: { view: true, create: false, edit: true, delete: false, approve: false }, recruiter: { view: true, create: false, edit: false, delete: false, approve: false }, superAdmin: { view: true, create: true, edit: true, delete: true, approve: true } },
  { module: "Recruiters", candidate: { view: false, create: false, edit: false, delete: false, approve: false }, company: { view: true, create: true, edit: true, delete: true, approve: false }, recruiter: { view: true, create: false, edit: true, delete: false, approve: false }, superAdmin: { view: true, create: true, edit: true, delete: true, approve: true } },
  { module: "AI Features", candidate: { view: true, create: true, edit: false, delete: false, approve: false }, company: { view: true, create: true, edit: false, delete: false, approve: false }, recruiter: { view: true, create: true, edit: false, delete: false, approve: false }, superAdmin: { view: true, create: true, edit: true, delete: true, approve: true } },
  { module: "Settings", candidate: { view: true, create: false, edit: true, delete: false, approve: false }, company: { view: true, create: false, edit: true, delete: false, approve: false }, recruiter: { view: true, create: false, edit: true, delete: false, approve: false }, superAdmin: { view: true, create: true, edit: true, delete: true, approve: true } },
];

export default function RolesPermissionsPage() {
  const [matrix, setMatrix] = useState<PermissionRule[]>(initialMatrix);
  const [viewRoleDrawer, setViewRoleDrawer] = useState<RoleDef | null>(null);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const togglePermission = (
    moduleIndex: number,
    roleKey: "candidate" | "company" | "recruiter" | "superAdmin",
    permKey: "view" | "create" | "edit" | "delete" | "approve"
  ) => {
    if (roleKey === "superAdmin") {
      showToast("Super Admin permissions are system locked and cannot be modified.");
      return;
    }

    setMatrix((prev) =>
      prev.map((rule, idx) => {
        if (idx !== moduleIndex) return rule;
        return {
          ...rule,
          [roleKey]: {
            ...rule[roleKey],
            [permKey]: !rule[roleKey][permKey],
          },
        };
      })
    );
  };

  const handleSaveChanges = () => {
    showToast("Permission matrix changes saved successfully.");
  };

  const handleConfirmResetDefaults = () => {
    setMatrix(initialMatrix);
    showToast("Permission matrix reset to platform factory defaults.");
    setResetModalOpen(false);
  };

  return (
    <AdminLayout>
      <Breadcrumb items={[{ label: "Super Admin" }, { label: "Roles & Permissions" }]} className="mb-2" />

      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-lg border border-slate-800 text-xs font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Roles & Permissions</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage user roles and access permissions across RakNova.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setResetModalOpen(true)} className="text-xs font-semibold">
            Reset to Default
          </Button>
          <Button variant="primary" size="sm" onClick={handleSaveChanges} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold">
            Save Permission Matrix
          </Button>
        </div>
      </div>

      {/* Roles Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {initialRoles.map((role) => (
          <div key={role.id} className="bg-white rounded-3xl border border-slate-200 p-4 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">{role.name}</h4>
                <Badge
                  variant="default"
                  className={role.status === "System Locked" ? "bg-slate-100 text-slate-700" : "bg-emerald-50 text-emerald-800"}
                >
                  {role.status}
                </Badge>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2">{role.description}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-extrabold text-slate-900">{role.userCount.toLocaleString()} Users</span>
              <button onClick={() => setViewRoleDrawer(role)} className="text-indigo-600 font-bold hover:underline">
                View Role
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Permission Matrix */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 font-bold text-sm text-slate-900 flex justify-between items-center">
          <span>Enterprise Access Control Permission Matrix</span>
          <span className="text-xs text-slate-500 font-normal">Click any checkbox to grant or revoke capability</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 w-40">System Module</th>
                <th className="py-3 px-4 text-center">Candidate (View/Create/Edit/Del)</th>
                <th className="py-3 px-4 text-center">Company Admin (V/C/E/D/Appr)</th>
                <th className="py-3 px-4 text-center">Recruiter (V/C/E/D/Appr)</th>
                <th className="py-3 px-4 text-center">Super Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {matrix.map((rule, idx) => (
                <tr key={rule.module} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">{rule.module}</td>
                  
                  {/* Candidate Column */}
                  <td className="py-3 px-4 text-center space-x-2">
                    <label className="inline-flex items-center gap-1 cursor-pointer">
                      <input type="checkbox" checked={rule.candidate.view} onChange={() => togglePermission(idx, "candidate", "view")} />
                      <span className="text-[10px]">View</span>
                    </label>
                    <label className="inline-flex items-center gap-1 cursor-pointer">
                      <input type="checkbox" checked={rule.candidate.create} onChange={() => togglePermission(idx, "candidate", "create")} />
                      <span className="text-[10px]">Create</span>
                    </label>
                    <label className="inline-flex items-center gap-1 cursor-pointer">
                      <input type="checkbox" checked={rule.candidate.edit} onChange={() => togglePermission(idx, "candidate", "edit")} />
                      <span className="text-[10px]">Edit</span>
                    </label>
                  </td>

                  {/* Company Column */}
                  <td className="py-3 px-4 text-center space-x-2">
                    <label className="inline-flex items-center gap-1 cursor-pointer">
                      <input type="checkbox" checked={rule.company.view} onChange={() => togglePermission(idx, "company", "view")} />
                      <span className="text-[10px]">View</span>
                    </label>
                    <label className="inline-flex items-center gap-1 cursor-pointer">
                      <input type="checkbox" checked={rule.company.create} onChange={() => togglePermission(idx, "company", "create")} />
                      <span className="text-[10px]">Create</span>
                    </label>
                    <label className="inline-flex items-center gap-1 cursor-pointer">
                      <input type="checkbox" checked={rule.company.edit} onChange={() => togglePermission(idx, "company", "edit")} />
                      <span className="text-[10px]">Edit</span>
                    </label>
                  </td>

                  {/* Recruiter Column */}
                  <td className="py-3 px-4 text-center space-x-2">
                    <label className="inline-flex items-center gap-1 cursor-pointer">
                      <input type="checkbox" checked={rule.recruiter.view} onChange={() => togglePermission(idx, "recruiter", "view")} />
                      <span className="text-[10px]">View</span>
                    </label>
                    <label className="inline-flex items-center gap-1 cursor-pointer">
                      <input type="checkbox" checked={rule.recruiter.edit} onChange={() => togglePermission(idx, "recruiter", "edit")} />
                      <span className="text-[10px]">Edit</span>
                    </label>
                  </td>

                  {/* Super Admin Column */}
                  <td className="py-3 px-4 text-center">
                    <Badge variant="default" className="bg-slate-900 text-white font-mono text-[10px]">
                      FULL ACCESS
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permission Change Audit History */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs space-y-3 text-xs">
        <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Recent Permission Audit Changes</h3>
        <div className="space-y-2">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-900">Updated Recruiter Application Management Edit Right</p>
              <span className="text-[10px] text-slate-400">By Super Admin (admin@raknova.com)</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">2026-03-27 16:20:00</span>
          </div>
        </div>
      </div>

      {/* VIEW ROLE SIDE DRAWER */}
      {viewRoleDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-slate-900">Role Specification Details</h3>
                <button onClick={() => setViewRoleDrawer(null)} className="text-slate-400 hover:text-slate-700 font-bold">
                  ✕
                </button>
              </div>

              <div>
                <Badge variant="default" className="bg-indigo-50 text-indigo-800 border-indigo-200 mb-1">
                  {viewRoleDrawer.status}
                </Badge>
                <h4 className="text-lg font-bold text-slate-900">{viewRoleDrawer.name}</h4>
                <p className="text-xs text-slate-500 mt-1">{viewRoleDrawer.description}</p>
              </div>

              <div className="space-y-2 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div><span className="font-bold text-slate-500">Assigned Accounts:</span> <span className="text-slate-900 font-bold">{viewRoleDrawer.userCount.toLocaleString()} Users</span></div>
                <div><span className="font-bold text-slate-500">Last Matrix Update:</span> <span className="text-slate-900 font-medium">{viewRoleDrawer.lastUpdated}</span></div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setViewRoleDrawer(null)} className="w-full text-xs">
                Close Panel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* RESET CONFIRMATION MODAL */}
      {resetModalOpen && (
        <Modal isOpen={true} onClose={() => setResetModalOpen(false)} title="Reset Permission Matrix to Defaults" size="sm">
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Are you sure you want to reset all role permissions to the original factory default settings? Custom granted rights will be restored.
            </p>
            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setResetModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleConfirmResetDefaults} className="bg-rose-600 hover:bg-rose-700 text-white font-bold">
                Confirm Reset
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </AdminLayout>
  );
}
