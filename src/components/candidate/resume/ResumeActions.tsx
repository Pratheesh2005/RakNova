import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

interface ResumeActionsProps {
  hasResume: boolean;
  onDelete: () => void;
  onShare: () => void;
}

export function ResumeActions({ hasResume, onDelete, onShare }: ResumeActionsProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!hasResume) return null;

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Actions</h3>
        <div className="flex flex-wrap gap-3">
          <label className="cursor-pointer">
            <Button variant="primary" size="sm" type="button" onClick={() => document.getElementById("resume-replace-input")?.click()}>
              <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Replace Resume
            </Button>
            <input id="resume-replace-input" type="file" accept=".pdf,.doc,.docx" className="hidden" />
          </label>
          <Button variant="outline" size="sm">
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </Button>
          <Button variant="outline" size="sm" onClick={onShare}>
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share Resume
          </Button>
          <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => setShowDeleteModal(true)}>
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete Resume
          </Button>
        </div>
      </div>

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Resume">
        <p className="text-sm text-gray-600 mb-4">Are you sure you want to delete your resume? This action cannot be undone.</p>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="primary" size="sm" className="flex-1 bg-red-600 hover:bg-red-700" onClick={() => { onDelete(); setShowDeleteModal(false); }}>Delete</Button>
        </div>
      </Modal>
    </>
  );
}
