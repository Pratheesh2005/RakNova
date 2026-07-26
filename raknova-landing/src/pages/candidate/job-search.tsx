import { useState, useMemo } from "react";
import { CandidateLayout } from "@/components/candidate/layout/CandidateLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JobCard } from "@/components/candidate/jobs/JobCard";
import { JobFilters } from "@/components/candidate/jobs/JobFilters";
import { JobStats } from "@/components/candidate/jobs/JobStats";
import { JobDetailDrawer } from "@/components/candidate/jobs/JobDetailDrawer";
import { Pagination } from "@/components/candidate/jobs/Pagination";
import { EmptyJobState } from "@/components/candidate/jobs/EmptyJobState";
import { JobSkeleton } from "@/components/candidate/jobs/JobSkeleton";
import { ComingSoonAI } from "@/components/candidate/jobs/ComingSoonAI";
import { allJobs, Job } from "@/data/candidate/jobs";
import { SearchInput } from "@/components/ui/SearchInput";

const JOBS_PER_PAGE = 5;

export default function JobSearchPage() {
  const [filters, setFilters] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading] = useState(false);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  const filteredJobs = useMemo(() => {
    let result = [...allJobs];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (job) =>
          job.position.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.requiredSkills.some((s) => s.toLowerCase().includes(q)) ||
          job.location.toLowerCase().includes(q)
      );
    }

    if (filters.jobType?.length) {
      result = result.filter((job) => filters.jobType.includes(job.jobType));
    }
    if (filters.workType?.length) {
      result = result.filter((job) => filters.workType.includes(job.workType));
    }
    if (filters.experience && filters.experience !== "All Experience") {
      result = result.filter((job) => job.experience === filters.experience);
    }
    if (filters.location && filters.location !== "All Locations") {
      result = result.filter((job) => job.location === filters.location);
    }
    if (filters.industry && filters.industry !== "All Industries") {
      result = result.filter((job) => job.industry === filters.industry);
    }
    if (filters.companySize && filters.companySize !== "All Sizes") {
      result = result.filter((job) => job.companySize === filters.companySize);
    }

    // Sort
    if (sortBy === "newest") result.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    if (sortBy === "match") result.sort((a, b) => b.matchPercentage - a.matchPercentage);
    if (sortBy === "salary") result.sort((a, b) => b.salaryMax - a.salaryMax);

    return result;
  }, [searchQuery, filters, sortBy]);

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * JOBS_PER_PAGE, currentPage * JOBS_PER_PAGE);

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setDrawerOpen(true);
  };

  const handleSaveJob = (jobId: number) => {
    setSavedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <CandidateLayout>
      <Breadcrumb items={[{ label: "Jobs" }, { label: "Search" }]} className="mb-4" />

      {/* Stats */}
      <div className="mb-6">
        <JobStats />
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 space-y-6">
            <JobFilters onFilter={setFilters} />
            <ComingSoonAI />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search & Sort Bar */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search jobs by title, company, or skills..." />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 whitespace-nowrap">{filteredJobs.length} jobs</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="newest">Newest</option>
                <option value="match">Highest Match</option>
                <option value="salary">Highest Salary</option>
              </select>
            </div>
          </div>

          {/* Job Cards */}
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => <JobSkeleton key={i} />)}
            </div>
          ) : paginatedJobs.length === 0 ? (
            <EmptyJobState onClearFilters={handleClearFilters} />
          ) : (
            <div className="space-y-4">
              {paginatedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onViewDetails={handleViewDetails}
                  saved={savedJobs.includes(job.id)}
                  onSave={() => handleSaveJob(job.id)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="py-4">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          )}
        </div>
      </div>

      {/* Job Detail Drawer */}
      <JobDetailDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} job={selectedJob} />
    </CandidateLayout>
  );
}
