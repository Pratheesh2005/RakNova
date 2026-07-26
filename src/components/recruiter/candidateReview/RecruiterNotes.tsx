import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface RecruiterNotesProps {
  initialNotes: string;
}

export function RecruiterNotes({ initialNotes }: RecruiterNotesProps) {
  const [notes, setNotes] = useState(initialNotes);
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    setEditing(false);
    // Save logic placeholder
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Recruiter Notes</h2>
        <Button variant="ghost" size="sm" onClick={() => setEditing(!editing)}>
          {editing ? "Cancel" : "Edit"}
        </Button>
      </div>
      {editing ? (
        <div className="space-y-3">
          <textarea
            rows={6}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add internal notes about the candidate..."
          />
          <div className="flex gap-2">
            <Button variant="primary" size="sm" onClick={handleSave}>Save Notes</Button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-700 whitespace-pre-wrap">{notes || "No notes yet."}</p>
      )}
    </div>
  );
}
