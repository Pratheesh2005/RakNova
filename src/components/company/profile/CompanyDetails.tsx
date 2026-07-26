import { CompanyProfileData } from "@/data/company/companyProfile";

interface CompanyDetailsProps {
  contact: CompanyProfileData["contact"];
  company: CompanyProfileData;
}

export function CompanyDetails({ contact, company }: CompanyDetailsProps) {
  const details = [
    { label: "Company Name", value: company.name },
    { label: "Industry", value: company.industry },
    { label: "Company Size", value: company.companySize },
    { label: "Head Office", value: company.headquarters },
    { label: "Website", value: company.website, link: true },
    { label: "Official Email", value: contact.email, link: true, mailto: true },
    { label: "Phone Number", value: contact.phone },
    { label: "LinkedIn Company Page", value: contact.linkedin, link: true },
    { label: "Business Registration Number", value: contact.businessRegNumber },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Details</h2>
      <div className="grid grid-cols-2 gap-4">
        {details.map((item) => (
          <div key={item.label} className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">{item.label}</p>
            {item.link ? (
              <a
                href={item.mailto ? `mailto:${item.value}` : item.value}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                {item.value}
              </a>
            ) : (
              <p className="text-sm font-medium text-gray-900">{item.value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
