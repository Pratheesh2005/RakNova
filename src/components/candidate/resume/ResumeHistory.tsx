import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/utils/formatDate";

interface ResumeVersion {
  id: number;
  name: string;
  uploadDate: string;
  size: string;
  current: boolean;
}

const mockHistory: ResumeVersion[] = [
  { id: 1, name: "Resume_v1.pdf", uploadDate: "2026-07-15", size: "1.2 MB", current: false },
  { id: 2, name: "Resume_v2.pdf", uploadDate: "2026-07-20", size: "1.5 MB", current: false },
  { id: 3, name: "Resume_Final.pdf", uploadDate: "2026-07-24", size: "1.8 MB", current: true },
];

export function ResumeHistory() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume History</h3>
      <div className="space-y-3">
        {mockHistory.map((version, idx) => (
          <div
            key={version.id}
            className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
              version.current
                ? "bg-brand-50 border border-brand-200"
                : "bg-gray-50 border border-gray-100 hover:border-gray-200"
            }`}
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-gray-900 truncate">{version.name}</p>
                {version.current && <Badge variant="success" size="sm">Current</Badge>}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Uploaded {formatDate(version.uploadDate)} • {version.size}
              </p>
            </div>
            <button className="text-sm text-brand-600 hover:text-brand-700 font-medium flex-shrink-0">
              Restore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
