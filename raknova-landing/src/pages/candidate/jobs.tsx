import { useState } from "react";
import { CandidateLayout } from "@/components/candidate/layout/CandidateLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JobCard } from "@/components/candidate/jobs/JobCard";
import { JobDetailDrawer } from "@/components/candidate/jobs/JobDetailDrawer";
import { recommendedJobs, Job } from "@/data/candidate/jobs";
import { motion } from "framer-motion";

export default function JobRecommendationsPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setDrawerOpen(true);
  };

  return (
    <CandidateLayout>
      <Breadcrumb items={[{ label: "Jobs" }, { label: "Recommendations" }]} className="mb-4" />

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">AI-Powered Job Recommendations</h2>
        <p className="text-sm text-gray-500 mt-1">Jobs matched to your skills and experience</p>
      </div>

      <div className="space-y-4">
        {(recommendedJobs || []).map((job, idx) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <JobCard job={job} onViewDetails={handleViewDetails} />
          </motion.div>
        ))}
      </div>

      <JobDetailDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} job={selectedJob} />
    </CandidateLayout>
  );
}
