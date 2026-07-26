import { Button } from "@/components/ui/Button";

interface EmptyResumeStateProps {
  onUpload: () => void;
}

export function EmptyResumeState({ onUpload }: EmptyResumeStateProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
      <div className="w-24 h-24 mx-auto bg-gray-100 rounded-3xl flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>

      <h3 className="text-xl font-bold text-gray-900">No Resume Uploaded</h3>
      <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
        Upload your resume to unlock AI-powered matching, ATS analysis, resume improvement suggestions, and personalized job recommendations.
      </p>

      <div className="flex justify-center gap-6 mt-6 mb-8">
        <div className="text-center">
          <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mx-auto mb-2">
            <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-xs text-gray-500">AI Matching</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-2">
            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-xs text-gray-500">ATS Analysis</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-2">
            <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <p className="text-xs text-gray-500">AI Improvement</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center mx-auto mb-2">
            <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-xs text-gray-500">Job Matches</p>
        </div>
      </div>

      <Button variant="primary" size="lg" onClick={onUpload}>
        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        Upload Resume
      </Button>
    </div>
  );
}
