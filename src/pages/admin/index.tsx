import Link from "next/link";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { adminKPIs, mockAdminCompanies, mockAdminAuditLogs } from "@/data/admin/adminData";

export default function AdminDashboardPage() {
  const pendingVerifications = mockAdminCompanies.filter((c) => c.verificationStatus === "Pending Approval");

  return (
    <AdminLayout>
      <Breadcrumb items={[{ label: "Super Admin" }, { label: "Dashboard" }]} className="mb-2" />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Super Admin Control Center</h1>
          <p className="text-xs text-slate-500 mt-1">
            Enterprise platform governance, user growth metrics, verification queue, and infrastructure status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs font-semibold">
            Export Platform Analytics
          </Button>
          <Link href="/admin/settings">
            <Button variant="primary" size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs">
              System Settings
            </Button>
          </Link>
        </div>
      </div>

      {/* Section 1: KPI Cards Grid */}
      <div>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Platform KPI Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {adminKPIs.map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{kpi.label}</span>
              <div className="text-lg font-extrabold text-slate-900">{kpi.value}</div>
              <span
                className={`text-[10px] font-bold block ${
                  kpi.changeType === "increase"
                    ? "text-emerald-700"
                    : kpi.changeType === "decrease"
                    ? "text-rose-700"
                    : "text-slate-500"
                }`}
              >
                {kpi.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: User Growth, Hiring Funnel & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 2: User Growth & Platform Analytics */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">User Growth & Platform Analytics</h3>
                <p className="text-xs text-slate-500">Monthly active user volume and growth benchmarks</p>
              </div>
              <span className="text-xs font-semibold text-slate-500">Last 30 Days</span>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Candidate Registrations</span>
                  <span className="font-extrabold text-indigo-600">18,420 (+14.1%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: "74%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Applications Processed</span>
                  <span className="font-extrabold text-emerald-600">142,600 (+18.9%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "88%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Recruiter Accounts</span>
                  <span className="font-extrabold text-purple-600">5,190 (+8.2%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "55%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Hiring Funnel Conversion */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Hiring Conversion Funnel</h3>
                <p className="text-xs text-slate-500">Platform-wide application to offer conversion rates</p>
              </div>
              <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                8.4% End-to-End Hire Rate
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Stage 1: Applied</span>
                <div className="text-base font-extrabold text-slate-900">142,600</div>
                <span className="text-[10px] text-slate-500 block">100% Top of Funnel</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Stage 2: Shortlisted</span>
                <div className="text-base font-extrabold text-slate-900">42,800</div>
                <span className="text-[10px] text-indigo-600 font-bold block">30.0% Pass Rate</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Stage 3: Interviewed</span>
                <div className="text-base font-extrabold text-slate-900">18,200</div>
                <span className="text-[10px] text-purple-600 font-bold block">12.7% Interview Rate</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Stage 4: Offered</span>
                <div className="text-base font-extrabold text-emerald-700">11,978</div>
                <span className="text-[10px] text-emerald-600 font-bold block">8.4% Final Hire Rate</span>
              </div>
            </div>
          </div>

          {/* Section 4: Pending Approvals (Company Verification Queue) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Pending Approvals Queue</h3>
                <p className="text-xs text-slate-500">Employers awaiting Super Admin verification before active hiring</p>
              </div>
              <Link href="/admin/companies" className="text-xs font-bold text-indigo-600 hover:underline">
                Manage Queue →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 font-semibold text-slate-700">
                  <tr>
                    <th className="py-2.5 px-3 rounded-l-xl">Company Name</th>
                    <th className="py-2.5 px-3">Industry</th>
                    <th className="py-2.5 px-3">Location</th>
                    <th className="py-2.5 px-3">Verification</th>
                    <th className="py-2.5 px-3 rounded-r-xl text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {pendingVerifications.map((cmp) => (
                    <tr key={cmp.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-900">{cmp.name}</td>
                      <td className="py-3 px-3 text-slate-600">{cmp.industry}</td>
                      <td className="py-3 px-3 text-slate-600">{cmp.location}</td>
                      <td className="py-3 px-3">
                        <Badge variant="default" className="bg-amber-50 text-amber-800 border-amber-200 font-bold">
                          Pending Review
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-right space-x-2">
                        <button className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg font-bold text-[11px] hover:bg-emerald-700">
                          Approve
                        </button>
                        <button className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg font-bold text-[11px] hover:bg-slate-200">
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: System Health, Quick Actions & Recent Activities */}
        <div className="space-y-6">
          
          {/* Section 5: System Health Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900">System Infrastructure Health</h3>
              <Badge variant="default" className="bg-emerald-50 text-emerald-800 border-emerald-200 font-bold">
                Operational
              </Badge>
            </div>

            <div className="space-y-2 pt-1">
              <div className="flex justify-between items-center text-slate-700">
                <span>FastAPI Backend Services</span>
                <span className="font-extrabold text-emerald-600">200 OK (12ms)</span>
              </div>
              <div className="flex justify-between items-center text-slate-700">
                <span>Gemini AI Provider Client</span>
                <span className="font-extrabold text-emerald-600">Connected (99.9%)</span>
              </div>
              <div className="flex justify-between items-center text-slate-700">
                <span>PostgreSQL Primary DB</span>
                <span className="font-extrabold text-emerald-600">Healthy (0.4% load)</span>
              </div>
              <div className="flex justify-between items-center text-slate-700">
                <span>Redis Session Cache</span>
                <span className="font-extrabold text-emerald-600">Optimal (0.2s latency)</span>
              </div>
            </div>
          </div>

          {/* Section 6: Quick Actions */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-3 text-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-2">Quick Admin Navigation</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/admin/users">
                <Button variant="outline" size="sm" className="w-full text-xs font-semibold justify-center">
                  User Management
                </Button>
              </Link>
              <Link href="/admin/companies">
                <Button variant="outline" size="sm" className="w-full text-xs font-semibold justify-center">
                  Company Queue
                </Button>
              </Link>
              <Link href="/admin/ai-analytics">
                <Button variant="outline" size="sm" className="w-full text-xs font-semibold justify-center">
                  AI Usage Stats
                </Button>
              </Link>
              <Link href="/admin/audit-logs">
                <Button variant="outline" size="sm" className="w-full text-xs font-semibold justify-center">
                  System Audit
                </Button>
              </Link>
              <Link href="/admin/roles">
                <Button variant="outline" size="sm" className="w-full text-xs font-semibold justify-center">
                  Roles & Rules
                </Button>
              </Link>
              <Link href="/admin/subscriptions">
                <Button variant="outline" size="sm" className="w-full text-xs font-semibold justify-center">
                  Subscriptions
                </Button>
              </Link>
            </div>
          </div>

          {/* Section 7: Recent Activities (Audit Log) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Recent Activity Logs</h3>
              <Link href="/admin/audit-logs" className="text-xs font-bold text-indigo-600 hover:underline">
                Full Log →
              </Link>
            </div>

            <div className="space-y-3">
              {mockAdminAuditLogs.map((log) => (
                <div key={log.id} className="p-3 bg-slate-50/70 rounded-2xl border border-slate-200/60 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{log.action}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{log.timestamp.split(" ")[1]}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{log.userName}</span>
                    <span
                      className={
                        log.status === "Success"
                          ? "text-emerald-700 font-bold"
                          : log.status === "Failed"
                          ? "text-rose-700 font-bold"
                          : "text-amber-700 font-bold"
                      }
                    >
                      {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}
