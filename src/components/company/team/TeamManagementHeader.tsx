import { Button } from "@/components/ui/Button";

export function TeamManagementHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage recruiters, hiring managers and recruitment responsibilities.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="md">Manage Roles</Button>
        <Button variant="primary" size="md">Invite Team Member</Button>
      </div>
    </div>
  );
}
