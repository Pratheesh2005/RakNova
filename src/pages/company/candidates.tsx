import { useState, useMemo } from "react";
import { CompanyLayout } from "@/components/company/layout/CompanyLayout";
import { CandidateManagementHeader } from "@/components/company/candidates/CandidateManagementHeader";
import { TodayReviewQueue } from "@/components/company/candidates/TodayReviewQueue";
import { CandidateFiltersToolbar } from "@/components/company/candidates/CandidateFiltersToolbar";
import { CandidateTable } from "@/components/company/candidates/CandidateTable";
import { BulkActionsBar } from "@/components/company/candidates/BulkActionsBar";
import { CandidatePreviewPanel } from "@/components/company/candidates/CandidatePreviewPanel";
import { RecentActivity } from "@/components/company/candidates/RecentActivity";
import { EmptyCandidateState } from "@/components/company/candidates/EmptyCandidateState";
import { candidates, Candidate } from "@/data/company/candidates";

export default function CandidateManagementPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sort, setSort] = useState("match");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [previewCandidate, setPreviewCandidate] = useState<Candidate | null>(null);

  const filteredCandidates = useMemo(() => {
    let result = [...candidates];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.skills.some((s) => s.toLowerCase().includes(q)) ||
          c.appliedJob.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "All") {
      result = result.filter((c) => c.currentStage === statusFilter);
    }

    switch (sort) {
      case "match":
        result.sort((a, b) => b.aiMatch - a.aiMatch);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime());
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime());
        break;
      case "resumeScore":
        result.sort((a, b) => b.resumeScore - a.resumeScore);
        break;
      case "experience":
        result.sort((a, b) => parseInt(b.experience) - parseInt(a.experience));
        break;
    }

    return result;
  }, [search, statusFilter, sort]);

  const handleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredCandidates.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleViewCandidate = (candidate: Candidate) => {
    setPreviewCandidate(candidate);
  };

  return (
    <CompanyLayout>
      <div className="space-y-6">
        <CandidateManagementHeader />

        <TodayReviewQueue />

        <CandidateFiltersToolbar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          sort={sort}
          onSortChange={setSort}
        />

        {filteredCandidates.length === 0 ? (
          <EmptyCandidateState />
        ) : (
          <CandidateTable
            candidates={filteredCandidates}
            selectedIds={selectedIds}
            onSelect={handleSelect}
            onSelectAll={handleSelectAll}
            onViewCandidate={handleViewCandidate}
          />
        )}

        <RecentActivity />
      </div>

      <BulkActionsBar
        selectedCount={selectedIds.length}
        onClear={() => setSelectedIds([])}
      />

      <CandidatePreviewPanel
        candidate={previewCandidate}
        onClose={() => setPreviewCandidate(null)}
      />
    </CompanyLayout>
  );
}
