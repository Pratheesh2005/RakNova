import { useState } from "react";
import { CandidateLayout } from "@/components/candidate/layout/CandidateLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ResumeOverviewCard } from "@/components/candidate/resume/ResumeOverviewCard";
import { ResumeUploadArea } from "@/components/candidate/resume/ResumeUploadArea";
import { ResumePreviewPanel } from "@/components/candidate/resume/ResumePreviewPanel";
import { ResumeActions } from "@/components/candidate/resume/ResumeActions";
import { ResumeHistory } from "@/components/candidate/resume/ResumeHistory";
import { ResumeStatistics } from "@/components/candidate/resume/ResumeStatistics";
import { AIResumeReadiness } from "@/components/candidate/resume/AIResumeReadiness";
import { ResumeInsights } from "@/components/candidate/resume/ResumeInsights";
import { ResumeChecklist } from "@/components/candidate/resume/ResumeChecklist";
import { SupportedFormats } from "@/components/candidate/resume/SupportedFormats";
import { ResumeTips } from "@/components/candidate/resume/ResumeTips";
import { FutureAIFeatures } from "@/components/candidate/resume/FutureAIFeatures";
import { EmptyResumeState } from "@/components/candidate/resume/EmptyResumeState";
import { UploadSuccessDialog } from "@/components/candidate/resume/UploadSuccessDialog";

export default function ResumePage() {
  const [hasResume] = useState(true); // Toggle to false to see empty state
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleUpload = (file: File) => {
    setUploadedFile(file);
    setShowSuccess(true);
  };

  const handleDelete = () => {
    // Delete logic
  };

  const handleShare = () => {
    // Share logic
  };

  if (!hasResume) {
    return (
      <CandidateLayout>
        <Breadcrumb items={[{ label: "Resume Manager" }]} className="mb-4" />
        <EmptyResumeState onUpload={() => document.getElementById("resume-upload-empty")?.click()} />
        <input id="resume-upload-empty" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
        <UploadSuccessDialog isOpen={showSuccess} onClose={() => setShowSuccess(false)} fileName={uploadedFile?.name || ""} />
      </CandidateLayout>
    );
  }

  return (
    <CandidateLayout>
      <Breadcrumb items={[{ label: "Resume Manager" }]} className="mb-4" />

      <div className="space-y-6">
        {/* Top Section: Overview + Actions */}
        <div className="space-y-6">
          <ResumeOverviewCard
            fileName="Resume_Final.pdf"
            fileType="PDF"
            fileSize="1.8 MB"
            uploadDate="2026-07-24T00:00:00Z"
            lastUpdated="Today"
            status="Ready for AI Analysis"
          />
          <ResumeActions hasResume={true} onDelete={handleDelete} onShare={handleShare} />
        </div>

        {/* Statistics */}
        <ResumeStatistics />

        {/* Upload Area */}
        <ResumeUploadArea onUpload={handleUpload} hasResume={true} />

        {/* Resume Preview */}
        <ResumePreviewPanel />

        {/* Grid: History + AI Readiness + Insights */}
        <div className="grid lg:grid-cols-3 gap-6">
          <ResumeHistory />
          <div className="space-y-6">
            <AIResumeReadiness />
            <ResumeChecklist />
          </div>
          <div className="space-y-6">
            <ResumeInsights />
            <SupportedFormats />
          </div>
        </div>

        {/* Tips + Future AI */}
        <div className="grid lg:grid-cols-2 gap-6">
          <ResumeTips />
          <FutureAIFeatures />
        </div>
      </div>

      {/* Upload Success Dialog */}
      <UploadSuccessDialog isOpen={showSuccess} onClose={() => setShowSuccess(false)} fileName={uploadedFile?.name || ""} />
    </CandidateLayout>
  );
}
