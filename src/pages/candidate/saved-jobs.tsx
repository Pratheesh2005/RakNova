import { useState, useMemo } from "react";
import { CandidateLayout } from "@/components/candidate/layout/CandidateLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SavedJobCard } from "@/components/candidate/jobs/SavedJobCard";
import { SavedJobStats } from "@/components/candidate/jobs/SavedJobStats";
import { SavedJobFilters } from "@/components/candidate/jobs/SavedJobFilters";
import { CompareJobsModal } from "@/components/candidate/jobs/CompareJobsModal";
import { RecentlySavedTimeline } from "@/components/candidate/jobs/RecentlySavedTimeline";
import { EmptySavedJobs } from "@/components/candidate/jobs/EmptySavedJobs";
import { SavedJobsSkeleton } from "@/components/candidate/jobs/SavedJobsSkeleton";
import { JobDetailDrawer } from "@/components/candidate/jobs/JobDetailDrawer";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";
import { savedJobs, SavedJob } from "@/data/candidate/savedJobs";

export default function SavedJobsPage() {
  const [jobs, setJobs] = useState<SavedJob[]>(savedJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [loading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeJob, setActiveJob] = useState<any>(null);

  const filteredJobs = useMemo(() => {
    let result = [...jobs];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (job) =>
          job.position.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.requiredSkills.some((s) => s.toLowerCase().includes(q))
      );
    }
    return result;
  }, [jobs, searchQuery]);

  const handleSelect = (id: number) => {
    setSelectedJobs((prev) =>
      prev.includes(id) ? prev.filter((j) => j !== id) : [...prev, id]
    );
  };

  const handleRemove = (id: number) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    setSelectedJobs((prev) => prev.filter((j) => j !== id));
  };

  const handleApply = (id: number) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, hasApplied: true } : j)));
  };

  const handleShare = (job: SavedJob) => {
    if (typeof window !== "undefined" && navigator.share) {
      navigator.share({ title: job.position, text: `${job.position} at ${job.company}`, url: window.location.href });
    }
  };

  const handleViewDetails = (job: SavedJob) => {
    setActiveJob({
      ...job,
      preferredSkills: [],
      responsibilities: ["Develop and maintain web applications", "Collaborate with cross-functional teams"],
      companyOverview: `${job.company} is a leading organization in its domain.`,
      companySize: "Mid-size" as const,
      industry: "Software",
      openPositions: 1,
    });
    setDrawerOpen(true);
  };

  const jobsToCompare = jobs.filter((j) => selectedJobs.includes(j.id));

  if (jobs.length === 0) {
    return (
      <CandidateLayout>
        <Breadcrumb items={[{ label: "Saved Jobs" }]} className="mb-4" />
        <EmptySavedJobs />
      </CandidateLayout>
    );
  }

  return (
    <CandidateLayout>
      <Breadcrumb items={[{ label: "Saved Jobs" }]} className="mb-4" />

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Saved Jobs</h2>
        <p className="text-sm text-gray-500 mt-1">Manage all your bookmarked opportunities in one place.</p>
      </div>

      {/* Stats */}
      <div className="mb-6">
        <SavedJobStats />
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 space-y-6">
            <SavedJobFilters onFilter={(f) => console.log(f)} />
            <RecentlySavedTimeline />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search & Compare Bar */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search saved jobs by title, company, or skills..." />
            </div>
            {selectedJobs.length >= 2 && (
              <Button variant="primary" size="sm" onClick={() => setCompareOpen(true)}>
                Compare ({selectedJobs.length})
              </Button>
            )}
            <span className="text-sm text-gray-500">{filteredJobs.length} saved jobs</span>
          </div>

          {/* Job Cards */}
          {loading ? (
            <SavedJobsSkeleton />
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <SavedJobCard
                  key={job.id}
                  job={job}
                  selected={selectedJobs.includes(job.id)}
                  onSelect={handleSelect}
                  onRemove={handleRemove}
                  onApply={handleApply}
                  onViewDetails={handleViewDetails}
                  onShare={handleShare}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Compare Modal */}
      <CompareJobsModal isOpen={compareOpen} onClose={() => setCompareOpen(false)} jobs={jobsToCompare} />
      <JobDetailDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} job={activeJob} />
    </CandidateLayout>
  );
}
