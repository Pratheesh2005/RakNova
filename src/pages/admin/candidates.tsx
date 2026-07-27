import { useState } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { mockAdminCandidates, AdminCandidate } from "@/data/admin/adminData";
import { cn } from "@/utils/cn";

export default function CandidateManagementPage() {
  const [candidates, setCandidates] = useState<AdminCandidate[]>(mockAdminCandidates);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [experienceFilter, setExperienceFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // Drawers and Modals
  const [drawerCandidate, setDrawerCandidate] = useState<AdminCandidate | null>(null);
  const [editModalCandidate, setEditModalCandidate] = useState<AdminCandidate | null>(null);
  const [deleteModalCandidate, setDeleteModalCandidate] = useState<AdminCandidate | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // KPIs
  const totalCandidates = candidates.length;
  const activeCandidates = candidates.filter((c) => c.status === "Active").length;
  const availableCandidates = candidates.filter((c) => c.status === "Available").length;
  const hiredCandidates = candidates.filter((c) => c.status === "Hired").length;
  const suspendedCandidates = candidates.filter((c) => c.status === "Suspended").length;
  const newRegistrations = candidates.filter((c) => c.registrationDate.startsWith("2026")).length;

  const filteredCandidates = candidates
    .filter((c) => {
      const q = search.toLowerCase();
      const matchesSearch =
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.skills.some((s) => s.toLowerCase().includes(q));

      const matchesStatus = statusFilter === "All" || c.status === statusFilter;
      const matchesExp = experienceFilter === "All" || c.experience === experienceFilter;
      const matchesAvail = availabilityFilter === "All" || c.availability === availabilityFilter;

      return matchesSearch && matchesStatus && matchesExp && matchesAvail;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime();
      if (sortBy === "oldest") return new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime();
      if (sortBy === "a-z") return a.name.localeCompare(b.name);
      return 0;
    });

  // REAL WORKING ACTIONS
  const handleStatusToggle = (id: string, name: string, currentStatus: string) => {
    const nextStatus = currentStatus === "Suspended" ? "Available" : "Suspended";
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: nextStatus as any } : c))
    );
    showToast(`Candidate ${name} status updated to ${nextStatus}.`);
  };

  const handleConfirmDelete = () => {
    if (!deleteModalCandidate) return;
    setCandidates((prev) => prev.filter((c) => c.id !== deleteModalCandidate.id));
    showToast(`Candidate ${deleteModalCandidate.name} was permanently deleted.`);
    setDeleteModalCandidate(null);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModalCandidate) return;
    setCandidates((prev) =>
      prev.map((c) => (c.id === editModalCandidate.id ? { ...editModalCandidate } : c))
    );
    showToast(`Candidate profile updated for ${editModalCandidate.name}.`);
    setEditModalCandidate(null);
  };

  return (
    <AdminLayout>
      <Breadcrumb items={[{ label: "Super Admin" }, { label: "Candidate Management" }]} className="mb-2" />

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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Candidate Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage all registered candidates across the RakNova platform.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={() => showToast("Exporting candidate directory to CSV...")} className="text-xs font-semibold">
          Export Candidates (CSV)
        </Button>
      </div>

      {/* Top Summary (6 Useful KPIs) */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Candidates</span>
          <div className="text-xl font-extrabold text-slate-900">{totalCandidates}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Active Candidates</span>
          <div className="text-xl font-extrabold text-indigo-600">{activeCandidates}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">New Registrations</span>
          <div className="text-xl font-extrabold text-purple-600">{newRegistrations}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Available for Work</span>
          <div className="text-xl font-extrabold text-emerald-600">{availableCandidates}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Candidates Hired</span>
          <div className="text-xl font-extrabold text-blue-600">{hiredCandidates}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Suspended</span>
          <div className="text-xl font-extrabold text-rose-600">{suspendedCandidates}</div>
        </div>
      </div>

      {/* Search & Filters Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          
          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidate name, email, phone, skills, or location..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
          >
            <option value="All">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Active">Active</option>
            <option value="Hired">Hired</option>
            <option value="Suspended">Suspended</option>
          </select>

          {/* Experience Filter */}
          <select
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
          >
            <option value="All">All Experience Levels</option>
            <option value="1-3 years">1-3 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="5+ years">5+ years</option>
          </select>

          {/* Availability Filter */}
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
          >
            <option value="All">All Availability</option>
            <option value="Immediate">Immediate</option>
            <option value="1 Month">1 Month Notice</option>
          </select>

        </div>

        {/* Sort Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <span className="font-bold text-slate-500">
            Showing {filteredCandidates.length} of {totalCandidates} Candidates
          </span>

          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-medium"
            >
              <option value="newest">Registration: Newest First</option>
              <option value="oldest">Registration: Oldest First</option>
              <option value="a-z">Candidate Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Enterprise Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        {filteredCandidates.length === 0 ? (
          /* Empty State */
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 font-bold flex items-center justify-center mx-auto text-base">
              ?
            </div>
            <h3 className="text-base font-bold text-slate-900">No Candidates Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No registered candidate profiles match your filter options. Reset filters to view all entries.
            </p>
            <Button variant="outline" size="sm" onClick={() => { setSearch(""); setStatusFilter("All"); setExperienceFilter("All"); setAvailabilityFilter("All"); }}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200 sticky top-0">
                <tr>
                  <th className="py-3 px-4">Candidate Name</th>
                  <th className="py-3 px-4">Contact Info</th>
                  <th className="py-3 px-4">Experience</th>
                  <th className="py-3 px-4">Current Role</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Applications</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Last Active</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {filteredCandidates.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{c.name}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{c.headline}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      <div>{c.email}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{c.phone}</div>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">{c.experience}</td>
                    <td className="py-3 px-4 text-slate-600">{c.currentRole}</td>
                    <td className="py-3 px-4 text-slate-600">{c.location}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{c.applicationsCount}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="default"
                        className={
                          c.status === "Available" || c.status === "Active"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200 font-bold"
                            : c.status === "Hired"
                            ? "bg-blue-50 text-blue-800 border-blue-200 font-bold"
                            : "bg-rose-50 text-rose-800 border-rose-200 font-bold"
                        }
                      >
                        {c.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{c.lastActivity}</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button onClick={() => setDrawerCandidate(c)} className="text-indigo-600 font-bold hover:underline">
                        View Profile
                      </button>

                      <button onClick={() => setEditModalCandidate(c)} className="text-slate-600 font-semibold hover:underline">
                        Edit
                      </button>

                      <button onClick={() => handleStatusToggle(c.id, c.name, c.status)} className="text-amber-700 font-semibold hover:underline">
                        {c.status === "Suspended" ? "Activate" : "Suspend"}
                      </button>

                      <button onClick={() => setDeleteModalCandidate(c)} className="text-rose-600 font-semibold hover:underline">
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

      {/* VIEW PROFILE SIDE DRAWER */}
      {drawerCandidate && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-slate-900">Candidate Detailed Profile</h3>
                <button onClick={() => setDrawerCandidate(null)} className="text-slate-400 hover:text-slate-700 font-bold">
                  ✕
                </button>
              </div>

              {/* Profile Banner */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-extrabold flex items-center justify-center text-xl shadow-xs">
                  {drawerCandidate.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{drawerCandidate.name}</h4>
                  <p className="text-xs text-indigo-600 font-bold">{drawerCandidate.headline}</p>
                  <p className="text-xs text-slate-500">{drawerCandidate.location}</p>
                </div>
              </div>

              {/* Details Box */}
              <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div><span className="font-bold text-slate-500">Email Address:</span> <span className="text-slate-900 font-medium">{drawerCandidate.email}</span></div>
                <div><span className="font-bold text-slate-500">Phone:</span> <span className="text-slate-900 font-medium">{drawerCandidate.phone}</span></div>
                <div><span className="font-bold text-slate-500">Education:</span> <span className="text-slate-900 font-medium">{drawerCandidate.education}</span></div>
                <div><span className="font-bold text-slate-500">Experience:</span> <span className="text-slate-900 font-medium">{drawerCandidate.experience}</span></div>
                <div><span className="font-bold text-slate-500">Availability:</span> <span className="text-emerald-700 font-bold">{drawerCandidate.availability}</span></div>
                <div><span className="font-bold text-slate-500">Resume File:</span> <span className="text-indigo-600 font-bold hover:underline cursor-pointer ml-1">{drawerCandidate.resumeFileName}</span></div>
                <div><span className="font-bold text-slate-500">Skills:</span> <div className="flex flex-wrap gap-1 mt-1">{drawerCandidate.skills.map((s, idx) => <Badge key={idx} variant="default" className="bg-slate-200 text-slate-800">{s}</Badge>)}</div></div>
              </div>

              {/* Platform Metrics */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs">
                <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Candidate Activity Summary</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-slate-500 block text-[10px] uppercase font-bold">Applications Submitted</span><strong className="text-slate-900 text-sm font-extrabold">{drawerCandidate.applicationsCount}</strong></div>
                  <div><span className="text-slate-500 block text-[10px] uppercase font-bold">Saved Jobs</span><strong className="text-indigo-600 text-sm font-extrabold">{drawerCandidate.savedJobsCount}</strong></div>
                  <div><span className="text-slate-500 block text-[10px] uppercase font-bold">Interviews Attended</span><strong className="text-purple-600 text-sm font-extrabold">{drawerCandidate.interviewHistoryCount}</strong></div>
                  <div><span className="text-slate-500 block text-[10px] uppercase font-bold">AI ATS Reports</span><strong className="text-emerald-600 text-sm font-extrabold">{drawerCandidate.aiReportsCount}</strong></div>
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-slate-900">Recent Activity Timeline</h4>
                {drawerCandidate.activityTimeline && drawerCandidate.activityTimeline.length > 0 ? (
                  drawerCandidate.activityTimeline.map((act) => (
                    <div key={act.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-0.5">
                      <p className="font-bold text-slate-800">{act.action}</p>
                      <span className="text-[10px] text-slate-400">{act.timestamp}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 italic">No recent logged activities.</p>
                )}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-4 border-t border-slate-100 flex gap-2">
              <Button variant="outline" size="sm" onClick={() => { setEditModalCandidate(drawerCandidate); setDrawerCandidate(null); }} className="flex-1 text-xs">
                Edit Candidate
              </Button>
              <Button variant="primary" size="sm" onClick={() => showToast(`Resume downloaded for ${drawerCandidate.name}`)} className="flex-1 bg-indigo-600 text-white text-xs">
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT CANDIDATE MODAL */}
      {editModalCandidate && (
        <Modal isOpen={true} onClose={() => setEditModalCandidate(null)} title="Edit Candidate Profile" size="md">
          <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={editModalCandidate.name}
                  onChange={(e) => setEditModalCandidate({ ...editModalCandidate, name: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={editModalCandidate.email}
                  onChange={(e) => setEditModalCandidate({ ...editModalCandidate, email: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={editModalCandidate.phone}
                  onChange={(e) => setEditModalCandidate({ ...editModalCandidate, phone: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Location</label>
                <input
                  type="text"
                  value={editModalCandidate.location}
                  onChange={(e) => setEditModalCandidate({ ...editModalCandidate, location: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Experience Level</label>
                <select
                  value={editModalCandidate.experience}
                  onChange={(e) => setEditModalCandidate({ ...editModalCandidate, experience: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                >
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Status</label>
                <select
                  value={editModalCandidate.status}
                  onChange={(e) => setEditModalCandidate({ ...editModalCandidate, status: e.target.value as any })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                >
                  <option value="Available">Available</option>
                  <option value="Active">Active</option>
                  <option value="Hired">Hired</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Skills (Comma separated)</label>
              <input
                type="text"
                value={editModalCandidate.skills.join(", ")}
                onChange={(e) => setEditModalCandidate({ ...editModalCandidate, skills: e.target.value.split(",").map((s) => s.trim()) })}
                className="w-full border border-slate-300 rounded-xl p-2 font-medium"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setEditModalCandidate(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModalCandidate && (
        <Modal isOpen={true} onClose={() => setDeleteModalCandidate(null)} title="Confirm Candidate Deletion" size="sm">
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Are you sure you want to permanently delete candidate <strong className="text-slate-900">{deleteModalCandidate.name}</strong> ({deleteModalCandidate.email})? This action cannot be undone and will delete all associated resume reports and application data.
            </p>
            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setDeleteModalCandidate(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleConfirmDelete} className="bg-rose-600 hover:bg-rose-700 text-white font-bold">
                Confirm Permanent Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </AdminLayout>
  );
}
