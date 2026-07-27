import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";

export default function SubscriptionsPage() {
  const plans = [
    { name: "Free Tier", users: 14200, revenue: "₹0", features: ["1 Job Post/mo", "Basic ATS Check"] },
    { name: "Premium Tier", users: 4800, revenue: "₹24.0 Lakhs/mo", features: ["10 Job Posts/mo", "AI Candidate Matching", "AI Interview Prep"] },
    { name: "Enterprise Tier", users: 1240, revenue: "₹62.0 Lakhs/mo", features: ["Unlimited Jobs", "Dedicated AI Copilot", "Custom Workflows"] },
  ];

  return (
    <AdminLayout>
      <Breadcrumb items={[{ label: "Super Admin" }, { label: "Subscriptions" }]} className="mb-2" />

      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Subscription Tier Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure platform billing plans, employer quotas, and recurring SaaS revenue analytics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div key={p.name} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">{p.name}</h3>
              <Badge variant="default" className="bg-indigo-50 text-indigo-800 border-indigo-200">
                Active
              </Badge>
            </div>
            <div>
              <span className="text-2xl font-extrabold text-indigo-600 block">{p.revenue}</span>
              <span className="text-slate-500 font-semibold">{p.users.toLocaleString()} Active Accounts</span>
            </div>
            <div className="border-t border-slate-100 pt-3 space-y-1.5">
              <span className="font-bold text-slate-700 block">Plan Features:</span>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                {p.features.map((f, idx) => <li key={idx}>{f}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
