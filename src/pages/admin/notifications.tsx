import { useState } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  category: "System" | "Companies" | "Recruiters" | "Candidates" | "AI" | "Security";
  priority: "Low" | "Medium" | "High" | "Critical";
  timestamp: string;
  read: boolean;
  relatedUser?: string;
  sourceModule: string;
}

const mockNotifications: NotificationItem[] = [
  { id: "n1", title: "New Company Pending Approval", description: "Apex Global Solutions requested employer account verification.", category: "Companies", priority: "High", timestamp: "10 mins ago", read: false, relatedUser: "Rajesh Rao", sourceModule: "Company Verification" },
  { id: "n2", title: "AI Service Timeout Alert", description: "Gemini provider experienced 1 intermittent timeout on Interview Assistant.", category: "AI", priority: "Medium", timestamp: "45 mins ago", read: false, sourceModule: "AI Infrastructure" },
  { id: "n3", title: "Recruiter Account Created", description: "Priya Patel registered recruiter account under TechCorp Systems.", category: "Recruiters", priority: "Low", timestamp: "2 hours ago", read: true, relatedUser: "Priya Patel", sourceModule: "User Management" },
  { id: "n4", title: "Failed Login Attempts Warning", description: "3 consecutive invalid password attempts recorded from IP 182.74.12.90.", category: "Security", priority: "Critical", timestamp: "3 hours ago", read: false, relatedUser: "Rajesh Rao", sourceModule: "Security Audit" },
  { id: "n5", title: "Automated Backup Succeeded", description: "System database snapshot completed successfully (99.98% uptime).", category: "System", priority: "Low", timestamp: "5 hours ago", read: true, sourceModule: "Database Backup" },
];

export default function NotificationsPage() {
  const [items, setItems] = useState<NotificationItem[]>(mockNotifications);
  const [filterCategory, setFilterCategory] = useState("All");
  const [viewDrawerItem, setViewDrawerItem] = useState<NotificationItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const totalNotifications = items.length;
  const unreadCount = items.filter((i) => !i.read).length;
  const highPriorityCount = items.filter((i) => i.priority === "High" || i.priority === "Critical").length;
  const resolvedCount = items.filter((i) => i.read).length;

  const filteredItems = items.filter((i) => {
    if (filterCategory === "Unread") return !i.read;
    if (filterCategory === "Read") return i.read;
    if (filterCategory === "High Priority") return i.priority === "High" || i.priority === "Critical";
    if (filterCategory !== "All") return i.category === filterCategory;
    return true;
  });

  const handleToggleRead = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, read: !i.read } : i))
    );
    showToast("Notification status updated.");
  };

  const handleMarkAllRead = () => {
    setItems((prev) => prev.map((i) => ({ ...i, read: true })));
    showToast("All notifications marked as read.");
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    showToast("Notification item removed.");
  };

  return (
    <AdminLayout>
      <Breadcrumb items={[{ label: "Super Admin" }, { label: "Notifications" }]} className="mb-2" />

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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight font-sans">Notifications & System Alerts</h1>
          <p className="text-xs text-slate-500 mt-1">
            View and manage important platform notifications and system alerts.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={handleMarkAllRead} className="text-xs font-semibold">
          Mark All as Read
        </Button>
      </div>

      {/* Top 4 Summary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Notifications</span>
          <div className="text-xl font-extrabold text-slate-900">{totalNotifications}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Unread Alerts</span>
          <div className="text-xl font-extrabold text-indigo-600">{unreadCount}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">High Priority</span>
          <div className="text-xl font-extrabold text-rose-600">{highPriorityCount}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Resolved</span>
          <div className="text-xl font-extrabold text-emerald-600">{resolvedCount}</div>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-2xs flex flex-wrap gap-2 text-xs">
        {["All", "Unread", "Read", "High Priority", "System", "Companies", "Recruiters", "Candidates", "AI", "Security"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
              filterCategory === cat
                ? "bg-slate-900 text-white shadow-2xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notification List Layout */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs divide-y divide-slate-100 overflow-hidden text-xs">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <h3 className="text-base font-bold text-slate-900">No Notifications</h3>
            <p className="text-xs text-slate-500">You are all caught up! No notifications match the selected category.</p>
          </div>
        ) : (
          filteredItems.map((n) => (
            <div
              key={n.id}
              className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                !n.read ? "bg-indigo-50/30" : "hover:bg-slate-50/80"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    !n.read ? "bg-indigo-600" : "bg-slate-300"
                  }`}
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">{n.title}</h4>
                    <Badge
                      variant="default"
                      className={
                        n.priority === "Critical" || n.priority === "High"
                          ? "bg-rose-50 text-rose-800 border-rose-200 font-bold"
                          : "bg-slate-100 text-slate-700"
                      }
                    >
                      {n.priority}
                    </Badge>
                  </div>
                  <p className="text-slate-600 font-medium">{n.description}</p>
                  <div className="flex items-center gap-3 text-[10px] text-slate-400 font-medium pt-1">
                    <span>Category: {n.category}</span>
                    <span>•</span>
                    <span>Module: {n.sourceModule}</span>
                    <span>•</span>
                    <span>{n.timestamp}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => setViewDrawerItem(n)} className="text-indigo-600 font-bold hover:underline">
                  View Details
                </button>
                <button onClick={() => handleToggleRead(n.id)} className="text-slate-600 font-semibold hover:underline">
                  {n.read ? "Mark Unread" : "Mark Read"}
                </button>
                <button onClick={() => handleDelete(n.id)} className="text-rose-600 font-semibold hover:underline">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* VIEW DETAILS SIDE DRAWER */}
      {viewDrawerItem && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-slate-900">Notification Details</h3>
                <button onClick={() => setViewDrawerItem(null)} className="text-slate-400 hover:text-slate-700 font-bold">
                  ✕
                </button>
              </div>

              <div>
                <Badge variant="default" className="bg-indigo-50 text-indigo-800 border-indigo-200 mb-1">
                  {viewDrawerItem.priority} Priority
                </Badge>
                <h4 className="text-lg font-bold text-slate-900">{viewDrawerItem.title}</h4>
                <p className="text-xs text-slate-500 mt-1">{viewDrawerItem.timestamp}</p>
              </div>

              <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div><span className="font-bold text-slate-500">Category:</span> <span className="text-slate-900 font-medium">{viewDrawerItem.category}</span></div>
                <div><span className="font-bold text-slate-500">Source Module:</span> <span className="text-slate-900 font-medium">{viewDrawerItem.sourceModule}</span></div>
                {viewDrawerItem.relatedUser && <div><span className="font-bold text-slate-500">Related User:</span> <span className="text-slate-900 font-bold">{viewDrawerItem.relatedUser}</span></div>}
                <div><span className="font-bold text-slate-500">Read Status:</span> <span className="text-slate-900 font-bold">{viewDrawerItem.read ? "Read" : "Unread"}</span></div>
                <div><span className="font-bold text-slate-500 block mb-1">Alert Message:</span> <p className="text-slate-800 font-medium">{viewDrawerItem.description}</p></div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-2">
              <Button variant="outline" size="sm" onClick={() => { handleToggleRead(viewDrawerItem.id); setViewDrawerItem(null); }} className="flex-1 text-xs">
                {viewDrawerItem.read ? "Mark as Unread" : "Mark as Read"}
              </Button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}
