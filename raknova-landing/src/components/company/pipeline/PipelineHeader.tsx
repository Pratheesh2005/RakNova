import { Button } from "@/components/ui/Button";

export function PipelineHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Recruitment Pipeline</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track every candidate from application to hiring.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="md">Pipeline Settings</Button>
        <Button variant="primary" size="md">Add Candidate</Button>
      </div>
    </div>
  );
}
