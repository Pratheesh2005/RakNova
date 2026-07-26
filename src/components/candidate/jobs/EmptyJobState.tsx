import { Button } from "@/components/ui/Button";

interface EmptyJobStateProps {
  onClearFilters: () => void;
}

export function EmptyJobState({ onClearFilters }: EmptyJobStateProps) {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-5">
        <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900">No jobs found</h3>
      <p className="text-sm text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
      <Button variant="outline" size="sm" className="mt-4" onClick={onClearFilters}>
        Clear All Filters
      </Button>
    </div>
  );
}
