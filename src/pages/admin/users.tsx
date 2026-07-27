import { useState } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { mockAdminUsers, mockAdminUserKPIs, AdminUser } from "@/data/admin/adminData";
import { cn } from "@/utils/cn";

export default function UserManagementPage() {
  const [users, setUsers] = useState<AdminUser[]>(mockAdminUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [verificationFilter, setVerificationFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  
  const [drawerUser, setDrawerUser] = useState<AdminUser | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<AdminUser | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredUsers = users
    .filter((u) => {
      const q = search.toLowerCase();
      const matchesSearch =
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.toLowerCase().includes(q) ||
        (u.companyName && u.companyName.toLowerCase().includes(q));
      
      const matchesRole = roleFilter === "All" || u.role === roleFilter;
      const matchesStatus = statusFilter === "All" || u.status === statusFilter;
      const matchesVerification = verificationFilter === "All" || u.verificationStatus === verificationFilter;

      return matchesSearch && matchesRole && matchesStatus && matchesVerification;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime();
      if (sortBy === "oldest") return new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime();
      if (sortBy === "a-z") return a.name.localeCompare(b.name);
      return 0;
    });

  const toggleSelectUser = (id: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkAction = (action: "Activate" | "Deactivate" | "Suspend" | "Delete") => {
    if (selectedUserIds.length === 0) return;

    if (action === "Delete") {
      setUsers((prev) => prev.filter((u) => !selectedUserIds.includes(u.id)));
      showToast(`Successfully deleted ${selectedUserIds.length} selected user(s).`);
    } else {
      setUsers((prev) =>
        prev.map((u) => (selectedUserIds.includes(u.id) ? { ...u, status: action as any } : u))
      );
      showToast(`Updated status to ${action} for ${selectedUserIds.length} user(s).`);
    }
    setSelectedUserIds([]);
  };

  const confirmSingleDelete = () => {
    if (deleteCandidate) {
      setUsers((prev) => prev.filter((u) => u.id !== deleteCandidate.id));
      showToast(`User ${deleteCandidate.name} was permanently removed.`);
      setDeleteCandidate(null);
    }
  };

  const handleUserStatusUpdate = (id: string, newStatus: AdminUser["status"]) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u)));
    showToast(`User status updated to ${newStatus}.`);
  };

  const handleResetPassword = (email: string) => {
    showToast(`Password reset link dispatched to ${email}.`);
  };

  const handleVerifyUser = (id: string) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, verificationStatus: "Verified" } : u)));
    showToast(`User account verification completed.`);
  };

  return (
    <AdminLayout>
      <Breadcrumb items={[{ label: "Super Admin" }, { label: "User Management" }]} className="mb-2" />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-lg border border-slate-800 text-xs font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">User Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage all users registered on the RakNova platform.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setExportModalOpen(true)} className="text-xs font-semibold">
            Export Users
          </Button>
          <Button variant="primary" size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs">
            + Create User
          </Button>
        </div>
      </div>

      {/* Top KPI Cards (8 Metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {mockAdminUserKPIs.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-2xl border border-slate-200 p-3 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{kpi.label}</span>
            <div className="text-base font-extrabold text-slate-900">{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Search & Filters Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          
          {/* Global Search */}
          <div className="md:col-span-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, phone, or company..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
          >
            <option value="All">All Roles</option>
            <option value="Candidate">Candidate</option>
            <option value="Recruiter">Recruiter</option>
            <option value="Company Admin">Company Admin</option>
            <option value="Super Admin">Super Admin</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
            <option value="Deactivated">Deactivated</option>
          </select>

          {/* Verification Filter */}
          <select
            value={verificationFilter}
            onChange={(e) => setVerificationFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
          >
            <option value="All">All Verifications</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending</option>
            <option value="Unverified">Unverified</option>
          </select>

        </div>

        {/* Action Controls & Sort Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500">Bulk Actions ({selectedUserIds.length}):</span>
            <Button
              variant="outline"
              size="sm"
              disabled={selectedUserIds.length === 0}
              onClick={() => handleBulkAction("Activate")}
              className="text-[11px] font-bold"
            >
              Activate
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={selectedUserIds.length === 0}
              onClick={() => handleBulkAction("Suspend")}
              className="text-[11px] font-bold text-amber-700"
            >
              Suspend
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={selectedUserIds.length === 0}
              onClick={() => handleBulkAction("Delete")}
              className="text-[11px] font-bold text-rose-700"
            >
              Delete
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-medium"
            >
              <option value="newest">Registration: Newest First</option>
              <option value="oldest">Registration: Oldest First</option>
              <option value="a-z">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enterprise Users Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        {filteredUsers.length === 0 ? (
          /* Empty State */
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 font-bold flex items-center justify-center mx-auto text-base">
              ?
            </div>
            <h3 className="text-base font-bold text-slate-900">No Users Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No registered user accounts match your current search terms and filter settings. Try adjusting your parameters.
            </p>
            <Button variant="outline" size="sm" onClick={() => { setSearch(""); setRoleFilter("All"); setStatusFilter("All"); setVerificationFilter("All"); }}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200 sticky top-0">
                <tr>
                  <th className="py-3 px-4 w-8">
                    <input
                      type="checkbox"
                      checked={selectedUserIds.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={() =>
                        setSelectedUserIds(
                          selectedUserIds.length === filteredUsers.length
                            ? []
                            : filteredUsers.map((u) => u.id)
                        )
                      }
                    />
                  </th>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Contact Info</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Verification</th>
                  <th className="py-3 px-4">Reg Date</th>
                  <th className="py-3 px-4">Last Login</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedUserIds.includes(u.id)}
                        onChange={() => toggleSelectUser(u.id)}
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{u.name}</div>
                          {u.companyName && <div className="text-[10px] text-slate-400 font-normal">{u.companyName}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="default" className="bg-indigo-50 text-indigo-800 border-indigo-200">
                        {u.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      <div>{u.email}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{u.phone}</div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="default"
                        className={
                          u.status === "Active"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : u.status === "Inactive"
                            ? "bg-slate-100 text-slate-700 border-slate-200"
                            : "bg-rose-50 text-rose-800 border-rose-200"
                        }
                      >
                        {u.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-md text-[10px] font-bold border",
                          u.verificationStatus === "Verified"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : u.verificationStatus === "Pending"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        )}
                      >
                        {u.verificationStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{u.registrationDate}</td>
                    <td className="py-3 px-4 text-slate-500">{u.lastLogin}</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button onClick={() => setDrawerUser(u)} className="text-indigo-600 font-bold hover:underline">
                        View Profile
                      </button>
                      {u.status === "Active" ? (
                        <button onClick={() => handleUserStatusUpdate(u.id, "Suspended")} className="text-amber-700 font-semibold hover:underline">
                          Suspend
                        </button>
                      ) : (
                        <button onClick={() => handleUserStatusUpdate(u.id, "Active")} className="text-emerald-700 font-semibold hover:underline">
                          Activate
                        </button>
                      )}
                      <button onClick={() => setDeleteCandidate(u)} className="text-rose-600 font-semibold hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Profile Side Drawer */}
      {drawerUser && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-slate-900">User Profile Details</h3>
                <button onClick={() => setDrawerUser(null)} className="text-slate-400 hover:text-slate-700 font-bold">
                  ✕
                </button>
              </div>

              {/* User Bio Header */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-extrabold flex items-center justify-center text-xl shadow-xs">
                  {drawerUser.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{drawerUser.name}</h4>
                  <p className="text-xs text-indigo-600 font-bold">{drawerUser.role}</p>
                  <p className="text-xs text-slate-500">{drawerUser.location}</p>
                </div>
              </div>

              {/* User Details Grid */}
              <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div><span className="font-bold text-slate-500">Email:</span> <span className="text-slate-900 font-medium">{drawerUser.email}</span></div>
                <div><span className="font-bold text-slate-500">Phone:</span> <span className="text-slate-900 font-medium">{drawerUser.phone}</span></div>
                <div><span className="font-bold text-slate-500">Registered:</span> <span className="text-slate-900 font-medium">{drawerUser.registrationDate}</span></div>
                <div><span className="font-bold text-slate-500">Last Login:</span> <span className="text-slate-900 font-medium">{drawerUser.lastLogin}</span></div>
                {drawerUser.companyName && <div><span className="font-bold text-slate-500">Company:</span> <span className="text-slate-900 font-medium">{drawerUser.companyName}</span></div>}
                {drawerUser.bio && <div><span className="font-bold text-slate-500">Bio:</span> <p className="text-slate-700 mt-1">{drawerUser.bio}</p></div>}
              </div>

              {/* Activity Timeline */}
              <div className="space-y-3 text-xs">
                <h4 className="font-bold text-slate-900">Recent User Activity</h4>
                <div className="space-y-2">
                  {drawerUser.activityTimeline.map((act) => (
                    <div key={act.id} className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-0.5">
                      <p className="font-bold text-slate-800">{act.action}</p>
                      <span className="text-[10px] text-slate-400">{act.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Actions */}
            <div className="pt-4 border-t border-slate-100 flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleResetPassword(drawerUser.email)} className="flex-1 text-xs">
                Reset Password
              </Button>
              {drawerUser.verificationStatus !== "Verified" && (
                <Button variant="primary" size="sm" onClick={() => handleVerifyUser(drawerUser.id)} className="flex-1 bg-emerald-600 text-white text-xs">
                  Verify Account
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <Modal isOpen={true} onClose={() => setDeleteCandidate(null)} title="Confirm User Deletion" size="sm">
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Are you sure you want to permanently delete user <strong className="text-slate-900">{deleteCandidate.name}</strong> ({deleteCandidate.email})? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setDeleteCandidate(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={confirmSingleDelete} className="bg-rose-600 hover:bg-rose-700 text-white font-bold">
                Confirm Permanent Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Export Modal */}
      {exportModalOpen && (
        <Modal isOpen={true} onClose={() => setExportModalOpen(false)} title="Export User Records" size="sm">
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">Choose your preferred export file format:</p>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" onClick={() => { showToast("Exporting users to CSV format..."); setExportModalOpen(false); }}>
                CSV Format
              </Button>
              <Button variant="outline" size="sm" onClick={() => { showToast("Exporting users to Excel format..."); setExportModalOpen(false); }}>
                Excel XLSX
              </Button>
              <Button variant="outline" size="sm" onClick={() => { showToast("Exporting user report to PDF format..."); setExportModalOpen(false); }}>
                PDF Report
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </AdminLayout>
  );
}
