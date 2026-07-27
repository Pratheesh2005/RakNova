import { useState } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { mockAIModuleStats, mockAIErrors } from "@/data/admin/adminData";

export default function AIAnalyticsPage() {
  const [dateRange, setDateRange] = useState("This Month");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const totalRequests = mockAIModuleStats.reduce((acc, curr) => acc + curr.requestsCount, 0);
  const avgResponseTime = (
    mockAIModuleStats.reduce((acc, curr) => acc + curr.avgTimeSec, 0) / mockAIModuleStats.length
  ).toFixed(2);
  const avgSuccessRate = (
    mockAIModuleStats.reduce((acc, curr) => acc + curr.successRate, 0) / mockAIModuleStats.length
  ).toFixed(1);

  return (
    <AdminLayout>
      <Breadcrumb items={[{ label: "Super Admin" }, { label: "AI Analytics" }]} className="mb-2" />

      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-lg border border-slate-800 text-xs font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">AI Analytics & Health</h1>
          <p className="text-xs text-slate-500 mt-1">
            Monitor AI usage, performance, and system health across the RakNova platform.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
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

          <Button variant="outline" size="sm" onClick={() => showToast("Exporting AI usage statistics to CSV...")} className="text-xs font-semibold">
            Export CSV
          </Button>

          <Button variant="primary" size="sm" onClick={() => showToast("Generating AI System Performance Report PDF...")} className="bg-indigo-600 text-white text-xs font-bold">
            Export PDF
          </Button>
        </div>
      </div>

      {/* Top 7 Summary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-7 gap-3">
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total AI Requests</span>
          <div className="text-xl font-extrabold text-slate-900">{totalRequests.toLocaleString()}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Today's Requests</span>
          <div className="text-xl font-extrabold text-indigo-600">4,280</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Successful Requests</span>
          <div className="text-xl font-extrabold text-emerald-600">132,150</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Failed Requests</span>
          <div className="text-xl font-extrabold text-rose-600">200</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Avg Response Time</span>
          <div className="text-xl font-extrabold text-purple-600">{avgResponseTime}s</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Avg Processing Time</span>
          <div className="text-xl font-extrabold text-blue-600">1.10s</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">AI Success Rate</span>
          <div className="text-xl font-extrabold text-emerald-600">{avgSuccessRate}%</div>
        </div>
      </div>

      {/* API & System Health Indicators */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">API Infrastructure & Service Health</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-900">Google Gemini Provider</p>
              <span className="text-[10px] text-slate-400">gemini-2.5-flash / gemini-2.0-flash</span>
            </div>
            <Badge variant="default" className="bg-emerald-50 text-emerald-800 border-emerald-200 font-bold">
              Operational
            </Badge>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-900">FastAPI AI Services</p>
              <span className="text-[10px] text-slate-400">Port 8000 (Local Uvicorn)</span>
            </div>
            <Badge variant="default" className="bg-emerald-50 text-emerald-800 border-emerald-200 font-bold">
              Operational
            </Badge>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-900">PostgreSQL / Database</p>
              <span className="text-[10px] text-slate-400">Main Relational Data</span>
            </div>
            <Badge variant="default" className="bg-emerald-50 text-emerald-800 border-emerald-200 font-bold">
              Operational
            </Badge>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-900">Cloud Storage</p>
              <span className="text-[10px] text-slate-400">Resume & Doc Parsing Storage</span>
            </div>
            <Badge variant="default" className="bg-emerald-50 text-emerald-800 border-emerald-200 font-bold">
              Operational
            </Badge>
          </div>
        </div>
      </div>

      {/* Feature Breakdown Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 font-bold text-sm text-slate-900">
          AI Feature Usage & Performance Breakdown ({dateRange})
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">AI Module Name</th>
                <th className="py-3 px-4">Requests Count</th>
                <th className="py-3 px-4">Avg Response Time</th>
                <th className="py-3 px-4">Success Rate</th>
                <th className="py-3 px-4">Performance Bar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {mockAIModuleStats.map((m) => (
                <tr key={m.moduleName} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">{m.moduleName}</td>
                  <td className="py-3 px-4 font-bold text-indigo-600">{m.requestsCount.toLocaleString()}</td>
                  <td className="py-3 px-4 font-bold text-purple-600">{m.avgTimeSec}s</td>
                  <td className="py-3 px-4 font-bold text-emerald-600">{m.successRate}%</td>
                  <td className="py-3 px-4 w-48">
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${m.successRate}%` }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Error Log Monitoring (Read-Only) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 font-bold text-sm text-slate-900 flex justify-between items-center">
          <span>Recent AI System Warnings & Errors</span>
          <span className="text-xs text-slate-500 font-normal">Read-only operational logs</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Module</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Error Type</th>
                <th className="py-3 px-4">Resolution Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {mockAIErrors.map((err) => (
                <tr key={err.id}>
                  <td className="py-3 px-4 font-bold text-slate-900">{err.moduleName}</td>
                  <td className="py-3 px-4 text-slate-500">{err.timestamp}</td>
                  <td className="py-3 px-4 font-mono text-rose-700 font-bold">{err.errorType}</td>
                  <td className="py-3 px-4">
                    <Badge
                      variant="default"
                      className={
                        err.status === "Resolved"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : "bg-amber-50 text-amber-800 border-amber-200"
                      }
                    >
                      {err.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </AdminLayout>
  );
}
