import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/utils/formatDate";

interface ResumeOverviewCardProps {
  fileName: string;
  fileType: string;
  fileSize: string;
  uploadDate: string;
  lastUpdated: string;
  status: string;
}

export function ResumeOverviewCard({ fileName, fileType, fileSize, uploadDate, lastUpdated, status }: ResumeOverviewCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* File Icon */}
        <div className="w-16 h-16 bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
          <svg className="w-8 h-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        {/* File Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900">{fileName}</h3>
            <Badge variant="info" size="sm">{fileType.toUpperCase()}</Badge>
            <Badge variant="success" size="sm">{status}</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 mt-2 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Uploaded: {formatDate(uploadDate)}
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Updated: {lastUpdated}
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7" />
              </svg>
              Size: {fileSize}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
