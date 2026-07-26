import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

interface ResumeUploaderProps {
  onUpload: (file: File) => void;
  hasResume: boolean;
  fileName?: string;
}

export function ResumeUploader({ onUpload, hasResume, fileName }: ResumeUploaderProps) {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "application/pdf" || file.type.includes("word"))) {
      onUpload(file);
    }
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={cn(
        "border-2 border-dashed rounded-2xl p-8 text-center transition-all",
        dragOver ? "border-brand-400 bg-brand-50" : "border-gray-300 hover:border-gray-400"
      )}
    >
      {hasResume ? (
        <div>
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-gray-900">{fileName || "Resume uploaded"}</p>
          <p className="text-sm text-gray-500 mt-1">Drag & drop to replace, or click below</p>
        </div>
      ) : (
        <div>
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-gray-900">Upload your resume</p>
          <p className="text-sm text-gray-500 mt-1">PDF, DOCX up to 5MB</p>
        </div>
      )}

      <label className="mt-4 inline-block cursor-pointer">
        <Button variant={hasResume ? "outline" : "primary"} size="sm" type="button" onClick={() => document.getElementById("resume-file")?.click()}>
          {hasResume ? "Replace Resume" : "Upload Resume"}
        </Button>
        <input id="resume-file" type="file" accept=".pdf,.doc,.docx" onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])} className="hidden" />
      </label>
    </div>
  );
}
