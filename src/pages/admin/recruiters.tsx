import { useState } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { mockAdminRecruiters, mockAdminCompanies, AdminRecruiter } from "@/data/admin/adminData";
import { cn } from "@/utils/cn";

export default function RecruiterManagementPage() {
  const [recruiters, setRecruiters] = useState<AdminRecruiter[]>(mockAdminRecruiters);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [companyFilter, setCompanyFilter] = useState("All");
  const [experienceFilter, setExperienceFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // Working Drawers and Modals
  const [viewDrawerRecruiter, setViewDrawerRecruiter] = useState<AdminRecruiter | null>(null);
  const [editModalRecruiter, setEditModalRecruiter] = useState<AdminRecruiter | null>(null);
  const [assignModalRecruiter, setAssignModalRecruiter] = useState<AdminRecruiter | null>(null);
  const [selectedCompanyToAssign, setSelectedCompanyToAssign] = useState("");
  const [deleteModalRecruiter, setDeleteModalRecruiter] = useState<AdminRecruiter | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // KPI Calculations
  const totalRecruiters = recruiters.length;
  const activeRecruiters = recruiters.filter((r) => r.status === "Active").length;
  const inactiveRecruiters = recruiters.filter((r) => r.status === "Inactive" || r.status === "Suspended").length;
  
  const assignedCompaniesCount = new Set(
    recruiters.flatMap((r) => r.assignedCompanies || [r.assignedCompany])
  ).size;

  const totalOpenPositions = recruiters.reduce((acc, curr) => acc + (curr.openJobsCount || 0), 0);
  const totalInterviewsScheduled = recruiters.reduce((acc, curr) => acc + (curr.interviewsConducted || 0), 0);

  const filteredRecruiters = recruiters
    .filter((r) => {
      const q = search.toLowerCase();
      const matchesSearch =
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q) ||
        r.assignedCompany.toLowerCase().includes(q) ||
        r.assignedCompanies?.some((c) => c.toLowerCase().includes(q));

      const matchesStatus = statusFilter === "All" || r.status === statusFilter;
      const matchesCompany =
        companyFilter === "All" ||
        r.assignedCompany === companyFilter ||
        r.assignedCompanies?.includes(companyFilter);

      const matchesExp = experienceFilter === "All" || r.experience === experienceFilter;

      return matchesSearch && matchesStatus && matchesCompany && matchesExp;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime();
      if (sortBy === "oldest") return new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime();
      if (sortBy === "a-z") return a.name.localeCompare(b.name);
      return 0;
    });

  // REAL WORKING ACTIONS
  const handleStatusToggle = (id: string, name: string, currentStatus: string) => {
    const nextStatus = currentStatus === "Active" ? "Suspended" : "Active";
    setRecruiters((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: nextStatus as any } : r))
    );
    showToast(`Recruiter ${name} status updated to ${nextStatus}.`);
  };

  const handleConfirmDelete = () => {
    if (!deleteModalRecruiter) return;
    setRecruiters((prev) => prev.filter((r) => r.id !== deleteModalRecruiter.id));
    showToast(`Recruiter ${deleteModalRecruiter.name} was permanently removed.`);
    setDeleteModalRecruiter(null);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModalRecruiter) return;
    setRecruiters((prev) =>
      prev.map((r) => (r.id === editModalRecruiter.id ? { ...editModalRecruiter } : r))
    );
    showToast(`Recruiter profile updated for ${editModalRecruiter.name}.`);
    setEditModalRecruiter(null);
  };

  const handleAddCompanyAssignment = () => {
    if (!assignModalRecruiter || !selectedCompanyToAssign) return;

    const currentCompanies = assignModalRecruiter.assignedCompanies || [assignModalRecruiter.assignedCompany];
    if (currentCompanies.includes(selectedCompanyToAssign)) {
      alert("This company is already assigned to the recruiter.");
      return;
    }

    const updatedCompanies = [...currentCompanies, selectedCompanyToAssign];
    setRecruiters((prev) =>
      prev.map((r) =>
        r.id === assignModalRecruiter.id
          ? { ...r, assignedCompany: updatedCompanies[0], assignedCompanies: updatedCompanies }
          : r
      )
    );
    setAssignModalRecruiter({
      ...assignModalRecruiter,
      assignedCompany: updatedCompanies[0],
      assignedCompanies: updatedCompanies
    });
    showToast(`Assigned ${selectedCompanyToAssign} to ${assignModalRecruiter.name}.`);
    setSelectedCompanyToAssign("");
  };

  const handleRemoveCompanyAssignment = (companyName: string) => {
    if (!assignModalRecruiter) return;
    const currentCompanies = assignModalRecruiter.assignedCompanies || [assignModalRecruiter.assignedCompany];
    const updatedCompanies = currentCompanies.filter((c) => c !== companyName);

    if (updatedCompanies.length === 0) {
      alert("Recruiter must be assigned to at least one primary company.");
      return;
    }

    setRecruiters((prev) =>
      prev.map((r) =>
        r.id === assignModalRecruiter.id
          ? { ...r, assignedCompany: updatedCompanies[0], assignedCompanies: updatedCompanies }
          : r
      )
    );
    setAssignModalRecruiter({
      ...assignModalRecruiter,
      assignedCompany: updatedCompanies[0],
      assignedCompanies: updatedCompanies
    });
    showToast(`Removed company assignment '${companyName}'.`);
  };

  return (
    <AdminLayout>
      <Breadcrumb items={[{ label: "Super Admin" }, { label: "Recruiter Management" }]} className="mb-2" />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-lg border border-slate-800 text-xs font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Recruiter Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage recruiters working on the RakNova platform.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={() => showToast("Exporting recruiter roster to CSV...")} className="text-xs font-semibold">
          Export Recruiter Roster (CSV)
        </Button>
      </div>

      {/* Top Summary (6 Useful KPIs) */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Recruiters</span>
          <div className="text-xl font-extrabold text-slate-900">{totalRecruiters}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Active Recruiters</span>
          <div className="text-xl font-extrabold text-emerald-600">{activeRecruiters}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Inactive Recruiters</span>
          <div className="text-xl font-extrabold text-rose-600">{inactiveRecruiters}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Companies Assigned</span>
          <div className="text-xl font-extrabold text-indigo-600">{assignedCompaniesCount}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Open Jobs Managed</span>
          <div className="text-xl font-extrabold text-purple-600">{totalOpenPositions}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Interviews Scheduled</span>
          <div className="text-xl font-extrabold text-blue-600">{totalInterviewsScheduled}</div>
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
            placeholder="Search by recruiter name, email, phone, or company..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />

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
          </select>

          {/* Assigned Company Filter */}
          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
          >
            <option value="All">All Companies</option>
            {mockAdminCompanies.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
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

        </div>

        {/* Sort Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <span className="font-bold text-slate-500">
            Showing {filteredRecruiters.length} of {totalRecruiters} Recruiters
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
              <option value="a-z">Recruiter Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Enterprise Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        {filteredRecruiters.length === 0 ? (
          /* Empty State */
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 font-bold flex items-center justify-center mx-auto text-base">
              ?
            </div>
            <h3 className="text-base font-bold text-slate-900">No Recruiters Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No recruiter accounts match your filter options. Reset filters to view all entries.
            </p>
            <Button variant="outline" size="sm" onClick={() => { setSearch(""); setStatusFilter("All"); setCompanyFilter("All"); setExperienceFilter("All"); }}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200 sticky top-0">
                <tr>
                  <th className="py-3 px-4">Recruiter Name</th>
                  <th className="py-3 px-4">Contact Info</th>
                  <th className="py-3 px-4">Assigned Companies</th>
                  <th className="py-3 px-4">Open Jobs</th>
                  <th className="py-3 px-4">Candidates</th>
                  <th className="py-3 px-4">Interviews</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Last Login</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {filteredRecruiters.map((r) => {
                  const companyList = r.assignedCompanies || [r.assignedCompany];
                  return (
                    <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                            {r.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{r.name}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{r.department}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        <div>{r.email}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{r.phone}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {companyList.map((c, i) => (
                            <Badge key={i} variant="default" className="bg-indigo-50 text-indigo-800 border-indigo-200 font-bold">
                              {c}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">{r.openJobsCount || 4}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{r.candidatesManaged}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{r.interviewsConducted}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="default"
                          className={
                            r.status === "Active"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : r.status === "Inactive"
                              ? "bg-slate-100 text-slate-700 border-slate-200"
                              : "bg-rose-50 text-rose-800 border-rose-200"
                          }
                        >
                          {r.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{r.lastLogin}</td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button onClick={() => setViewDrawerRecruiter(r)} className="text-indigo-600 font-bold hover:underline">
                          View
                        </button>

                        <button onClick={() => setEditModalRecruiter(r)} className="text-slate-600 font-semibold hover:underline">
                          Edit
                        </button>

                        <button onClick={() => setAssignModalRecruiter(r)} className="text-purple-600 font-bold hover:underline">
                          Assign Co.
                        </button>

                        <button onClick={() => handleStatusToggle(r.id, r.name, r.status)} className="text-amber-700 font-semibold hover:underline">
                          {r.status === "Active" ? "Suspend" : "Activate"}
                        </button>

                        <button onClick={() => setDeleteModalRecruiter(r)} className="text-rose-600 font-semibold hover:underline">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* VIEW RECRUITER SIDE DRAWER */}
      {viewDrawerRecruiter && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-slate-900">Recruiter Profile & Performance</h3>
                <button onClick={() => setViewDrawerRecruiter(null)} className="text-slate-400 hover:text-slate-700 font-bold">
                  ✕
                </button>
              </div>

              {/* Recruiter Header */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-extrabold flex items-center justify-center text-xl shadow-xs">
                  {viewDrawerRecruiter.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{viewDrawerRecruiter.name}</h4>
                  <p className="text-xs text-indigo-600 font-bold">{viewDrawerRecruiter.department}</p>
                  <p className="text-xs text-slate-500">Experience: {viewDrawerRecruiter.experience}</p>
                </div>
              </div>

              {/* Details Box */}
              <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div><span className="font-bold text-slate-500">Email Address:</span> <span className="text-slate-900 font-medium">{viewDrawerRecruiter.email}</span></div>
                <div><span className="font-bold text-slate-500">Phone:</span> <span className="text-slate-900 font-medium">{viewDrawerRecruiter.phone}</span></div>
                <div><span className="font-bold text-slate-500">Assigned Companies:</span> <div className="flex flex-wrap gap-1 mt-1 font-bold">{viewDrawerRecruiter.assignedCompanies?.join(", ") || viewDrawerRecruiter.assignedCompany}</div></div>
                <div><span className="font-bold text-slate-500">Skills & Expertise:</span> <div className="flex flex-wrap gap-1 mt-1">{viewDrawerRecruiter.skills?.map((s, idx) => <Badge key={idx} variant="default" className="bg-slate-200 text-slate-800">{s}</Badge>)}</div></div>
                <div><span className="font-bold text-slate-500">Registered:</span> <span className="text-slate-900 font-medium">{viewDrawerRecruiter.registrationDate}</span></div>
                <div><span className="font-bold text-slate-500">Last Active:</span> <span className="text-slate-900 font-medium">{viewDrawerRecruiter.lastLogin}</span></div>
              </div>

              {/* Clean Performance Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs">
                <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Recruiter Performance Metrics</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-slate-500 block text-[10px] uppercase font-bold">Open Jobs Managed</span><strong className="text-slate-900 text-sm font-extrabold">{viewDrawerRecruiter.openJobsCount || 4}</strong></div>
                  <div><span className="text-slate-500 block text-[10px] uppercase font-bold">Candidates Reviewed</span><strong className="text-indigo-600 text-sm font-extrabold">{viewDrawerRecruiter.candidatesManaged}</strong></div>
                  <div><span className="text-slate-500 block text-[10px] uppercase font-bold">Interviews Conducted</span><strong className="text-purple-600 text-sm font-extrabold">{viewDrawerRecruiter.interviewsConducted}</strong></div>
                  <div><span className="text-slate-500 block text-[10px] uppercase font-bold">Placements Completed</span><strong className="text-emerald-600 text-sm font-extrabold">{viewDrawerRecruiter.placementsCompleted || 12}</strong></div>
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-slate-900">Recent Activity Timeline</h4>
                {viewDrawerRecruiter.activityTimeline && viewDrawerRecruiter.activityTimeline.length > 0 ? (
                  viewDrawerRecruiter.activityTimeline.map((act) => (
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
              <Button variant="outline" size="sm" onClick={() => { setEditModalRecruiter(viewDrawerRecruiter); setViewDrawerRecruiter(null); }} className="flex-1 text-xs">
                Edit Recruiter
              </Button>
              <Button variant="primary" size="sm" onClick={() => { setAssignModalRecruiter(viewDrawerRecruiter); setViewDrawerRecruiter(null); }} className="flex-1 bg-indigo-600 text-white text-xs">
                Assign Company
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT RECRUITER MODAL */}
      {editModalRecruiter && (
        <Modal isOpen={true} onClose={() => setEditModalRecruiter(null)} title="Edit Recruiter Information" size="md">
          <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={editModalRecruiter.name}
                  onChange={(e) => setEditModalRecruiter({ ...editModalRecruiter, name: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={editModalRecruiter.email}
                  onChange={(e) => setEditModalRecruiter({ ...editModalRecruiter, email: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={editModalRecruiter.phone}
                  onChange={(e) => setEditModalRecruiter({ ...editModalRecruiter, phone: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Department</label>
                <input
                  type="text"
                  value={editModalRecruiter.department}
                  onChange={(e) => setEditModalRecruiter({ ...editModalRecruiter, department: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Experience Level</label>
                <select
                  value={editModalRecruiter.experience}
                  onChange={(e) => setEditModalRecruiter({ ...editModalRecruiter, experience: e.target.value })}
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
                  value={editModalRecruiter.status}
                  onChange={(e) => setEditModalRecruiter({ ...editModalRecruiter, status: e.target.value as any })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Skills (Comma separated)</label>
              <input
                type="text"
                value={editModalRecruiter.skills?.join(", ") || ""}
                onChange={(e) => setEditModalRecruiter({ ...editModalRecruiter, skills: e.target.value.split(",").map((s) => s.trim()) })}
                className="w-full border border-slate-300 rounded-xl p-2 font-medium"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setEditModalRecruiter(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* ASSIGN COMPANY MODAL */}
      {assignModalRecruiter && (
        <Modal isOpen={true} onClose={() => setAssignModalRecruiter(null)} title={`Assign Corporate Clients — ${assignModalRecruiter.name}`} size="md">
          <div className="space-y-4 text-xs">
            
            {/* Currently Assigned */}
            <div className="space-y-2">
              <label className="font-bold text-slate-700 block">Currently Assigned Companies:</label>
              <div className="flex flex-wrap gap-2 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                {(assignModalRecruiter.assignedCompanies || [assignModalRecruiter.assignedCompany]).map((c) => (
                  <div key={c} className="flex items-center gap-1 bg-white border border-indigo-200 text-indigo-900 px-3 py-1 rounded-xl font-bold">
                    <span>{c}</span>
                    <button onClick={() => handleRemoveCompanyAssignment(c)} className="text-rose-600 hover:text-rose-800 font-bold ml-1">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add New Assignment */}
            <div className="space-y-2 pt-2">
              <label className="font-bold text-slate-700 block">Assign Additional Company:</label>
              <div className="flex gap-2">
                <select
                  value={selectedCompanyToAssign}
                  onChange={(e) => setSelectedCompanyToAssign(e.target.value)}
                  className="flex-1 border border-slate-300 rounded-xl p-2.5 font-medium"
                >
                  <option value="">Select a company to assign...</option>
                  {mockAdminCompanies.map((cmp) => (
                    <option key={cmp.id} value={cmp.name}>
                      {cmp.name} ({cmp.industry})
                    </option>
                  ))}
                </select>
                <Button variant="primary" size="sm" onClick={handleAddCompanyAssignment} disabled={!selectedCompanyToAssign} className="bg-indigo-600 text-white font-bold">
                  Assign
                </Button>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setAssignModalRecruiter(null)}>
                Done
              </Button>
            </div>

          </div>
        </Modal>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModalRecruiter && (
        <Modal isOpen={true} onClose={() => setDeleteModalRecruiter(null)} title="Confirm Recruiter Deletion" size="sm">
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Are you sure you want to permanently delete recruiter <strong className="text-slate-900">{deleteModalRecruiter.name}</strong> ({deleteModalRecruiter.email})? This action will unassign their active pipelines.
            </p>
            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setDeleteModalRecruiter(null)}>
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
