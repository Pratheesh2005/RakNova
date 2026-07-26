interface InterviewChecklistProps {
  items: { label: string; checked: boolean }[];
  onToggle: (index: number) => void;
}

export function InterviewChecklist({ items, onToggle }: InterviewChecklistProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Interview Checklist</h2>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <label key={idx} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => onToggle(idx)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className={`text-sm ${item.checked ? "text-gray-700" : "text-gray-500"}`}>{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
