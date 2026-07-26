import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface DeleteJobDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  jobTitle: string;
}

export function DeleteJobDialog({ isOpen, onClose, onConfirm, jobTitle }: DeleteJobDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Job">
      <p className="text-sm text-gray-600 mb-2">
        Are you sure you want to permanently delete <strong>{jobTitle}</strong>?
      </p>
      <p className="text-xs text-gray-500 mb-6">This action cannot be undone. All associated applications will be archived.</p>
      <div className="flex gap-3">
        <Button variant="outline" size="sm" className="flex-1" onClick={onClose}>Cancel</Button>
        <Button variant="primary" size="sm" className="flex-1 bg-red-600 hover:bg-red-700" onClick={onConfirm}>Delete</Button>
      </div>
    </Modal>
  );
}
