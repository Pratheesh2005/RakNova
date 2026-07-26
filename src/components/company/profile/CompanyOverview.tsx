import { Badge } from "@/components/ui/Badge";
import { CompanyProfileData } from "@/data/company/companyProfile";

interface CompanyOverviewProps {
  company: CompanyProfileData;
}

export function CompanyOverview({ company }: CompanyOverviewProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8">
      <div className="flex flex-col sm:flex-row items-start gap-6">
        {/* Logo and basic info */}
        <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl font-bold text-blue-700 flex-shrink-0">
          {company.name.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900">{company.name}</h2>
            {company.verified && (
              <Badge variant="default" className="bg-green-50 text-green-700">
                Verified
              </Badge>
            )}
          </div>
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <span className="text-gray-500">Industry:</span> {company.industry}
            </div>
            <div>
              <span className="text-gray-500">Headquarters:</span> {company.headquarters}
            </div>
            <div>
              <span className="text-gray-500">Founded:</span> {company.foundedYear}
            </div>
            <div>
              <span className="text-gray-500">Size:</span> {company.companySize}
            </div>
            <div>
              <span className="text-gray-500">Website:</span>{" "}
              <a href={company.website} className="text-blue-600 hover:underline">
                {company.website.replace("https://", "")}
              </a>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4 leading-relaxed">{company.description}</p>
        </div>
      </div>
    </div>
  );
}
