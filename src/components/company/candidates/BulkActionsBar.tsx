import { Button } from "@/components/ui/Button";

interface BulkActionsBarProps {
  selectedCount: number;
  onClear: () => void;
}

export function BulkActionsBar({ selectedCount, onClear }: BulkActionsBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 lg:left-72 bg-white border-t border-gray-200 shadow-lg p-4 flex items-center justify-between z-30">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">{selectedCount} candidates selected</span>
        <button onClick={onClear} className="text-sm text-blue-600 hover:text-blue-700 font-medium">Clear</button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="primary" size="sm">Shortlist</Button>
        <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">Reject</Button>
        <Button variant="outline" size="sm">Move Stage</Button>
        <Button variant="outline" size="sm">Export</Button>
        <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">Delete</Button>
      </div>
    </div>
  );
}
