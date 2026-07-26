import { CompanyProfileData } from "@/data/company/companyProfile";

interface BenefitsProps {
  benefits: CompanyProfileData["benefits"];
}

export function Benefits({ benefits }: BenefitsProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Benefits</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {benefits.map((benefit) => (
          <div key={benefit} className="p-4 bg-gray-50 rounded-xl text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-700">{benefit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
