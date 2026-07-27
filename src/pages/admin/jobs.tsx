import { useState } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { mockAdminJobs, mockAdminCompanies, AdminJob } from "@/data/admin/adminData";

export default function JobManagementPage() {
  const [jobs, setJobs] = useState<AdminJob[]>(mockAdminJobs);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [workModeFilter, setWorkModeFilter] = useState("All");
  const [companyFilter, setCompanyFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // Drawers and Modals
  const [viewDrawerJob, setViewDrawerJob] = useState<AdminJob | null>(null);
  const [editModalJob, setEditModalJob] = useState<AdminJob | null>(null);
  const [deleteModalJob, setDeleteModalJob] = useState<AdminJob | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // KPIs
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter((j) => j.status === "Published").length;
  const draftJobs = jobs.filter((j) => j.status === "Draft").length;
  const closedJobs = jobs.filter((j) => j.status === "Closed").length;
  const expiredJobs = jobs.filter((j) => j.status === "Expired").length;
  const totalApplications = jobs.reduce((acc, curr) => acc + curr.applications, 0);

  const filteredJobs = jobs
    .filter((j) => {
      const q = search.toLowerCase();
      const matchesSearch =
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q) ||
        j.requiredSkills.some((s) => s.toLowerCase().includes(q));

      const matchesStatus = statusFilter === "All" || j.status === statusFilter;
      const matchesType = typeFilter === "All" || j.employmentType === typeFilter;
      const matchesMode = workModeFilter === "All" || j.workMode === workModeFilter;
      const matchesCompany = companyFilter === "All" || j.company === companyFilter;

      return matchesSearch && matchesStatus && matchesType && matchesMode && matchesCompany;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      if (sortBy === "oldest") return new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime();
      if (sortBy === "a-z") return a.title.localeCompare(b.title);
      return 0;
    });

  // REAL WORKING ACTIONS
  const handleStatusChange = (id: string, title: string, newStatus: AdminJob["status"]) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status: newStatus } : j)));
    showToast(`Job posting '${title}' status updated to ${newStatus}.`);
  };

  const handleConfirmDelete = () => {
    if (!deleteModalJob) return;
    setJobs((prev) => prev.filter((j) => j.id !== deleteModalJob.id));
    showToast(`Job posting '${deleteModalJob.title}' was permanently deleted.`);
    setDeleteModalJob(null);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModalJob) return;
    setJobs((prev) => prev.map((j) => (j.id === editModalJob.id ? { ...editModalJob } : j)));
    showToast(`Job details updated for '${editModalJob.title}'.`);
    setEditModalJob(null);
  };

  return (
    <AdminLayout>
      <Breadcrumb items={[{ label: "Super Admin" }, { label: "Job Management" }]} className="mb-2" />

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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Job Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage all job postings across the RakNova platform.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={() => showToast("Exporting job postings to CSV...")} className="text-xs font-semibold">
          Export Jobs (CSV)
        </Button>
      </div>

      {/* Top Summary (6 Useful KPIs) */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Jobs</span>
          <div className="text-xl font-extrabold text-slate-900">{totalJobs}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Active Jobs</span>
          <div className="text-xl font-extrabold text-emerald-600">{activeJobs}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Draft Jobs</span>
          <div className="text-xl font-extrabold text-amber-600">{draftJobs}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Closed Jobs</span>
          <div className="text-xl font-extrabold text-purple-600">{closedJobs}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Expired Jobs</span>
          <div className="text-xl font-extrabold text-rose-600">{expiredJobs}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Applications Received</span>
          <div className="text-xl font-extrabold text-indigo-600">{totalApplications}</div>
        </div>
      </div>

      {/* Search & Filters Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          
          {/* Search */}
          <div className="md:col-span-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search job title, company, location, or skills..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
          >
            <option value="All">All Job Statuses</option>
            <option value="Published">Published (Active)</option>
            <option value="Draft">Draft</option>
            <option value="Closed">Closed</option>
            <option value="Expired">Expired</option>
          </select>

          {/* Employment Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
          >
            <option value="All">All Employment Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>

          {/* Company Filter */}
          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
          >
            <option value="All">All Employers</option>
            {mockAdminCompanies.map((cmp) => (
              <option key={cmp.id} value={cmp.name}>{cmp.name}</option>
            ))}
          </select>

        </div>

        {/* Sort Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <span className="font-bold text-slate-500">
            Showing {filteredJobs.length} of {totalJobs} Job Postings
          </span>

          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-medium"
            >
              <option value="newest">Posted Date: Newest First</option>
              <option value="oldest">Posted Date: Oldest First</option>
              <option value="a-z">Job Title: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Enterprise Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        {filteredJobs.length === 0 ? (
          /* Empty State */
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 font-bold flex items-center justify-center mx-auto text-base">
              ?
            </div>
            <h3 className="text-base font-bold text-slate-900">No Job Postings Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No jobs match your filter parameters. Reset filters to view all entries.
            </p>
            <Button variant="outline" size="sm" onClick={() => { setSearch(""); setStatusFilter("All"); setTypeFilter("All"); setWorkModeFilter("All"); setCompanyFilter("All"); }}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200 sticky top-0">
                <tr>
                  <th className="py-3 px-4">Job Title</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Type & Mode</th>
                  <th className="py-3 px-4">Applications</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Posted Date</th>
                  <th className="py-3 px-4">Expiry Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {filteredJobs.map((j) => (
                  <tr key={j.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{j.title}</td>
                    <td className="py-3 px-4 text-slate-600">{j.company}</td>
                    <td className="py-3 px-4 text-slate-600">{j.department}</td>
                    <td className="py-3 px-4 text-slate-600">{j.location}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-700">{j.employmentType} ({j.workMode})</span>
                    </td>
                    <td className="py-3 px-4 font-bold text-indigo-600">{j.applications}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="default"
                        className={
                          j.status === "Published"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200 font-bold"
                            : j.status === "Draft"
                            ? "bg-amber-50 text-amber-800 border-amber-200 font-bold"
                            : "bg-rose-50 text-rose-800 border-rose-200 font-bold"
                        }
                      >
                        {j.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{j.postedDate}</td>
                    <td className="py-3 px-4 text-slate-500">{j.expiryDate}</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button onClick={() => setViewDrawerJob(j)} className="text-indigo-600 font-bold hover:underline">
                        View
                      </button>

                      <button onClick={() => setEditModalJob(j)} className="text-slate-600 font-semibold hover:underline">
                        Edit
                      </button>

                      {j.status === "Draft" ? (
                        <button onClick={() => handleStatusChange(j.id, j.title, "Published")} className="text-emerald-600 font-bold hover:underline">
                          Publish
                        </button>
                      ) : j.status === "Published" ? (
                        <button onClick={() => handleStatusChange(j.id, j.title, "Closed")} className="text-amber-700 font-semibold hover:underline">
                          Close
                        </button>
                      ) : (
                        <button onClick={() => handleStatusChange(j.id, j.title, "Published")} className="text-emerald-600 font-bold hover:underline">
                          Re-open
                        </button>
                      )}

                      <button onClick={() => setDeleteModalJob(j)} className="text-rose-600 font-semibold hover:underline">
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

      {/* VIEW JOB SIDE DRAWER */}
      {viewDrawerJob && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-slate-900">Job Posting Details</h3>
                <button onClick={() => setViewDrawerJob(null)} className="text-slate-400 hover:text-slate-700 font-bold">
                  ✕
                </button>
              </div>

              {/* Job Header */}
              <div>
                <Badge variant="default" className="bg-indigo-50 text-indigo-800 border-indigo-200 mb-1">
                  {viewDrawerJob.status}
                </Badge>
                <h4 className="text-lg font-bold text-slate-900">{viewDrawerJob.title}</h4>
                <p className="text-xs text-indigo-600 font-bold">{viewDrawerJob.company} • {viewDrawerJob.department}</p>
                <p className="text-xs text-slate-500">{viewDrawerJob.location} ({viewDrawerJob.workMode})</p>
              </div>

              {/* Details Box */}
              <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div><span className="font-bold text-slate-500">Employment Type:</span> <span className="text-slate-900 font-medium">{viewDrawerJob.employmentType}</span></div>
                <div><span className="font-bold text-slate-500">Salary Range:</span> <span className="text-emerald-700 font-bold">{viewDrawerJob.salaryRange}</span></div>
                <div><span className="font-bold text-slate-500">Experience Required:</span> <span className="text-slate-900 font-medium">{viewDrawerJob.experienceRequired}</span></div>
                <div><span className="font-bold text-slate-500">Recruiters Assigned:</span> <span className="text-slate-900 font-medium">{viewDrawerJob.recruitersAssigned}</span></div>
                <div><span className="font-bold text-slate-500">Posted Date:</span> <span className="text-slate-900 font-medium">{viewDrawerJob.postedDate}</span></div>
                <div><span className="font-bold text-slate-500">Expiry Date:</span> <span className="text-slate-900 font-medium">{viewDrawerJob.expiryDate}</span></div>
                <div><span className="font-bold text-slate-500">Required Skills:</span> <div className="flex flex-wrap gap-1 mt-1">{viewDrawerJob.requiredSkills.map((s, idx) => <Badge key={idx} variant="default" className="bg-slate-200 text-slate-800">{s}</Badge>)}</div></div>
                <div><span className="font-bold text-slate-500">Description:</span> <p className="text-slate-700 mt-1">{viewDrawerJob.description}</p></div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-4 border-t border-slate-100 flex gap-2">
              <Button variant="outline" size="sm" onClick={() => { setEditModalJob(viewDrawerJob); setViewDrawerJob(null); }} className="flex-1 text-xs">
                Edit Posting
              </Button>
              {viewDrawerJob.status === "Published" ? (
                <Button variant="primary" size="sm" onClick={() => { handleStatusChange(viewDrawerJob.id, viewDrawerJob.title, "Closed"); setViewDrawerJob(null); }} className="flex-1 bg-amber-600 text-white text-xs">
                  Close Job
                </Button>
              ) : (
                <Button variant="primary" size="sm" onClick={() => { handleStatusChange(viewDrawerJob.id, viewDrawerJob.title, "Published"); setViewDrawerJob(null); }} className="flex-1 bg-emerald-600 text-white text-xs">
                  Publish Job
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* EDIT JOB MODAL */}
      {editModalJob && (
        <Modal isOpen={true} onClose={() => setEditModalJob(null)} title="Edit Job Posting" size="md">
          <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Job Title</label>
                <input
                  type="text"
                  value={editModalJob.title}
                  onChange={(e) => setEditModalJob({ ...editModalJob, title: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Company</label>
                <input
                  type="text"
                  value={editModalJob.company}
                  onChange={(e) => setEditModalJob({ ...editModalJob, company: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Location</label>
                <input
                  type="text"
                  value={editModalJob.location}
                  onChange={(e) => setEditModalJob({ ...editModalJob, location: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Salary Range</label>
                <input
                  type="text"
                  value={editModalJob.salaryRange}
                  onChange={(e) => setEditModalJob({ ...editModalJob, salaryRange: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Employment Type</label>
                <select
                  value={editModalJob.employmentType}
                  onChange={(e) => setEditModalJob({ ...editModalJob, employmentType: e.target.value as any })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={editModalJob.expiryDate}
                  onChange={(e) => setEditModalJob({ ...editModalJob, expiryDate: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Required Skills (Comma separated)</label>
              <input
                type="text"
                value={editModalJob.requiredSkills.join(", ")}
                onChange={(e) => setEditModalJob({ ...editModalJob, requiredSkills: e.target.value.split(",").map((s) => s.trim()) })}
                className="w-full border border-slate-300 rounded-xl p-2 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Job Description</label>
              <textarea
                rows={3}
                value={editModalJob.description}
                onChange={(e) => setEditModalJob({ ...editModalJob, description: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-2 font-medium"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setEditModalJob(null)}>
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
      {deleteModalJob && (
        <Modal isOpen={true} onClose={() => setDeleteModalJob(null)} title="Confirm Job Deletion" size="sm">
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Are you sure you want to permanently delete job posting <strong className="text-slate-900">{deleteModalJob.title}</strong> at {deleteModalJob.company}? This will remove all associated candidate applications.
            </p>
            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setDeleteModalJob(null)}>
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
