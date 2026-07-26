import { allJobs } from "@/data/candidate/jobs";
import { Button } from "@/components/ui/Button";

interface SimilarJobsProps {
  currentJobId: number;
}

export function SimilarJobs({ currentJobId }: SimilarJobsProps) {
  const similar = allJobs.filter((j) => j.id !== currentJobId).slice(0, 3);

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Similar Jobs</h3>
      <div className="space-y-3">
        {similar.map((job) => (
          <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-sm font-bold text-gray-500 shadow-sm">
                {job.company.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{job.position}</p>
                <p className="text-xs text-gray-500">{job.company} • {job.location}</p>
              </div>
            </div>
            <Button variant="outline" size="sm">View</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
