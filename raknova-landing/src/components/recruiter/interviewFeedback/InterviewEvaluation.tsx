import { InterviewFeedbackData } from "@/data/recruiter/interviewFeedback";

interface InterviewEvaluationProps {
  ratings: InterviewFeedbackData["evaluationRatings"];
  onRatingChange: (category: string, value: number) => void;
}

const categories = [
  { key: "technicalKnowledge", label: "Technical Knowledge" },
  { key: "problemSolving", label: "Problem Solving" },
  { key: "communication", label: "Communication" },
  { key: "confidence", label: "Confidence" },
  { key: "culturalFit", label: "Cultural Fit" },
  { key: "roleUnderstanding", label: "Role Understanding" },
  { key: "learningAbility", label: "Learning Ability" },
  { key: "overallPerformance", label: "Overall Performance" },
];

export function InterviewEvaluation({ ratings, onRatingChange }: InterviewEvaluationProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Interview Evaluation</h2>
      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.key} className="flex items-center justify-between">
            <span className="text-sm text-gray-700 w-48">{cat.label}</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => onRatingChange(cat.key, value)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    (ratings as any)[cat.key] === value
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
