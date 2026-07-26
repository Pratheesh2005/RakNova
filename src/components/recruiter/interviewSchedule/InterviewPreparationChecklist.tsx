import { useState } from "react";

const initialItems = [
  "Resume Reviewed",
  "Portfolio Reviewed",
  "Job Description Reviewed",
  "Questions Prepared",
  "Evaluation Form Ready",
  "Meeting Link Verified",
];

export function InterviewPreparationChecklist() {
  const [checked, setChecked] = useState<boolean[]>(
    initialItems.map(() => false)
  );

  const toggle = (idx: number) => {
    setChecked((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Interview Preparation</h2>
      <div className="space-y-2">
        {initialItems.map((item, idx) => (
          <label
            key={idx}
            className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50"
          >
            <input
              type="checkbox"
              checked={checked[idx]}
              onChange={() => toggle(idx)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className={checked[idx] ? "text-sm text-gray-700 line-through" : "text-sm text-gray-700"}>
              {item}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
