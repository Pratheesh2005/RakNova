import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface InterviewNotesProps {
  notes?: string;
}

export function InterviewNotes({ notes }: InterviewNotesProps) {
  const [value, setValue] = useState(notes || "");

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 Interview Notes</h3>
      <textarea
        rows={5}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write your notes here: questions asked, mistakes, recruiter feedback, learning points, action items..."
        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
      />
      <div className="flex justify-end mt-3">
        <Button variant="primary" size="sm">Save Notes</Button>
      </div>
    </div>
  );
}
