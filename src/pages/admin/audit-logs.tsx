import { useState } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { mockAdminAuditLogs, AdminAuditLog } from "@/data/admin/adminData";

export default function AuditLogsPage() {
  const [logs] = useState<AdminAuditLog[]>(mockAdminAuditLogs);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // View Log Drawer
  const [drawerLog, setDrawerLog] = useState<AdminAuditLog | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // KPIs
  const totalLogs = logs.length;
  const todayLogs = logs.filter((l) => l.timestamp.startsWith("2026-03-28")).length;
  const securityEvents = logs.filter((l) => l.actionType === "Security").length;
  const systemEvents = logs.filter((l) => l.actionType === "System").length;
  const failedLogins = logs.filter((l) => l.status === "Failed").length;

  const filteredLogs = logs
    .filter((l) => {
      const q = search.toLowerCase();
      const matchesSearch =
        l.userName.toLowerCase().includes(q) ||
        l.userEmail.toLowerCase().includes(q) ||
        l.module.toLowerCase().includes(q) ||
        l.action.toLowerCase().includes(q) ||
        l.ipAddress.toLowerCase().includes(q);

      const matchesRole = roleFilter === "All" || l.userRole === roleFilter;
      const matchesType = typeFilter === "All" || l.actionType === typeFilter;
      const matchesStatus = statusFilter === "All" || l.status === statusFilter;

      return matchesSearch && matchesRole && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      if (sortBy === "oldest") return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      return 0;
    });

  return (
    <AdminLayout>
      <Breadcrumb items={[{ label: "Super Admin" }, { label: "Audit Logs" }]} className="mb-2" />

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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Audit Logs & Activity Monitor</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track important activities performed across the RakNova platform (Read-only System Monitor).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => showToast("Exporting audit logs to CSV...")} className="text-xs font-semibold">
            Export CSV
          </Button>

          <Button variant="primary" size="sm" onClick={() => showToast("Generating Compliance Audit Report PDF...")} className="bg-indigo-600 text-white text-xs font-bold">
            Export PDF
          </Button>
        </div>
      </div>

      {/* Top 5 Summary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Logs</span>
          <div className="text-xl font-extrabold text-slate-900">{totalLogs}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Today's Logs</span>
          <div className="text-xl font-extrabold text-indigo-600">{todayLogs}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Security Events</span>
          <div className="text-xl font-extrabold text-amber-600">{securityEvents}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">System Events</span>
          <div className="text-xl font-extrabold text-purple-600">{systemEvents}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Failed Login Attempts</span>
          <div className="text-xl font-extrabold text-rose-600">{failedLogins}</div>
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
            placeholder="Search by user, email, module, action, or IP address..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />

          {/* User Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
          >
            <option value="All">All User Roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Recruiter">Recruiter</option>
            <option value="Company">Company</option>
            <option value="Candidate">Candidate</option>
            <option value="System">System</option>
          </select>

          {/* Action Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
          >
            <option value="All">All Action Types</option>
            <option value="Security">Security</option>
            <option value="System">System</option>
            <option value="User Update">User Update</option>
            <option value="Permission">Permission</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
          >
            <option value="All">All Statuses</option>
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
            <option value="Warning">Warning</option>
          </select>

        </div>

        {/* Sort Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <span className="font-bold text-slate-500">
            Showing {filteredLogs.length} of {totalLogs} Audit Records
          </span>

          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-medium"
            >
              <option value="newest">Timestamp: Newest First</option>
              <option value="oldest">Timestamp: Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Enterprise Audit Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        {filteredLogs.length === 0 ? (
          /* Empty State */
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 font-bold flex items-center justify-center mx-auto text-base">
              ?
            </div>
            <h3 className="text-base font-bold text-slate-900">No Audit Logs Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No platform audit events match your filter parameters. Reset filters to view all entries.
            </p>
            <Button variant="outline" size="sm" onClick={() => { setSearch(""); setRoleFilter("All"); setTypeFilter("All"); setStatusFilter("All"); }}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200 sticky top-0">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Module</th>
                  <th className="py-3 px-4">Action Event</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">IP Address</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 text-slate-500 font-mono">{log.timestamp}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{log.userName}</td>
                    <td className="py-3 px-4">
                      <Badge variant="default" className="bg-slate-100 text-slate-700">
                        {log.userRole}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-semibold">{log.module}</td>
                    <td className="py-3 px-4 text-slate-900 font-bold">{log.action}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="default"
                        className={
                          log.status === "Success"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-rose-50 text-rose-800 border-rose-200"
                        }
                      >
                        {log.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono">{log.ipAddress}</td>
                    <td className="py-3 px-4 text-right">
                      <button onClick={() => setDrawerLog(log)} className="text-indigo-600 font-bold hover:underline">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* VIEW LOG DETAILS SIDE DRAWER */}
      {drawerLog && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-slate-900">Audit Log Event #{drawerLog.id}</h3>
                <button onClick={() => setDrawerLog(null)} className="text-slate-400 hover:text-slate-700 font-bold">
                  ✕
                </button>
              </div>

              <div>
                <Badge variant="default" className="bg-indigo-50 text-indigo-800 border-indigo-200 mb-1">
                  {drawerLog.actionType} Event
                </Badge>
                <h4 className="text-lg font-bold text-slate-900">{drawerLog.action}</h4>
                <p className="text-xs text-slate-500">{drawerLog.timestamp}</p>
              </div>

              <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div><span className="font-bold text-slate-500">Performed By:</span> <span className="text-slate-900 font-bold">{drawerLog.userName} ({drawerLog.userEmail})</span></div>
                <div><span className="font-bold text-slate-500">User Role:</span> <span className="text-slate-900 font-medium">{drawerLog.userRole}</span></div>
                <div><span className="font-bold text-slate-500">System Module:</span> <span className="text-slate-900 font-medium">{drawerLog.module}</span></div>
                <div><span className="font-bold text-slate-500">Execution Status:</span> <span className="text-emerald-700 font-bold">{drawerLog.status}</span></div>
                <div><span className="font-bold text-slate-500">Client IP Address:</span> <span className="text-slate-900 font-mono">{drawerLog.ipAddress}</span></div>
                <div><span className="font-bold text-slate-500">Browser & OS:</span> <span className="text-slate-900 font-medium">{drawerLog.browser} ({drawerLog.operatingSystem})</span></div>
                {drawerLog.detailsJson && (
                  <div>
                    <span className="font-bold text-slate-500 block mb-1">Raw Event Payload:</span>
                    <pre className="p-2 bg-slate-900 text-slate-200 rounded-xl font-mono text-[10px] overflow-x-auto">
                      {drawerLog.detailsJson}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setDrawerLog(null)} className="w-full text-xs font-bold">
                Close Event Inspector
              </Button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}
