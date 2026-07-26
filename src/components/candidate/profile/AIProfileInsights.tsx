import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";

const insights = {
  profileStrength: 88,
  atsReadiness: 91,
  missingSkills: ["Docker", "Kubernetes", "GraphQL"],
  suggestedCertifications: ["AWS Solutions Architect", "Google Professional Cloud Developer"],
  suggestedImprovements: [
    "Add a professional profile photo to increase visibility by 40%",
    "Include quantifiable achievements in your work experience",
    "Add 2-3 more projects with live demo links",
  ],
};

export function AIProfileInsights() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">RakNova AI Profile Insights</h3>
      </div>

      {/* Scores */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-4 bg-gradient-to-br from-brand-50 to-brand-100/50 rounded-xl">
          <p className="text-sm text-gray-600">Profile Strength</p>
          <p className="text-3xl font-bold text-brand-700 mt-1">{insights.profileStrength}%</p>
          <ProgressBar value={insights.profileStrength} size="sm" color="brand" className="mt-2" />
        </div>
        <div className="p-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl">
          <p className="text-sm text-gray-600">ATS Readiness</p>
          <p className="text-3xl font-bold text-green-700 mt-1">{insights.atsReadiness}%</p>
          <ProgressBar value={insights.atsReadiness} size="sm" color="green" className="mt-2" />
        </div>
      </div>

      {/* Missing Skills */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">⚠️ Skills You're Missing</p>
        <div className="flex flex-wrap gap-2">
          {insights.missingSkills.map((skill) => (
            <Badge key={skill} variant="warning" size="md">{skill}</Badge>
          ))}
        </div>
      </div>

      {/* Suggested Certifications */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">📜 Suggested Certifications</p>
        <div className="space-y-2">
          {insights.suggestedCertifications.map((cert) => (
            <div key={cert} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg text-sm text-gray-700">
              <svg className="w-4 h-4 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {cert}
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Improvements */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">💡 Suggested Resume Improvements</p>
        <ul className="space-y-2">
          {insights.suggestedImprovements.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="text-brand-500 mt-0.5">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
