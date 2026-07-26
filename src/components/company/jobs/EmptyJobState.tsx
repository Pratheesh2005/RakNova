import { Button } from "@/components/ui/Button";

interface EmptyJobStateProps {
  onCreateJob: () => void;
}

export function EmptyJobState({ onCreateJob }: EmptyJobStateProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
      <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-5">
        <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900">No Jobs Created</h3>
      <p className="text-sm text-gray-500 mt-2">Create your first hiring campaign to start receiving applications.</p>
      <Button variant="primary" size="md" className="mt-5" onClick={onCreateJob}>
        Create Job
      </Button>
    </div>
  );
}
