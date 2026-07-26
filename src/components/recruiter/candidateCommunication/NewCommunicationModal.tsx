import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface NewCommunicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewCommunicationModal({ isOpen, onClose }: NewCommunicationModalProps) {
  const [candidate, setCandidate] = useState("");
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("Email");
  const [message, setMessage] = useState("");

  const handleSaveDraft = () => {
    // placeholder
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Communication">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Candidate</label>
          <input type="text" value={candidate} onChange={(e) => setCandidate(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" placeholder="Select candidate..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" placeholder="Enter subject..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Communication Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm">
            <option>Email</option>
            <option>Phone</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Follow-up</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea rows={6} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" placeholder="Type your message..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Date (Optional)</label>
          <input type="date" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
        </div>
        <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="ghost" size="sm" onClick={handleSaveDraft}>Save Draft</Button>
          <Button variant="primary" size="sm" onClick={onClose}>Send</Button>
        </div>
      </div>
    </Modal>
  );
}
