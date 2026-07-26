import { Button } from "@/components/ui/Button";
import { CompanyProfileData } from "@/data/company/companyProfile";

interface DocumentsProps {
  documents: CompanyProfileData["documents"];
}

export function Documents({ documents }: DocumentsProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Documents</h2>
      <div className="grid grid-cols-2 gap-4">
        {documents.map((doc) => (
          <div key={doc.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                <p className="text-xs text-gray-500">{doc.type}</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Download
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
