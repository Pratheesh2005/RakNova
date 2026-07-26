import { ProgressBar } from "@/components/ui/ProgressBar";

interface ResumeScoreCardProps {
  overallScore: number;
  sections: { label: string; score: number }[];
}

export function ResumeScoreCard({ overallScore, sections }: ResumeScoreCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-50 border-4 border-brand-100">
          <span className="text-2xl font-bold text-brand-600">{overallScore}%</span>
        </div>
        <p className="mt-2 text-sm text-gray-500">ATS Compatibility Score</p>
      </div>
      <div className="space-y-3">
        {sections.map((section) => (
          <ProgressBar
            key={section.label}
            label={section.label}
            value={section.score}
            size="sm"
            color={section.score >= 70 ? "green" : section.score >= 40 ? "yellow" : "red"}
          />
        ))}
      </div>
    </div>
  );
}
