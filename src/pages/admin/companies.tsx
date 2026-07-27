import { useState } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { mockAdminCompanies, AdminCompany } from "@/data/admin/adminData";
import { cn } from "@/utils/cn";

export default function CompanyManagementPage() {
  const [companies, setCompanies] = useState<AdminCompany[]>(mockAdminCompanies);
  const [search, setSearch] = useState("");
  const [verificationFilter, setVerificationFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");
  const [industryFilter, setIndustryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // Working Modals & Drawers State
  const [viewDrawerCompany, setViewDrawerCompany] = useState<AdminCompany | null>(null);
  const [editModalCompany, setEditModalCompany] = useState<AdminCompany | null>(null);
  const [rejectModalCompany, setRejectModalCompany] = useState<AdminCompany | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [suspendModalCompany, setSuspendModalCompany] = useState<AdminCompany | null>(null);
  const [deleteModalCompany, setDeleteModalCompany] = useState<AdminCompany | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // KPI Calculations
  const totalCompanies = companies.length;
  const verifiedCompanies = companies.filter((c) => c.verificationStatus === "Verified").length;
  const pendingCompanies = companies.filter((c) => c.verificationStatus === "Pending Approval").length;
  const suspendedCompanies = companies.filter((c) => c.companyStatus === "Suspended").length;
  const activeCompanies = companies.filter((c) => c.companyStatus === "Active").length;

  const filteredCompanies = companies
    .filter((c) => {
      const q = search.toLowerCase();
      const matchesSearch =
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q);

      const matchesVerif = verificationFilter === "All" || c.verificationStatus === verificationFilter;
      const matchesPlan = planFilter === "All" || c.plan === planFilter;
      const matchesIndustry = industryFilter === "All" || c.industry === industryFilter;
      const matchesStatus = statusFilter === "All" || c.companyStatus === statusFilter;

      return matchesSearch && matchesVerif && matchesPlan && matchesIndustry && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime();
      if (sortBy === "oldest") return new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime();
      if (sortBy === "a-z") return a.name.localeCompare(b.name);
      return 0;
    });

  // REAL WORKING ACTIONS
  const handleApprove = (id: string, name: string) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, verificationStatus: "Verified" } : c))
    );
    showToast(`Verification approved for ${name}. Account is now fully active.`);
  };

  const handleConfirmReject = () => {
    if (!rejectModalCompany) return;
    if (!rejectReason.trim()) {
      alert("Please provide a rejection reason.");
      return;
    }
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === rejectModalCompany.id
          ? { ...c, verificationStatus: "Rejected", rejectionReason: rejectReason }
          : c
      )
    );
    showToast(`Verification rejected for ${rejectModalCompany.name}.`);
    setRejectModalCompany(null);
    setRejectReason("");
  };

  const handleConfirmSuspend = () => {
    if (!suspendModalCompany) return;
    setCompanies((prev) =>
      prev.map((c) => (c.id === suspendModalCompany.id ? { ...c, companyStatus: "Suspended" } : c))
    );
    showToast(`Company ${suspendModalCompany.name} has been suspended.`);
    setSuspendModalCompany(null);
  };

  const handleActivate = (id: string, name: string) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, companyStatus: "Active" } : c))
    );
    showToast(`Company ${name} status updated to Active.`);
  };

  const handleConfirmDelete = () => {
    if (!deleteModalCompany) return;
    setCompanies((prev) => prev.filter((c) => c.id !== deleteModalCompany.id));
    showToast(`Company ${deleteModalCompany.name} and associated records were permanently deleted.`);
    setDeleteModalCompany(null);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModalCompany) return;
    setCompanies((prev) =>
      prev.map((c) => (c.id === editModalCompany.id ? { ...editModalCompany } : c))
    );
    showToast(`Company profile updated for ${editModalCompany.name}.`);
    setEditModalCompany(null);
  };

  return (
    <AdminLayout>
      <Breadcrumb items={[{ label: "Super Admin" }, { label: "Company Management" }]} className="mb-2" />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-lg border border-slate-800 text-xs font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Company Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage all registered companies on the RakNova platform.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={() => showToast("Exporting company directory to CSV...")} className="text-xs font-semibold">
          Export Company Data (CSV)
        </Button>
      </div>

      {/* Top Summary (5 Important Stats) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Companies</span>
          <div className="text-xl font-extrabold text-slate-900">{totalCompanies}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Verified Companies</span>
          <div className="text-xl font-extrabold text-emerald-600">{verifiedCompanies}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Pending Verification</span>
          <div className="text-xl font-extrabold text-amber-600">{pendingCompanies}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Suspended Companies</span>
          <div className="text-xl font-extrabold text-rose-600">{suspendedCompanies}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Active Companies</span>
          <div className="text-xl font-extrabold text-indigo-600">{activeCompanies}</div>
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
              placeholder="Search company name, email, industry, or location..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          {/* Verification Status Filter */}
          <select
            value={verificationFilter}
            onChange={(e) => setVerificationFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
          >
            <option value="All">All Verification Statuses</option>
            <option value="Verified">Verified</option>
            <option value="Pending Approval">Pending Approval</option>
            <option value="Rejected">Rejected</option>
          </select>

          {/* Subscription Plan Filter */}
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
          >
            <option value="All">All Plans</option>
            <option value="Free">Free</option>
            <option value="Premium">Premium</option>
            <option value="Enterprise">Enterprise</option>
          </select>

          {/* Company Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
          >
            <option value="All">All Company Statuses</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>

        </div>

        {/* Sort Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <span className="font-bold text-slate-500">
            Showing {filteredCompanies.length} of {totalCompanies} Companies
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
              <option value="a-z">Company Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Enterprise Company Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        {filteredCompanies.length === 0 ? (
          /* Empty State */
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 font-bold flex items-center justify-center mx-auto text-base">
              ?
            </div>
            <h3 className="text-base font-bold text-slate-900">No Companies Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No registered corporate accounts match your filter options. Reset filters to view all entries.
            </p>
            <Button variant="outline" size="sm" onClick={() => { setSearch(""); setVerificationFilter("All"); setPlanFilter("All"); setStatusFilter("All"); }}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200 sticky top-0">
                <tr>
                  <th className="py-3 px-4">Company Name</th>
                  <th className="py-3 px-4">Industry</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Jobs Posted</th>
                  <th className="py-3 px-4">Active Recruiters</th>
                  <th className="py-3 px-4">Plan</th>
                  <th className="py-3 px-4">Verification</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Reg Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {filteredCompanies.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{c.name}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{c.contactPerson}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{c.industry}</td>
                    <td className="py-3 px-4 text-slate-600">{c.location}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{c.jobsPosted}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{c.activeRecruiters}</td>
                    <td className="py-3 px-4">
                      <Badge variant="default" className="bg-purple-50 text-purple-800 border-purple-200 font-bold">
                        {c.plan}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-md text-[10px] font-bold border",
                          c.verificationStatus === "Verified"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : c.verificationStatus === "Pending Approval"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-rose-50 text-rose-700 border-rose-200"
                        )}
                      >
                        {c.verificationStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-md text-[10px] font-bold",
                          c.companyStatus === "Active" ? "text-emerald-700 font-bold" : "text-rose-700 font-bold"
                        )}
                      >
                        {c.companyStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{c.registrationDate}</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button onClick={() => setViewDrawerCompany(c)} className="text-indigo-600 font-bold hover:underline">
                        View
                      </button>

                      <button onClick={() => setEditModalCompany(c)} className="text-slate-600 font-semibold hover:underline">
                        Edit
                      </button>

                      {c.verificationStatus === "Pending Approval" && (
                        <>
                          <button onClick={() => handleApprove(c.id, c.name)} className="text-emerald-600 font-bold hover:underline">
                            Approve
                          </button>
                          <button onClick={() => setRejectModalCompany(c)} className="text-amber-700 font-semibold hover:underline">
                            Reject
                          </button>
                        </>
                      )}

                      {c.companyStatus === "Active" ? (
                        <button onClick={() => setSuspendModalCompany(c)} className="text-amber-700 font-semibold hover:underline">
                          Suspend
                        </button>
                      ) : (
                        <button onClick={() => handleActivate(c.id, c.name)} className="text-emerald-700 font-semibold hover:underline">
                          Activate
                        </button>
                      )}

                      <button onClick={() => setDeleteModalCompany(c)} className="text-rose-600 font-semibold hover:underline">
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

      {/* VIEW COMPANY SIDE DRAWER */}
      {viewDrawerCompany && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-slate-900">Company Overview</h3>
                <button onClick={() => setViewDrawerCompany(null)} className="text-slate-400 hover:text-slate-700 font-bold">
                  ✕
                </button>
              </div>

              {/* Company Identity */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white font-extrabold flex items-center justify-center text-xl shadow-xs">
                  {viewDrawerCompany.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{viewDrawerCompany.name}</h4>
                  <p className="text-xs text-indigo-600 font-bold">{viewDrawerCompany.industry}</p>
                  <p className="text-xs text-slate-500">{viewDrawerCompany.location}</p>
                </div>
              </div>

              {/* Details Box */}
              <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div><span className="font-bold text-slate-500">Contact Person:</span> <span className="text-slate-900 font-medium">{viewDrawerCompany.contactPerson}</span></div>
                <div><span className="font-bold text-slate-500">Email:</span> <span className="text-slate-900 font-medium">{viewDrawerCompany.email}</span></div>
                <div><span className="font-bold text-slate-500">Phone:</span> <span className="text-slate-900 font-medium">{viewDrawerCompany.phone}</span></div>
                <div><span className="font-bold text-slate-500">Website:</span> <a href={viewDrawerCompany.website} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">{viewDrawerCompany.website}</a></div>
                <div><span className="font-bold text-slate-500">Company Size:</span> <span className="text-slate-900 font-medium">{viewDrawerCompany.companySize}</span></div>
                <div><span className="font-bold text-slate-500">Subscription Tier:</span> <span className="text-purple-700 font-bold">{viewDrawerCompany.plan}</span></div>
                <div><span className="font-bold text-slate-500">Verification Status:</span> <span className="text-emerald-700 font-bold">{viewDrawerCompany.verificationStatus}</span></div>
                {viewDrawerCompany.rejectionReason && (
                  <div className="p-2 bg-rose-50 border border-rose-200 rounded-lg text-rose-800">
                    <strong>Rejection Reason:</strong> {viewDrawerCompany.rejectionReason}
                  </div>
                )}
                <div><span className="font-bold text-slate-500">Description:</span> <p className="text-slate-700 mt-1">{viewDrawerCompany.description}</p></div>
              </div>

              {/* Active Jobs List */}
              <div className="space-y-3 text-xs">
                <h4 className="font-bold text-slate-900">Active Job Postings ({viewDrawerCompany.activeJobListings?.length || 0})</h4>
                {viewDrawerCompany.activeJobListings && viewDrawerCompany.activeJobListings.length > 0 ? (
                  <div className="space-y-2">
                    {viewDrawerCompany.activeJobListings.map((job) => (
                      <div key={job.id} className="p-3 bg-white rounded-xl border border-slate-200 space-y-1 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-800">{job.title}</p>
                          <span className="text-[10px] text-slate-400">{job.applications} Applicants</span>
                        </div>
                        <Badge variant="default" className="bg-emerald-50 text-emerald-800">
                          {job.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 italic">No active job listings for this company.</p>
                )}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-4 border-t border-slate-100 flex gap-2">
              <Button variant="outline" size="sm" onClick={() => { setEditModalCompany(viewDrawerCompany); setViewDrawerCompany(null); }} className="flex-1 text-xs">
                Edit Details
              </Button>
              {viewDrawerCompany.verificationStatus === "Pending Approval" && (
                <Button variant="primary" size="sm" onClick={() => { handleApprove(viewDrawerCompany.id, viewDrawerCompany.name); setViewDrawerCompany(null); }} className="flex-1 bg-emerald-600 text-white text-xs">
                  Approve Verification
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* EDIT COMPANY MODAL */}
      {editModalCompany && (
        <Modal isOpen={true} onClose={() => setEditModalCompany(null)} title="Edit Company Details" size="md">
          <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Company Name</label>
                <input
                  type="text"
                  value={editModalCompany.name}
                  onChange={(e) => setEditModalCompany({ ...editModalCompany, name: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Industry</label>
                <input
                  type="text"
                  value={editModalCompany.industry}
                  onChange={(e) => setEditModalCompany({ ...editModalCompany, industry: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Contact Person</label>
                <input
                  type="text"
                  value={editModalCompany.contactPerson}
                  onChange={(e) => setEditModalCompany({ ...editModalCompany, contactPerson: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={editModalCompany.email}
                  onChange={(e) => setEditModalCompany({ ...editModalCompany, email: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={editModalCompany.phone}
                  onChange={(e) => setEditModalCompany({ ...editModalCompany, phone: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Website URL</label>
                <input
                  type="text"
                  value={editModalCompany.website}
                  onChange={(e) => setEditModalCompany({ ...editModalCompany, website: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Company Description</label>
              <textarea
                rows={3}
                value={editModalCompany.description}
                onChange={(e) => setEditModalCompany({ ...editModalCompany, description: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-2 font-medium"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setEditModalCompany(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* REJECT VERIFICATION MODAL */}
      {rejectModalCompany && (
        <Modal isOpen={true} onClose={() => setRejectModalCompany(null)} title="Reject Verification Request" size="sm">
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Please specify the reason for rejecting verification for <strong className="text-slate-900">{rejectModalCompany.name}</strong>:
            </p>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Incomplete corporate tax documentation or unverified business domain..."
              className="w-full border border-slate-300 rounded-xl p-2 font-medium"
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setRejectModalCompany(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleConfirmReject} className="bg-amber-600 hover:bg-amber-700 text-white font-bold">
                Confirm Rejection
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* SUSPEND CONFIRMATION MODAL */}
      {suspendModalCompany && (
        <Modal isOpen={true} onClose={() => setSuspendModalCompany(null)} title="Confirm Company Suspension" size="sm">
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Are you sure you want to suspend <strong className="text-slate-900">{suspendModalCompany.name}</strong>? Suspending this company will temporarily disable all active job postings and recruiter access.
            </p>
            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setSuspendModalCompany(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleConfirmSuspend} className="bg-amber-600 hover:bg-amber-700 text-white font-bold">
                Suspend Company
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModalCompany && (
        <Modal isOpen={true} onClose={() => setDeleteModalCompany(null)} title="Confirm Permanent Deletion" size="sm">
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Are you sure you want to permanently delete company <strong className="text-slate-900">{deleteModalCompany.name}</strong>? This will permanently remove all company job postings, recruiter accounts, and application data.
            </p>
            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setDeleteModalCompany(null)}>
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
