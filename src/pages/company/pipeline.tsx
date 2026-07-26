import { useState, useMemo } from "react";
import { CompanyLayout } from "@/components/company/layout/CompanyLayout";
import { PipelineHeader } from "@/components/company/pipeline/PipelineHeader";
import { PipelineOverview } from "@/components/company/pipeline/PipelineOverview";
import { PipelineBoard } from "@/components/company/pipeline/PipelineBoard";
import { PipelineFilters } from "@/components/company/pipeline/PipelineFilters";
import { AIPipelineInsights } from "@/components/company/pipeline/AIPipelineInsights";
import { PipelineActivity } from "@/components/company/pipeline/PipelineActivity";
import { QuickActions } from "@/components/company/pipeline/QuickActions";
import { EmptyPipelineState } from "@/components/company/pipeline/EmptyPipelineState";
import { CandidateQuickView } from "@/components/company/pipeline/CandidateQuickView";
import { MoveCandidateDialog } from "@/components/company/pipeline/MoveCandidateDialog";
import { candidates as initialCandidates, PipelineCandidate, PipelineStage } from "@/data/company/pipeline";

export default function RecruitmentPipelinePage() {
  const [candidates, setCandidates] = useState<PipelineCandidate[]>(initialCandidates);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [viewCandidate, setViewCandidate] = useState<PipelineCandidate | null>(null);
  const [moveDialog, setMoveDialog] = useState<{
    candidate: PipelineCandidate;
    target: PipelineStage;
  } | null>(null);

  const filteredCandidates = useMemo(() => {
    let result = [...candidates];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.position.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case "newest":
        result.sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime());
        break;
      case "match":
        result.sort((a, b) => b.aiMatch - a.aiMatch);
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime());
        break;
    }
    return result;
  }, [candidates, search, sort]);

  const handleMoveCandidate = (candidate: PipelineCandidate, target: PipelineStage) => {
    setMoveDialog({ candidate, target });
  };

  const confirmMove = () => {
    if (!moveDialog) return;
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === moveDialog.candidate.id ? { ...c, stage: moveDialog.target } : c
      )
    );
    setMoveDialog(null);
  };

  if (candidates.length === 0) {
    return (
      <CompanyLayout>
        <EmptyPipelineState />
      </CompanyLayout>
    );
  }

  return (
    <CompanyLayout>
      <div className="space-y-6">
        <PipelineHeader />
        <PipelineOverview candidates={filteredCandidates} />
        <PipelineFilters search={search} onSearchChange={setSearch} sort={sort} onSortChange={setSort} />
        <PipelineBoard
          candidates={filteredCandidates}
          onViewCandidate={setViewCandidate}
          onMoveCandidate={handleMoveCandidate}
        />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AIPipelineInsights />
          </div>
          <div className="space-y-6">
            <QuickActions />
            <PipelineActivity />
          </div>
        </div>
      </div>

      <CandidateQuickView candidate={viewCandidate} onClose={() => setViewCandidate(null)} />
      {moveDialog && (
        <MoveCandidateDialog
          isOpen={!!moveDialog}
          onClose={() => setMoveDialog(null)}
          candidateName={moveDialog.candidate.name}
          targetStage={moveDialog.target}
          onConfirm={confirmMove}
        />
      )}
    </CompanyLayout>
  );
}
