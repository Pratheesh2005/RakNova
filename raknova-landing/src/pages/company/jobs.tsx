import { useState, useMemo } from "react";
import { CompanyLayout } from "@/components/company/layout/CompanyLayout";
import { JobManagementHeader } from "@/components/company/jobs/JobManagementHeader";
import { JobStats } from "@/components/company/jobs/JobStats";
import { JobFiltersToolbar } from "@/components/company/jobs/JobFiltersToolbar";
import { JobTable } from "@/components/company/jobs/JobTable";
import { JobDetailPanel } from "@/components/company/jobs/JobDetailPanel";
import { AIRecommendations } from "@/components/company/jobs/AIRecommendations";
import { JobQuickActions } from "@/components/company/jobs/JobQuickActions";
import { EmptyJobState } from "@/components/company/jobs/EmptyJobState";
import { CreateJobModal } from "@/components/company/jobs/CreateJobModal";
import { DeleteJobDialog } from "@/components/company/jobs/DeleteJobDialog";
import { jobs, Job } from "@/data/company/jobs";

export default function JobManagementPage() {
  const [jobList, setJobList] = useState<Job[]>(jobs);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [sort, setSort] = useState("newest");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editJob, setEditJob] = useState<Job | null>(null);
  const [deleteJob, setDeleteJob] = useState<Job | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const filteredJobs = useMemo(() => {
    let result = [...jobList];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.department.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "All") {
      result = result.filter((j) => j.status === statusFilter);
    }

    if (departmentFilter !== "All Departments") {
      result = result.filter((j) => j.department === departmentFilter);
    }

    if (sort === "newest") {
      result.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    } else if (sort === "applications") {
      result.sort((a, b) => b.applications - a.applications);
    } else if (sort === "closing") {
      result.sort((a, b) => (a.closingDate || "").localeCompare(b.closingDate || ""));
    }

    return result;
  }, [jobList, search, statusFilter, departmentFilter, sort]);

  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
    setDetailOpen(true);
  };

  const handleEditJob = (job: Job) => {
    setEditJob(job);
    setCreateModalOpen(true);
  };

  const handleDeleteJob = (job: Job) => {
    setDeleteJob(job);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteJob) {
      setJobList((prev) => prev.filter((j) => j.id !== deleteJob.id));
    }
    setDeleteDialogOpen(false);
    setDeleteJob(null);
  };

  const handleCreateJob = () => {
    setEditJob(null);
    setCreateModalOpen(true);
  };

  return (
    <CompanyLayout>
      <div className="space-y-6">
        <JobManagementHeader onCreateJob={handleCreateJob} />

        <JobStats />

        <JobFiltersToolbar
          search={search}
          onSearchChange={setSearch}
          status={statusFilter}
          onStatusChange={setStatusFilter}
          department={departmentFilter}
          onDepartmentChange={setDepartmentFilter}
          sort={sort}
          onSortChange={setSort}
        />

        {filteredJobs.length === 0 ? (
          <EmptyJobState onCreateJob={handleCreateJob} />
        ) : (
          <JobTable
            jobs={filteredJobs}
            onView={handleViewJob}
            onEdit={handleEditJob}
            onDuplicate={() => {}}
            onPause={() => {}}
            onClose={() => {}}
            onDelete={handleDeleteJob}
          />
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AIRecommendations />
          </div>
          <div>
            <JobQuickActions onCreateJob={handleCreateJob} />
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      <JobDetailPanel job={selectedJob} onClose={() => setDetailOpen(false)} />

      {/* Create/Edit Modal */}
      <CreateJobModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        job={editJob}
      />

      {/* Delete Confirmation */}
      <DeleteJobDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        jobTitle={deleteJob?.title || ""}
      />
    </CompanyLayout>
  );
}
