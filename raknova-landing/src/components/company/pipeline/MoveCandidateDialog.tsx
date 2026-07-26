import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface MoveCandidateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
  targetStage: string;
  onConfirm: () => void;
}

export function MoveCandidateDialog({ isOpen, onClose, candidateName, targetStage, onConfirm }: MoveCandidateDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Move Candidate">
      <p className="text-sm text-gray-600 mb-4">
        Move <strong>{candidateName}</strong> to <strong>{targetStage}</strong>?
      </p>
      <div className="flex gap-3">
        <Button variant="outline" size="sm" className="flex-1" onClick={onClose}>Cancel</Button>
        <Button variant="primary" size="sm" className="flex-1" onClick={onConfirm}>Confirm</Button>
      </div>
    </Modal>
  );
}
