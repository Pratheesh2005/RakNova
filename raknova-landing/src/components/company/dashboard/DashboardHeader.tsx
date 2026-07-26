import { Badge } from "@/components/ui/Badge";
import { companyInfo } from "@/data/company/dashboard";

export function DashboardHeader() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold text-blue-700">{companyInfo.name.charAt(0)}</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {greeting}, {companyInfo.name}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Welcome back. You have 5 high-priority hiring tasks today.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="default" className="bg-blue-50 text-blue-700">{companyInfo.plan} Plan</Badge>
        {companyInfo.verified && (
          <Badge variant="default" className="bg-green-50 text-green-700">Verified</Badge>
        )}
      </div>
    </div>
  );
}
