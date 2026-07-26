import { Modal } from "@/components/ui/Modal";
import { RecommendedCandidate } from "@/data/company/aiMatching";

interface CompareCandidatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidates: RecommendedCandidate[];
}

export function CompareCandidatesModal({ isOpen, onClose, candidates }: CompareCandidatesModalProps) {
  if (candidates.length < 2) return null;

  const attributes = [
    { label: "AI Match", key: "matchPercentage", suffix: "%" },
    { label: "Resume Score", key: "resumeScore", suffix: "%" },
    { label: "Experience", key: "experience" },
    { label: "Education", key: "education" },
    { label: "Expected Salary", key: "expectedSalary" },
    { label: "Notice Period", key: "noticePeriod" },
    { label: "Recommendation", key: "recommendation" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Compare Candidates" size="lg">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-gray-500 font-medium">Criteria</th>
              {candidates.map((c) => (
                <th key={c.id} className="text-left py-3 px-4 font-semibold text-gray-900">{c.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attributes.map((attr) => (
              <tr key={attr.key} className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-600">{attr.label}</td>
                {candidates.map((c) => {
                  const value = (c as any)[attr.key];
                  return (
                    <td key={c.id} className="py-3 px-4">
                      {attr.suffix ? `${value}${attr.suffix}` : value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}
