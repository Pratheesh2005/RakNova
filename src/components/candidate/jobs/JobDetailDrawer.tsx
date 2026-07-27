import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MatchBadge } from "./MatchBadge";
import { formatSalary } from "@/utils/formatDate";
import { SimilarJobs } from "./SimilarJobs";
import { Job } from "@/data/candidate/jobs";

interface JobDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
}

export function JobDetailDrawer({ isOpen, onClose, job }: JobDetailDrawerProps) {
  if (!job) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex justify-end"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-white h-full overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 z-10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-brand-100 to-brand-200 rounded-2xl flex items-center justify-center text-xl font-bold text-brand-700">
                    {job.company.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{job.position}</h2>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <MatchBadge percentage={job.matchPercentage} />
                <Badge variant="info">{job.workType}</Badge>
                <Badge variant="default">{job.jobType}</Badge>
                <Badge variant="default">{job.experience}</Badge>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-semibold text-gray-900">{job.location}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">Salary</p>
                  <p className="font-semibold text-gray-900">{formatSalary(job.salaryMin, job.salaryMax, "INR")}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">Open Positions</p>
                  <p className="font-semibold text-gray-900">{job.openPositions}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">Company Size</p>
                  <p className="font-semibold text-gray-900">{job.companySize}</p>
                </div>
              </div>

              {/* AI Match Section */}
              <div className="p-5 bg-gradient-to-r from-brand-50 to-purple-50 rounded-2xl border border-brand-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">🤖 AI Match Analysis</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-gray-500">AI Match</p>
                    <p className="text-2xl font-bold text-brand-600">{job.matchPercentage}%</p>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-gray-500">Skills Match</p>
                    <p className="text-lg font-bold text-green-600">High</p>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-gray-500">Resume Compatibility</p>
                    <p className="text-lg font-bold text-green-600">Excellent</p>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-gray-500">Missing Skills</p>
                    <p className="text-sm font-medium text-yellow-600">Docker, Kubernetes</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
                <p className="text-gray-700 leading-relaxed">{job.description}</p>
              </div>

              {/* Responsibilities */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Responsibilities</h3>
                <ul className="space-y-2">
                  {job.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Required Skills */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkills.map((skill) => (
                    <Badge key={skill} variant="default" size="md">{skill}</Badge>
                  ))}
                </div>
              </div>

              {/* Preferred Skills */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Preferred Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.preferredSkills.map((skill) => (
                    <Badge key={skill} variant="info" size="md">{skill}</Badge>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h3>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                      <span className="text-lg">🎁</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hiring Process */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Hiring Process</h3>
                <div className="flex flex-wrap items-center gap-2">
                  {job.hiringProcess.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="px-3 py-2 bg-brand-50 text-brand-700 rounded-lg text-sm font-medium">{step}</div>
                      {idx < job.hiringProcess.length - 1 && (
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Company Overview */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About {job.company}</h3>
                <p className="text-gray-700 leading-relaxed">{job.companyOverview}</p>
              </div>

              {/* Similar Jobs */}
              <SimilarJobs currentJobId={job.id} />

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={() => {
                    import("@/data/centralStore").then(({ centralStore }) => {
                      centralStore.applyForJob({
                        candidateId: "can-401",
                        candidateName: "Rohan Nair",
                        candidateEmail: "rohan.nair@example.com",
                        candidatePhone: "+91 98765 43210",
                        jobId: String(job.id),
                        jobTitle: job.position,
                        companyId: "cmp-201",
                        companyName: job.company,
                        resumeFileName: "Rohan_Nair_FullStack_Resume.pdf",
                        aiMatchScore: job.matchPercentage,
                      });
                      alert(`Successfully applied for ${job.position} at ${job.company}!`);
                      onClose();
                    });
                  }}
                >
                  Apply Now
                </Button>
                <Button variant="outline" size="lg" onClick={() => alert("Job saved to your bookmarks.")}>
                  Save Job
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
