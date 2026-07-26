import { Button } from "@/components/ui/Button";

export function AIMatchingHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Candidate Matching</h1>
        <p className="text-sm text-gray-500 mt-1">
          Discover the strongest candidates for every open position using RakNova AI.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="md">Adjust Matching Criteria</Button>
        <Button variant="primary" size="md">Refresh Recommendations</Button>
      </div>
    </div>
  );
}
