import { ProgressBar } from "@/components/ui/ProgressBar";
import { CandidateReviewData } from "@/data/recruiter/candidateReview";

interface AICandidateAnalysisProps {
  analysis: CandidateReviewData["aiAnalysis"];
}

export function AICandidateAnalysis({ analysis }: AICandidateAnalysisProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">AI Candidate Analysis</h2>

      <div className="p-4 bg-green-50 rounded-lg border border-green-100">
        <p className="text-sm font-medium text-green-800">{analysis.overallRecommendation}</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Strengths</h3>
        <ul className="space-y-1">
          {analysis.strengths.map((s, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
              <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        {[
          { label: "Skill Match", value: analysis.skillMatch },
          { label: "Experience Match", value: analysis.experienceMatch },
          { label: "Project Quality", value: analysis.projectQuality },
          { label: "Resume Quality", value: analysis.resumeQuality },
        ].map((item) => (
          <ProgressBar key={item.label} label={item.label} value={item.value} size="sm" color="brand" />
        ))}
      </div>

      {analysis.potentialRisks.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Potential Risks</h3>
          <ul className="space-y-1">
            {analysis.potentialRisks.map((risk, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <svg className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {risk}
              </li>
            ))}
          </ul>
        </div>
      )}

      {analysis.missingSkills.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Missing Skills</h3>
          <div className="flex flex-wrap gap-2">
            {analysis.missingSkills.map((skill) => (
              <span key={skill} className="px-3 py-1 bg-red-50 text-red-700 text-xs rounded-full">{skill}</span>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm font-medium text-blue-800">Recommended Next Step: {analysis.recommendedNextStep}</p>
      </div>
    </div>
  );
}
