import { useState, useMemo } from "react";
import { RecruiterLayout } from "@/components/recruiter/layout/RecruiterLayout";
import { AssignedCandidatesHeader } from "@/components/recruiter/assignedCandidates/AssignedCandidatesHeader";
import { ReviewQueue } from "@/components/recruiter/assignedCandidates/ReviewQueue";
import { CandidateFiltersToolbar } from "@/components/recruiter/assignedCandidates/CandidateFiltersToolbar";
import { CandidateTable } from "@/components/recruiter/assignedCandidates/CandidateTable";
import { CandidatePreviewPanel } from "@/components/recruiter/assignedCandidates/CandidatePreviewPanel";
import { BulkActionsBar } from "@/components/recruiter/assignedCandidates/BulkActionsBar";
import { RecentActivity } from "@/components/recruiter/assignedCandidates/RecentActivity";
import { QuickActions } from "@/components/recruiter/assignedCandidates/QuickActions";
import { EmptyState } from "@/components/recruiter/assignedCandidates/EmptyState";
import { assignedCandidates, AssignedCandidate } from "@/data/recruiter/assignedCandidates";

export default function AssignedCandidatesPage() {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("All");
  const [sort, setSort] = useState("newest");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [previewCandidate, setPreviewCandidate] = useState<AssignedCandidate | null>(null);

  const filtered = useMemo(() => {
    let result = [...assignedCandidates];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.appliedJob.toLowerCase().includes(q)
      );
    }
    if (stageFilter !== "All") {
      result = result.filter((c) => c.currentStage === stageFilter);
    }
    switch (sort) {
      case "newest":
        result.sort((a, b) => new Date(b.assignedDate).getTime() - new Date(a.assignedDate).getTime());
        break;
      case "match":
        result.sort((a, b) => b.aiMatch - a.aiMatch);
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.assignedDate).getTime() - new Date(b.assignedDate).getTime());
        break;
      case "resumeScore":
        result.sort((a, b) => b.resumeScore - a.resumeScore);
        break;
    }
    return result;
  }, [search, stageFilter, sort]);

  const handleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  const handleSelectAll = (checked: boolean) => {
    if (checked) setSelectedIds(filtered.map((c) => c.id));
    else setSelectedIds([]);
  };

  if (assignedCandidates.length === 0) {
    return (
      <RecruiterLayout>
        <EmptyState />
      </RecruiterLayout>
    );
  }

  return (
    <RecruiterLayout>
      <div className="space-y-6">
        <AssignedCandidatesHeader />
        <ReviewQueue />
        <CandidateFiltersToolbar
          search={search}
          onSearchChange={setSearch}
          stageFilter={stageFilter}
          onStageChange={setStageFilter}
          sort={sort}
          onSortChange={setSort}
        />
        <CandidateTable
          candidates={filtered}
          selectedIds={selectedIds}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
          onViewCandidate={setPreviewCandidate}
        />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </div>
      <BulkActionsBar selectedCount={selectedIds.length} onClear={() => setSelectedIds([])} />
      <CandidatePreviewPanel candidate={previewCandidate} onClose={() => setPreviewCandidate(null)} />
    </RecruiterLayout>
  );
}
