import { useState, useMemo } from "react";
import { CandidateLayout } from "@/components/candidate/layout/CandidateLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ApplicationsHeader } from "@/components/candidate/applications/ApplicationsHeader";
import { AICareerProgress } from "@/components/candidate/applications/AICareerProgress";
import { HiringPipeline } from "@/components/candidate/applications/HiringPipeline";
import { ApplicationCard } from "@/components/candidate/applications/ApplicationCard";
import { EmptyApplications } from "@/components/candidate/applications/EmptyApplications";
import { ApplicationsSkeleton } from "@/components/candidate/applications/ApplicationsSkeleton";
import { SearchInput } from "@/components/ui/SearchInput";
import { applications, Application } from "@/data/candidate/applications";
import { cn } from "@/utils/cn";

const statusFilters = ["All", "Active", "Interview", "Offer", "Rejected"];

export default function ApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading] = useState(false);

  const filteredApplications = useMemo(() => {
    let result = [...applications];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (app) =>
          app.company.toLowerCase().includes(q) ||
          app.position.toLowerCase().includes(q) ||
          app.applicationId.toLowerCase().includes(q) ||
          app.recruiterName.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter === "Active") {
      result = result.filter((app) => app.currentStage !== "Rejected" && app.currentStage !== "Hired");
    } else if (statusFilter === "Interview") {
      result = result.filter((app) =>
        ["Technical Round", "Manager Round", "HR Discussion"].includes(app.currentStage)
      );
    } else if (statusFilter === "Offer") {
      result = result.filter((app) => app.currentStage === "Offer" || app.currentStage === "Hired");
    } else if (statusFilter === "Rejected") {
      result = result.filter((app) => app.currentStage === "Rejected");
    }

    return result;
  }, [searchQuery, statusFilter]);

  const handleViewDetails = (app: Application) => {
    console.log("View details:", app.applicationId);
  };

  if (applications.length === 0) {
    return (
      <CandidateLayout>
        <Breadcrumb items={[{ label: "Applications" }]} className="mb-4" />
        <EmptyApplications />
      </CandidateLayout>
    );
  }

  return (
    <CandidateLayout>
      <Breadcrumb items={[{ label: "Applications" }]} className="mb-4" />

      <div className="space-y-6">
        {/* Hero Header */}
        <ApplicationsHeader />

        {/* AI Career Progress + Hiring Pipeline */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <AICareerProgress />
          </div>
          <div className="lg:col-span-2">
            <HiringPipeline />
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by company, role, recruiter, or application ID..."
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            {statusFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all",
                  statusFilter === filter
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
          <span className="text-sm text-gray-500 whitespace-nowrap">
            {filteredApplications.length} application{filteredApplications.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Application Cards */}
        {loading ? (
          <ApplicationsSkeleton />
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </div>
    </CandidateLayout>
  );
}
