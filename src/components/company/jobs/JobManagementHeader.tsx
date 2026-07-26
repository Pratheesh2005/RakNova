import { Button } from "@/components/ui/Button";

interface JobManagementHeaderProps {
  onCreateJob: () => void;
}

export function JobManagementHeader({ onCreateJob }: JobManagementHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Job Management</h1>
        <p className="text-sm text-gray-500 mt-1">
          Create, organize and manage every hiring campaign from one place.
        </p>
      </div>
      <Button variant="primary" size="md" onClick={onCreateJob}>
        <svg className="w-5 h-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Create New Job
      </Button>
    </div>
  );
}
