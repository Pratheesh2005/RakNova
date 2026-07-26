import { InterviewFeedbackData } from "@/data/recruiter/interviewFeedback";

interface DetailedObservationsProps {
  observations: InterviewFeedbackData["observations"];
  onChange: (field: string, value: string) => void;
}

export function DetailedObservations({ observations, onChange }: DetailedObservationsProps) {
  const fields = [
    { key: "strengths", label: "Strengths" },
    { key: "areasForImprovement", label: "Areas for Improvement" },
    { key: "technicalObservations", label: "Technical Observations" },
    { key: "communicationNotes", label: "Communication Notes" },
    { key: "generalComments", label: "General Comments" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Detailed Observations</h2>
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
            <textarea
              rows={3}
              value={(observations as any)[field.key]}
              onChange={(e) => onChange(field.key, e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter ${field.label.toLowerCase()}...`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
