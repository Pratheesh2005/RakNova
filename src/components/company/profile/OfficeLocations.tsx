import { Badge } from "@/components/ui/Badge";
import { CompanyProfileData } from "@/data/company/companyProfile";

interface OfficeLocationsProps {
  offices: CompanyProfileData["offices"];
}

export function OfficeLocations({ offices }: OfficeLocationsProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Office Locations</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Office</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">City</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Country</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Employees</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Hiring</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Primary</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {offices.map((office) => (
              <tr key={office.name} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{office.name}</td>
                <td className="px-6 py-4 text-gray-600">{office.city}</td>
                <td className="px-6 py-4 text-gray-600">{office.country}</td>
                <td className="px-6 py-4 text-center">{office.employees}</td>
                <td className="px-6 py-4 text-center">
                  <Badge variant="default" className={office.hiring ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"}>
                    {office.hiring ? "Yes" : "No"}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  {office.primary && (
                    <Badge variant="default" className="bg-blue-50 text-blue-700">
                      Primary
                    </Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
