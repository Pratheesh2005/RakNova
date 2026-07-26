import { Button } from "@/components/ui/Button";

export function AssignedCandidatesHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Assigned Candidates</h1>
        <p className="text-sm text-gray-500 mt-1">
          Review and manage the candidates assigned to you.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="md">Filter Candidates</Button>
        <Button variant="primary" size="md">Review Next Candidate</Button>
      </div>
    </div>
  );
}
