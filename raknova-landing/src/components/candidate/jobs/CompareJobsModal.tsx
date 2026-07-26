import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { SavedJob, formatSalaryINR } from "@/data/candidate/savedJobs";
import { cn } from "@/utils/cn";

interface CompareJobsModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobs: SavedJob[];
}

export function CompareJobsModal({ isOpen, onClose, jobs }: CompareJobsModalProps) {
  if (jobs.length < 2) return null;

  const rows = [
    { label: "Salary", getValue: (j: SavedJob) => formatSalaryINR(j.salaryMin, j.salaryMax) },
    { label: "Location", getValue: (j: SavedJob) => j.location },
    { label: "Experience", getValue: (j: SavedJob) => j.experience },
    { label: "Work Mode", getValue: (j: SavedJob) => j.workType },
    { label: "AI Match", getValue: (j: SavedJob) => `${j.matchPercentage}%` },
    { label: "Company Rating", getValue: (j: SavedJob) => `⭐ ${j.companyRating}` },
    { label: "Hiring Speed", getValue: (j: SavedJob) => j.hiringSpeed },
    { label: "Benefits", getValue: (j: SavedJob) => j.benefits.slice(0, 2).join(", ") },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Compare Jobs" size="lg">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-gray-500 font-medium">Criteria</th>
              {jobs.map((job) => (
                <th key={job.id} className="text-left py-3 px-4 font-semibold text-gray-900">
                  <p>{job.position}</p>
                  <p className="text-xs text-gray-500 font-normal">{job.company}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={row.label} className={cn("border-b border-gray-100", idx % 2 === 0 && "bg-gray-50/50")}>
                <td className="py-3 px-4 text-gray-600 font-medium">{row.label}</td>
                {jobs.map((job) => (
                  <td key={job.id} className="py-3 px-4 text-gray-900">{row.getValue(job)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <Button variant="outline" size="sm" onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
}
