import { Button } from "@/components/ui/Button";

interface CommunicationHeaderProps {
  onNewCommunication: () => void;
}

export function CommunicationHeader({ onNewCommunication }: CommunicationHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Candidate Communication</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track and manage communication with assigned candidates.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="md">Communication Templates</Button>
        <Button variant="primary" size="md" onClick={onNewCommunication}>New Communication</Button>
      </div>
    </div>
  );
}
