import { Button } from "@/components/ui/Button";
import { recruiterInfo } from "@/data/recruiter/dashboard";

export function RecruiterHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-lg font-bold text-blue-700">
            {recruiterInfo.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {recruiterInfo.greeting}, {recruiterInfo.name}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              You have {recruiterInfo.tasksCount} recruitment tasks waiting today.
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="md">View My Schedule</Button>
        <Button variant="primary" size="md">Start Working</Button>
      </div>
    </div>
  );
}
