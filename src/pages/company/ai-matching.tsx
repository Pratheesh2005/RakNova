import { useState } from "react";
import { CompanyLayout } from "@/components/company/layout/CompanyLayout";
import { AIMatchingHeader } from "@/components/company/ai-matching/AIMatchingHeader";
import { AIHighlights } from "@/components/company/ai-matching/AIHighlights";
import { JobSelector } from "@/components/company/ai-matching/JobSelector";
import { RecommendedCandidatesTable } from "@/components/company/ai-matching/RecommendedCandidatesTable";
import { MatchBreakdownPanel } from "@/components/company/ai-matching/MatchBreakdownPanel";
import { CompareCandidatesModal } from "@/components/company/ai-matching/CompareCandidatesModal";
import { QuickActionsPanel } from "@/components/company/ai-matching/QuickActionsPanel";
import { EmptyState } from "@/components/company/ai-matching/EmptyState";
import {
  jobOpenings,
  allRecommendedCandidates,
  RecommendedCandidate,
} from "@/data/company/aiMatching";

export default function AIMatchingPage() {
  const [selectedJobId, setSelectedJobId] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [breakdownCandidate, setBreakdownCandidate] = useState<RecommendedCandidate | null>(null);
  const [compareOpen, setCompareOpen] = useState(false);

  const candidates = allRecommendedCandidates[selectedJobId] || [];

  const handleToggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleViewBreakdown = (candidate: RecommendedCandidate) => {
    setBreakdownCandidate(candidate);
  };

  const handleCompare = () => {
    const selected = candidates.filter((c) => selectedIds.includes(c.id));
    if (selected.length >= 2) {
      setCompareOpen(true);
    }
  };

  return (
    <CompanyLayout>
      <div className="space-y-6">
        <AIMatchingHeader />

        <JobSelector jobs={jobOpenings} selectedJobId={selectedJobId} onSelect={setSelectedJobId} />

        {candidates.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <AIHighlights candidates={candidates} />

            <RecommendedCandidatesTable
              candidates={candidates}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onViewBreakdown={handleViewBreakdown}
              onCompare={handleCompare}
              compareEnabled={selectedIds.length >= 2}
            />

            {breakdownCandidate && (
              <div className="mt-4">
                <MatchBreakdownPanel
                  candidate={breakdownCandidate}
                  onClose={() => setBreakdownCandidate(null)}
                />
              </div>
            )}

            <QuickActionsPanel />
          </>
        )}
      </div>

      <CompareCandidatesModal
        isOpen={compareOpen}
        onClose={() => setCompareOpen(false)}
        candidates={candidates.filter((c) => selectedIds.includes(c.id))}
      />
    </CompanyLayout>
  );
}
