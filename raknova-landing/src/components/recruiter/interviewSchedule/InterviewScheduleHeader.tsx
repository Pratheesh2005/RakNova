import { Button } from "@/components/ui/Button";

export function InterviewScheduleHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Interview Schedule</h1>
        <p className="text-sm text-gray-500 mt-1">
          Plan, manage and track your assigned interviews.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="md">View Calendar</Button>
        <Button variant="primary" size="md">Schedule Interview</Button>
      </div>
    </div>
  );
}
