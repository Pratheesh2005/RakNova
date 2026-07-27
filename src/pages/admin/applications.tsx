import { useState } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { mockAdminApplications, mockAdminCompanies, AdminApplication } from "@/data/admin/adminData";

export default function ApplicationsManagementPage() {
  const [applications, setApplications] = useState<AdminApplication[]>(mockAdminApplications);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("All");
  const [companyFilter, setCompanyFilter] = useState("All");
  const [recruiterFilter, setRecruiterFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // Drawers and Modals
  const [viewDrawerApp, setViewDrawerApp] = useState<AdminApplication | null>(null);
  const [updateStatusModalApp, setUpdateStatusModalApp] = useState<AdminApplication | null>(null);
  const [selectedNewStage, setSelectedNewStage] = useState<AdminApplication["stage"]>("Screening");
  const [deleteModalApp, setDeleteModalApp] = useState<AdminApplication | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // KPIs
  const totalApps = applications.length;
  const newApps = applications.filter((a) => a.stage === "Applied").length;
  const underReview = applications.filter((a) => a.stage === "Screening").length;
  const interviewScheduled = applications.filter((a) => a.stage === "Interview").length;
  const offersSent = applications.filter((a) => a.stage === "Offer").length;
  const hired = applications.filter((a) => a.stage === "Hired").length;
  const rejected = applications.filter((a) => a.stage === "Rejected").length;

  const filteredApps = applications
    .filter((a) => {
      const q = search.toLowerCase();
      const matchesSearch =
        a.id.toLowerCase().includes(q) ||
        a.candidateName.toLowerCase().includes(q) ||
        a.jobTitle.toLowerCase().includes(q) ||
        a.companyName.toLowerCase().includes(q) ||
        a.recruiterName.toLowerCase().includes(q);

      const matchesStage = stageFilter === "All" || a.stage === stageFilter;
      const matchesCompany = companyFilter === "All" || a.companyName === companyFilter;
      const matchesRecruiter = recruiterFilter === "All" || a.recruiterName === recruiterFilter;

      return matchesSearch && matchesStage && matchesCompany && matchesRecruiter;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
      if (sortBy === "oldest") return new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime();
      if (sortBy === "a-z") return a.candidateName.localeCompare(b.candidateName);
      return 0;
    });

  // REAL WORKING ACTIONS
  const handleConfirmUpdateStage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateStatusModalApp) return;

    setApplications((prev) =>
      prev.map((a) => (a.id === updateStatusModalApp.id ? { ...a, stage: selectedNewStage } : a))
    );
    showToast(`Application #${updateStatusModalApp.id} stage updated to '${selectedNewStage}'.`);
    setUpdateStatusModalApp(null);
  };

  const handleConfirmDelete = () => {
    if (!deleteModalApp) return;
    setApplications((prev) => prev.filter((a) => a.id !== deleteModalApp.id));
    showToast(`Application #${deleteModalApp.id} was permanently removed.`);
    setDeleteModalApp(null);
  };

  return (
    <AdminLayout>
      <Breadcrumb items={[{ label: "Super Admin" }, { label: "Applications" }]} className="mb-2" />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-lg border border-slate-800 text-xs font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Applications Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Monitor and manage all job applications across the RakNova platform.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={() => showToast("Exporting application records to CSV...")} className="text-xs font-semibold">
          Export Applications (CSV)
        </Button>
      </div>

      {/* Top Summary (7 Useful KPIs) */}
      <div className="grid grid-cols-2 sm:grid-cols-7 gap-3">
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Applications</span>
          <div className="text-xl font-extrabold text-slate-900">{totalApps}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">New Applications</span>
          <div className="text-xl font-extrabold text-blue-600">{newApps}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Under Review</span>
          <div className="text-xl font-extrabold text-amber-600">{underReview}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Interview Scheduled</span>
          <div className="text-xl font-extrabold text-purple-600">{interviewScheduled}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Offers Sent</span>
          <div className="text-xl font-extrabold text-indigo-600">{offersSent}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Hired</span>
          <div className="text-xl font-extrabold text-emerald-600">{hired}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Rejected</span>
          <div className="text-xl font-extrabold text-rose-600">{rejected}</div>
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
            placeholder="Search candidate, job title, company, or recruiter..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />

          {/* Stage Filter */}
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
          >
            <option value="All">All Hiring Stages</option>
            <option value="Applied">Applied</option>
            <option value="Screening">Screening</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
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

          {/* Recruiter Filter */}
          <select
            value={recruiterFilter}
            onChange={(e) => setRecruiterFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
          >
            <option value="All">All Recruiters</option>
            <option value="Priya Patel">Priya Patel</option>
            <option value="Siddharth Verma">Siddharth Verma</option>
            <option value="Ananya Roy">Ananya Roy</option>
          </select>

        </div>

        {/* Sort Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <span className="font-bold text-slate-500">
            Showing {filteredApps.length} of {totalApps} Applications
          </span>

          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-medium"
            >
              <option value="newest">Applied Date: Newest First</option>
              <option value="oldest">Applied Date: Oldest First</option>
              <option value="a-z">Candidate Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Enterprise Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        {filteredApps.length === 0 ? (
          /* Empty State */
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 font-bold flex items-center justify-center mx-auto text-base">
              ?
            </div>
            <h3 className="text-base font-bold text-slate-900">No Applications Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No platform applications match your filter options. Reset filters to view all entries.
            </p>
            <Button variant="outline" size="sm" onClick={() => { setSearch(""); setStageFilter("All"); setCompanyFilter("All"); setRecruiterFilter("All"); }}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200 sticky top-0">
                <tr>
                  <th className="py-3 px-4">Application ID</th>
                  <th className="py-3 px-4">Candidate</th>
                  <th className="py-3 px-4">Applied Job Title</th>
                  <th className="py-3 px-4">Employer Company</th>
                  <th className="py-3 px-4">Recruiter</th>
                  <th className="py-3 px-4">Applied Date</th>
                  <th className="py-3 px-4">Current Stage</th>
                  <th className="py-3 px-4">Match Score</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {filteredApps.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{a.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{a.candidateName}</td>
                    <td className="py-3 px-4 text-slate-600">{a.jobTitle}</td>
                    <td className="py-3 px-4 text-slate-600">{a.companyName}</td>
                    <td className="py-3 px-4 text-slate-600">{a.recruiterName}</td>
                    <td className="py-3 px-4 text-slate-500">{a.appliedDate}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="default"
                        className={
                          a.stage === "Interview" || a.stage === "Offer" || a.stage === "Hired"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200 font-bold"
                            : a.stage === "Screening"
                            ? "bg-amber-50 text-amber-800 border-amber-200 font-bold"
                            : a.stage === "Rejected"
                            ? "bg-rose-50 text-rose-800 border-rose-200 font-bold"
                            : "bg-blue-50 text-blue-800 border-blue-200 font-bold"
                        }
                      >
                        {a.stage}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-extrabold text-indigo-600">{a.matchScore}%</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button onClick={() => setViewDrawerApp(a)} className="text-indigo-600 font-bold hover:underline">
                        View
                      </button>

                      <button onClick={() => { setUpdateStatusModalApp(a); setSelectedNewStage(a.stage); }} className="text-purple-600 font-bold hover:underline">
                        Update Status
                      </button>

                      <button onClick={() => setDeleteModalApp(a)} className="text-rose-600 font-semibold hover:underline">
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

      {/* VIEW APPLICATION SIDE DRAWER */}
      {viewDrawerApp && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-slate-900">Application #{viewDrawerApp.id}</h3>
                <button onClick={() => setViewDrawerApp(null)} className="text-slate-400 hover:text-slate-700 font-bold">
                  ✕
                </button>
              </div>

              {/* Header */}
              <div>
                <Badge variant="default" className="bg-indigo-50 text-indigo-800 border-indigo-200 mb-1">
                  Stage: {viewDrawerApp.stage}
                </Badge>
                <h4 className="text-lg font-bold text-slate-900">{viewDrawerApp.candidateName}</h4>
                <p className="text-xs text-indigo-600 font-bold">{viewDrawerApp.jobTitle} • {viewDrawerApp.companyName}</p>
                <p className="text-xs text-slate-500">Recruiter: {viewDrawerApp.recruiterName}</p>
              </div>

              {/* Details Box */}
              <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div><span className="font-bold text-slate-500">Email:</span> <span className="text-slate-900 font-medium">{viewDrawerApp.candidateEmail}</span></div>
                <div><span className="font-bold text-slate-500">Phone:</span> <span className="text-slate-900 font-medium">{viewDrawerApp.candidatePhone}</span></div>
                <div><span className="font-bold text-slate-500">Applied Date:</span> <span className="text-slate-900 font-medium">{viewDrawerApp.appliedDate}</span></div>
                <div><span className="font-bold text-slate-500">AI Match Score:</span> <span className="text-emerald-700 font-bold">{viewDrawerApp.matchScore}%</span></div>
                <div><span className="font-bold text-slate-500">Interview Status:</span> <span className="text-slate-900 font-medium">{viewDrawerApp.interviewStatus}</span></div>
                <div><span className="font-bold text-slate-500">Offer Status:</span> <span className="text-slate-900 font-medium">{viewDrawerApp.offerStatus}</span></div>
                <div><span className="font-bold text-slate-500">Resume:</span> <span className="text-indigo-600 font-bold hover:underline cursor-pointer ml-1">{viewDrawerApp.resumeFileName}</span></div>
                <div><span className="font-bold text-slate-500">Screening Notes:</span> <p className="text-slate-700 mt-1">{viewDrawerApp.notes}</p></div>
              </div>

              {/* Timeline */}
              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-slate-900">Application Progress Timeline</h4>
                {viewDrawerApp.timeline.map((act) => (
                  <div key={act.id} className="p-3 bg-white rounded-xl border border-slate-200 space-y-0.5">
                    <p className="font-bold text-slate-800">{act.action}</p>
                    <span className="text-[10px] text-slate-400">{act.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-4 border-t border-slate-100 flex gap-2">
              <Button variant="outline" size="sm" onClick={() => { setUpdateStatusModalApp(viewDrawerApp); setSelectedNewStage(viewDrawerApp.stage); setViewDrawerApp(null); }} className="flex-1 text-xs">
                Update Hiring Stage
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* UPDATE HIRING STAGE MODAL */}
      {updateStatusModalApp && (
        <Modal isOpen={true} onClose={() => setUpdateStatusModalApp(null)} title={`Update Hiring Stage — #${updateStatusModalApp.id}`} size="sm">
          <form onSubmit={handleConfirmUpdateStage} className="space-y-4 text-xs">
            <p className="text-slate-600">
              Update the current hiring stage for <strong className="text-slate-900">{updateStatusModalApp.candidateName}</strong>:
            </p>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Select Stage</label>
              <select
                value={selectedNewStage}
                onChange={(e) => setSelectedNewStage(e.target.value as any)}
                className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
              >
                <option value="Applied">Applied</option>
                <option value="Screening">Screening</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setUpdateStatusModalApp(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
                Save Hiring Stage
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModalApp && (
        <Modal isOpen={true} onClose={() => setDeleteModalApp(null)} title="Confirm Application Deletion" size="sm">
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Are you sure you want to permanently delete application <strong className="text-slate-900">#{deleteModalApp.id}</strong> submitted by {deleteModalApp.candidateName}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setDeleteModalApp(null)}>
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
