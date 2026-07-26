import { CompanyProfileData } from "@/data/company/companyProfile";

interface HiringProfileProps {
  company: CompanyProfileData;
}

const statItems = [
  { label: "Open Positions", key: "openPositions" },
  { label: "Departments Hiring", key: "departmentsHiring" },
  { label: "Average Hiring Time", key: "avgHiringTime" },
  { label: "Remote Availability", key: "remoteAvailability", format: (val: boolean) => val ? "Yes" : "No" },
  { label: "Internships Available", key: "internshipsAvailable", format: (val: boolean) => val ? "Yes" : "No" },
  { label: "Graduate Hiring", key: "graduateHiring", format: (val: boolean) => val ? "Yes" : "No" },
];

export function HiringProfile({ company }: HiringProfileProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Hiring Profile</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {statItems.map((item) => {
          const rawValue = (company as any)[item.key];
          const value = item.format ? item.format(rawValue) : rawValue;
          return (
            <div key={item.key} className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500">{item.label}</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">{value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
