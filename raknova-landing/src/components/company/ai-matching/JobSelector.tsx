import { JobOpening } from "@/data/company/aiMatching";

interface JobSelectorProps {
  jobs: JobOpening[];
  selectedJobId: number;
  onSelect: (jobId: number) => void;
}

export function JobSelector({ jobs, selectedJobId, onSelect }: JobSelectorProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
      <label className="text-sm font-medium text-gray-700">Choose Job Opening:</label>
      <select
        value={selectedJobId}
        onChange={(e) => onSelect(Number(e.target.value))}
        className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 max-w-xs"
      >
        {jobs.map((job) => (
          <option key={job.id} value={job.id}>{job.title} — {job.department}</option>
        ))}
      </select>
    </div>
  );
}
