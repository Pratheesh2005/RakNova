import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Job } from "@/data/company/jobs";

interface JobDetailPanelProps {
  job: Job | null;
  onClose: () => void;
}

export function JobDetailPanel({ job, onClose }: JobDetailPanelProps) {
  if (!job) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex justify-end"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/30" />
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg bg-white h-full overflow-y-auto shadow-2xl"
        >
          <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between z-10">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
              <p className="text-sm text-gray-500">{job.department} — {job.location}</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Applications", value: job.applications },
                { label: "Shortlisted", value: Math.round(job.applications * 0.2) },
                { label: "Interviews", value: Math.round(job.applications * 0.1) },
                { label: "Offers", value: Math.round(job.applications * 0.05) },
                { label: "AI Match Avg", value: `${Math.round(job.aiQualified / Math.max(job.applications, 1) * 100)}%` },
                { label: "Hiring Manager", value: job.hiringManager },
                { label: "Posted Date", value: job.postedDate },
                { label: "Closing Date", value: job.closingDate || "—" },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Hiring Funnel Progress */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Hiring Funnel</h3>
              <div className="space-y-2">
                {[
                  { label: "Applied", value: job.applications, total: job.applications },
                  { label: "Screened", value: Math.round(job.applications * 0.7), total: job.applications },
                  { label: "Interviewed", value: Math.round(job.applications * 0.3), total: job.applications },
                  { label: "Offered", value: Math.round(job.applications * 0.1), total: job.applications },
                ].map((stage) => (
                  <div key={stage.label} className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 w-20">{stage.label}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(stage.value / Math.max(stage.total, 1)) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-8 text-right">{stage.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t border-gray-100">
              <Button variant="primary" size="sm">View Candidates</Button>
              <Button variant="outline" size="sm">Edit Job</Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
