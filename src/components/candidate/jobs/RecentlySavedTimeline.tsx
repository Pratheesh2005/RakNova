import { savedJobs, getSavedTimeLabel } from "@/data/candidate/savedJobs";

export function RecentlySavedTimeline() {
  // Group jobs by save time label
  const grouped = savedJobs.reduce((acc, job) => {
    const label = getSavedTimeLabel(job.savedDate);
    if (!acc[label]) acc[label] = [];
    acc[label].push(job);
    return acc;
  }, {} as Record<string, typeof savedJobs>);

  const order = ["Saved Today", "Saved Yesterday", "Saved Last Week", "Saved This Month", "Saved Earlier"];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recently Saved</h3>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-5">
          {order.map((label) => {
            const jobsInGroup = grouped[label];
            if (!jobsInGroup || jobsInGroup.length === 0) return null;
            return (
              <div key={label} className="relative pl-8">
                <div className="absolute left-0 top-1 w-5 h-5 bg-brand-100 border-2 border-brand-500 rounded-full" />
                <p className="text-sm font-semibold text-gray-700">{label}</p>
                <div className="mt-1 space-y-1">
                  {jobsInGroup.map((job) => (
                    <p key={job.id} className="text-sm text-gray-500">
                      {job.position} at {job.company}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
