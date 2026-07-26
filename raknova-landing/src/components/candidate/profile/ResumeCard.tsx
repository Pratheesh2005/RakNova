import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";

export function ResumeCard() {
  const [hasResume, setHasResume] = useState(true);
  const [fileName, setFileName] = useState("John_Doe_Resume_2026.pdf");
  const [fileSize, setFileSize] = useState("2.4 MB");
  const [uploadDate, setUploadDate] = useState("2026-07-20");
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      setUploadDate(new Date().toISOString().split("T")[0]);
      setHasResume(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      setUploadDate(new Date().toISOString().split("T")[0]);
      setHasResume(true);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Resume</h3>
        {hasResume && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Download</Button>
            <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => setHasResume(false)}>Delete</Button>
          </div>
        )}
      </div>

      {/* Upload Area */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-2xl p-6 text-center transition-all",
          dragOver ? "border-brand-400 bg-brand-50" : "border-gray-300 hover:border-gray-400"
        )}
      >
        {hasResume ? (
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="text-left flex-1">
              <p className="font-semibold text-gray-900">{fileName}</p>
              <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                <span>{fileSize}</span>
                <span>•</span>
                <span>Uploaded: {uploadDate}</span>
              </div>
            </div>
            <label className="cursor-pointer flex-shrink-0">
              <Button variant="outline" size="sm" type="button" onClick={() => document.getElementById("resume-file")?.click()}>
                Replace
              </Button>
              <input id="resume-file" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
        ) : (
          <div>
            <div className="w-14 h-14 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-3">
              <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="font-semibold text-gray-900">Upload your resume</p>
            <p className="text-sm text-gray-500 mt-1">PDF, DOCX up to 5MB</p>
            <label className="mt-3 inline-block cursor-pointer">
              <Button variant="primary" size="sm" type="button" onClick={() => document.getElementById("resume-file")?.click()}>
                Upload Resume
              </Button>
              <input id="resume-file" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
        )}
      </div>

      {/* AI Score Preview */}
      {hasResume && (
        <div className="p-4 bg-brand-50 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-brand-900">ATS Score: <span className="font-bold">78%</span></p>
            <p className="text-xs text-brand-700">View detailed analysis in Resume Manager</p>
          </div>
        </div>
      )}
    </div>
  );
}
