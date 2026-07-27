import { useState } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { mockAdminCompanies, mockAdminRecruiters } from "@/data/admin/adminData";

export default function PlatformAnalyticsPage() {
  const [dateRange, setDateRange] = useState("This Month");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Top KPI Cards
  const kpis = [
    { label: "Total Users", value: "24,850", change: "+12.4%", status: "positive" },
    { label: "Total Companies", value: "1,240", change: "+6.8%", status: "positive" },
    { label: "Total Recruiters", value: "5,190", change: "+8.2%", status: "positive" },
    { label: "Total Candidates", value: "18,420", change: "+14.1%", status: "positive" },
    { label: "Active Jobs", value: "3,840", change: "+5.1%", status: "positive" },
    { label: "Applications", value: "142,600", change: "+18.9%", status: "positive" },
    { label: "Successful Hires", value: "4,920", change: "+11.3%", status: "positive" },
    { label: "Platform Growth", value: "+14.8%", change: "MoM Growth", status: "neutral" },
  ];

  // User distribution data
  const roleDistribution = [
    { role: "Candidates", count: 18420, percent: "74.1%", color: "bg-indigo-600" },
    { role: "Recruiters", count: 5190, percent: "20.9%", color: "bg-purple-600" },
    { role: "Companies", count: 1240, percent: "4.9%", color: "bg-emerald-600" },
    { role: "Super Admins", count: 12, percent: "0.1%", color: "bg-slate-700" },
  ];

  // Hiring Funnel data
  const funnelStages = [
    { stage: "Applications Submitted", count: 142600, percent: "100%" },
    { stage: "Screened / Shortlisted", count: 68400, percent: "47.9%" },
    { stage: "Interviews Scheduled", count: 24800, percent: "17.3%" },
    { stage: "Formal Offers Extended", count: 8900, percent: "6.2%" },
    { stage: "Successful Hires Completed", count: 4920, percent: "3.4%" },
  ];

  return (
    <AdminLayout>
      <Breadcrumb items={[{ label: "Super Admin" }, { label: "Platform Analytics" }]} className="mb-2" />

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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Platform Analytics</h1>
          <p className="text-xs text-slate-500 mt-1">
            Monitor platform performance, growth, and recruitment activity.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Date Filter */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-700">
            {["Today", "This Week", "This Month", "This Year"].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  dateRange === range ? "bg-white text-indigo-700 shadow-xs" : "hover:text-slate-900"
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={() => showToast("Exporting Analytics Report to CSV...")} className="text-xs font-semibold">
            Export CSV
          </Button>

          <Button variant="primary" size="sm" onClick={() => showToast("Generating Analytics PDF Summary...")} className="bg-indigo-600 text-white text-xs font-bold">
            Export PDF
          </Button>
        </div>
      </div>

      {/* Top 8 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{kpi.label}</span>
            <div className="text-lg font-extrabold text-slate-900">{kpi.value}</div>
            <span className="text-[10px] font-bold text-emerald-600 block">{kpi.change}</span>
          </div>
        ))}
      </div>

      {/* Main Analytics Visual Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* User Growth Chart Box */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">User Growth & Registrations</h3>
              <p className="text-xs text-slate-500">Monthly candidate vs company onboarding breakdown ({dateRange})</p>
            </div>
            <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              +14.8% Growth
            </span>
          </div>

          {/* Clean Visual Bar Series */}
          <div className="space-y-3 pt-2">
            {[
              { month: "Jan 2026", candidates: 3400, companies: 240, height: "w-[65%]" },
              { month: "Feb 2026", candidates: 4200, companies: 310, height: "w-[80%]" },
              { month: "Mar 2026", candidates: 5800, companies: 420, height: "w-[95%]" },
            ].map((bar) => (
              <div key={bar.month} className="space-y-1 text-xs">
                <div className="flex justify-between font-bold text-slate-700">
                  <span>{bar.month}</span>
                  <span className="text-slate-500">{bar.candidates} Candidates / {bar.companies} Companies</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className={`bg-indigo-600 h-full ${bar.height} rounded-full transition-all`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Distribution by Role */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">User Distribution by Role</h3>
            <p className="text-xs text-slate-500">Platform user account proportion</p>
          </div>

          <div className="space-y-3 text-xs">
            {roleDistribution.map((item) => (
              <div key={item.role} className="space-y-1">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>{item.role}</span>
                  <span className="text-slate-500">{item.count.toLocaleString()} ({item.percent})</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: item.percent }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Hiring Funnel & Monthly Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Hiring Funnel */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Platform Hiring Funnel Conversion</h3>
            <p className="text-xs text-slate-500">Candidate progression from application to successful placement</p>
          </div>

          <div className="space-y-3 text-xs">
            {funnelStages.map((stg) => (
              <div key={stg.stage} className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">{stg.stage}</span>
                  <span className="text-[10px] text-slate-500 font-medium">{stg.count.toLocaleString()} Applications</span>
                </div>
                <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                  {stg.percent}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Company & Recruiter Leaders */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Top Employers & Recruiters</h3>
            <p className="text-xs text-slate-500">Highest volume active platform accounts</p>
          </div>

          {/* Top Companies Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700">Top Employer Companies</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 font-semibold text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3">Company</th>
                    <th className="py-2 px-3">Jobs Posted</th>
                    <th className="py-2 px-3">Applications</th>
                    <th className="py-2 px-3">Hires</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {mockAdminCompanies.slice(0, 3).map((c) => (
                    <tr key={c.id}>
                      <td className="py-2 px-3 font-bold text-slate-900">{c.name}</td>
                      <td className="py-2 px-3">{c.jobsPosted}</td>
                      <td className="py-2 px-3 font-bold text-indigo-600">{c.applicationsCount}</td>
                      <td className="py-2 px-3 font-bold text-emerald-600">{Math.round(c.jobsPosted * 0.7)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Recruiters Table */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-700">Top Performing Recruiters</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 font-semibold text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3">Recruiter</th>
                    <th className="py-2 px-3">Candidates</th>
                    <th className="py-2 px-3">Placements</th>
                    <th className="py-2 px-3">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {mockAdminRecruiters.slice(0, 3).map((r) => (
                    <tr key={r.id}>
                      <td className="py-2 px-3 font-bold text-slate-900">{r.name}</td>
                      <td className="py-2 px-3">{r.candidatesManaged}</td>
                      <td className="py-2 px-3 font-bold text-emerald-600">{r.placementsCompleted || 12}</td>
                      <td className="py-2 px-3 font-bold text-purple-600">{r.performanceScore}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

    </AdminLayout>
  );
}
