import { Button } from "@/components/ui/Button";

export function CandidateManagementHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Candidate Management</h1>
        <p className="text-sm text-gray-500 mt-1">
          Review, evaluate and manage every candidate applying to your company.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="md">Export Candidates</Button>
        <Button variant="primary" size="md">Bulk Actions</Button>
      </div>
    </div>
  );
}
