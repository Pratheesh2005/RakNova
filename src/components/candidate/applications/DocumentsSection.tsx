import { Button } from "@/components/ui/Button";

interface DocumentsSectionProps {
  documents: {
    resume: string;
    coverLetter?: string;
    portfolio?: string;
    certificates?: string[];
    linkedin?: string;
    github?: string;
  };
}

export function DocumentsSection({ documents }: DocumentsSectionProps) {
  return (
    <div className="space-y-4">
      {/* Resume */}
      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{documents.resume}</p>
            <p className="text-xs text-gray-500">Resume Submitted</p>
          </div>
        </div>
        <Button variant="outline" size="sm">Download</Button>
      </div>

      {/* Cover Letter */}
      {documents.coverLetter && (
        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{documents.coverLetter}</p>
              <p className="text-xs text-gray-500">Cover Letter</p>
            </div>
          </div>
          <Button variant="outline" size="sm">View</Button>
        </div>
      )}

      {/* Links */}
      <div className="grid grid-cols-2 gap-3">
        {documents.portfolio && (
          <a href={documents.portfolio} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm text-gray-700">
            🌐 Portfolio
          </a>
        )}
        {documents.linkedin && (
          <a href={documents.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm text-gray-700">
            💼 LinkedIn
          </a>
        )}
        {documents.github && (
          <a href={documents.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm text-gray-700">
            💻 GitHub
          </a>
        )}
      </div>

      {/* Certificates */}
      {documents.certificates && documents.certificates.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">📜 Certificates</p>
          <div className="flex flex-wrap gap-2">
            {documents.certificates.map((cert, i) => (
              <span key={i} className="px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-lg text-xs font-medium border border-yellow-200">
                {cert}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
