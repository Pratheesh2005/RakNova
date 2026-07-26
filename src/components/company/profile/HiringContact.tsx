import { CompanyProfileData } from "@/data/company/companyProfile";

interface HiringContactProps {
  company: CompanyProfileData;
}

export function HiringContact({ company }: HiringContactProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Hiring Contact</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500">HR Manager</p>
          <p className="text-sm font-medium text-gray-900">{company.hrManager}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500">Recruitment Email</p>
          <a href={`mailto:${company.recruitmentEmail}`} className="text-sm font-medium text-blue-600 hover:underline">
            {company.recruitmentEmail}
          </a>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500">Recruitment Phone</p>
          <p className="text-sm font-medium text-gray-900">{company.recruitmentPhone}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500">Working Hours</p>
          <p className="text-sm font-medium text-gray-900">{company.workingHours}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500">Response Time</p>
          <p className="text-sm font-medium text-gray-900">{company.responseTime}</p>
        </div>
      </div>
    </div>
  );
}
