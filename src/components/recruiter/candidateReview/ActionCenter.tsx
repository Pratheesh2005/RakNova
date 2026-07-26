import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export function ActionCenter() {
  const [modal, setModal] = useState<{ action: string } | null>(null);

  const actions = [
    { label: "Move to Next Stage", variant: "primary" as const },
    { label: "Schedule Interview", variant: "outline" as const },
    { label: "Request Additional Information", variant: "outline" as const },
    { label: "Hold Candidate", variant: "outline" as const },
    { label: "Reject Candidate", variant: "outline" as const, className: "text-red-600 border-red-300 hover:bg-red-50" },
  ];

  const confirmAction = () => {
    // Placeholder: perform action
    setModal(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Action Center</h2>
      <div className="flex flex-wrap gap-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant}
            size="sm"
            className={action.className}
            onClick={() => setModal({ action: action.label })}
          >
            {action.label}
          </Button>
        ))}
      </div>

      {modal && (
        <Modal isOpen={!!modal} onClose={() => setModal(null)} title={modal.action}>
          <p className="text-sm text-gray-600 mb-4">Are you sure you want to <strong>{modal.action.toLowerCase()}</strong>?</p>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => setModal(null)}>Cancel</Button>
            <Button variant="primary" size="sm" className="flex-1" onClick={confirmAction}>Confirm</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
