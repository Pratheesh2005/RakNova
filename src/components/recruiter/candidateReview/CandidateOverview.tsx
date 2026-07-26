import { CandidateReviewData } from "@/data/recruiter/candidateReview";

interface CandidateOverviewProps {
  candidate: CandidateReviewData;
}

export function CandidateOverview({ candidate }: CandidateOverviewProps) {
  const items = [
    { label: "Experience", value: candidate.experience },
    { label: "Education", value: candidate.education },
    { label: "Location", value: candidate.location },
    { label: "Expected Salary", value: candidate.expectedSalary },
    { label: "Notice Period", value: candidate.noticePeriod },
    { label: "Availability", value: candidate.availability },
    { label: "Current Employer", value: candidate.currentEmployer },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Candidate Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.label} className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className="text-sm font-medium text-gray-900 mt-1">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
