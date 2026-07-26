import { useState } from "react";
import { cn } from "@/utils/cn";

const options = [
  "Proceed to Next Round",
  "Proceed with Conditions",
  "Hold for Review",
  "Reject Candidate",
  "Require Additional Assessment",
];

export function FinalRecommendation() {
  const [selected, setSelected] = useState<string>("Proceed to Next Round");

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Final Recommendation</h2>
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setSelected(option)}
            className={cn(
              "w-full text-left p-4 rounded-xl border transition-all",
              selected === option
                ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
