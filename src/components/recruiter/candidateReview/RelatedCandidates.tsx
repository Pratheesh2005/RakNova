import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface RelatedCandidatesProps {
  candidates: { name: string; aiMatch: number; experience: string; resumeScore: number }[];
}

export function RelatedCandidates({ candidates }: RelatedCandidatesProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Candidates</h2>
      <div className="space-y-3">
        {candidates.map((c, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">{c.name}</p>
              <p className="text-xs text-gray-500">{c.experience} | Score {c.resumeScore}%</p>
            </div>
            <Badge variant="default" className="bg-green-50 text-green-700">{c.aiMatch}% Match</Badge>
            <Button variant="ghost" size="sm">View</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
