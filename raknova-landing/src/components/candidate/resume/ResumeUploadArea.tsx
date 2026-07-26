import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

interface ResumeUploadAreaProps {
  onUpload: (file: File) => void;
  hasResume: boolean;
}

export function ResumeUploadArea({ onUpload, hasResume }: ResumeUploadAreaProps) {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && isValidFile(file)) {
      onUpload(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isValidFile(file)) {
      onUpload(file);
    }
  };

  const isValidFile = (file: File) => {
    const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    const maxSize = 5 * 1024 * 1024; // 5MB
    return validTypes.includes(file.type) && file.size <= maxSize;
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={cn(
        "relative border-2 border-dashed rounded-2xl p-8 md:p-10 text-center transition-all cursor-pointer",
        dragOver
          ? "border-brand-400 bg-brand-50/50 scale-[1.02]"
          : "border-gray-200 hover:border-brand-300 hover:bg-gray-50/50"
      )}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <svg className="w-48 h-48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Upload Icon */}
        <div className={cn(
          "w-16 h-16 mx-auto rounded-2xl flex items-center justify-center transition-all mb-4",
          dragOver ? "bg-brand-100 scale-110" : "bg-gray-100"
        )}>
          <svg className={cn("w-8 h-8 transition-colors", dragOver ? "text-brand-600" : "text-gray-400")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-gray-900">
          {dragOver ? "Drop your resume here" : hasResume ? "Replace your resume" : "Upload your resume"}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Drag & drop or browse files — PDF, DOC, DOCX up to 5MB
        </p>

        <label className="mt-5 inline-block cursor-pointer">
          <Button variant={hasResume ? "outline" : "primary"} size="md" type="button" onClick={() => document.getElementById("resume-upload-input")?.click()}>
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            {hasResume ? "Replace Resume" : "Browse Files"}
          </Button>
          <input id="resume-upload-input" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
        </label>
      </div>
    </div>
  );
}
