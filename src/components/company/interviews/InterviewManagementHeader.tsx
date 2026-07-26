import { Button } from "@/components/ui/Button";

export function InterviewManagementHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Interview Management</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage interview schedules, interviewers, feedback and hiring decisions.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="md">Interview Calendar</Button>
        <Button variant="primary" size="md">Schedule Interview</Button>
      </div>
    </div>
  );
}
