import { CompanyProfileData } from "@/data/company/companyProfile";

interface AboutCompanyProps {
  company: CompanyProfileData;
}

export function AboutCompany({ company }: AboutCompanyProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">About {company.name}</h2>
      <div className="space-y-5">
        <div>
          <h3 className="text-sm font-medium text-gray-700">Mission</h3>
          <p className="text-sm text-gray-600 mt-1">{company.mission}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700">Vision</h3>
          <p className="text-sm text-gray-600 mt-1">{company.vision}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700">Company Culture</h3>
          <p className="text-sm text-gray-600 mt-1">{company.culture}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700">Core Values</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {company.coreValues.map((value) => (
              <span key={value} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">
                {value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
