import { RecruiterLayout } from "@/components/recruiter/layout/RecruiterLayout";
import { AssignedJobsTable } from "@/components/recruiter/dashboard/AssignedJobsTable";
import { Button } from "@/components/ui/Button";

export default function RecruiterJobsPage() {
  return (
    <RecruiterLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Assigned Jobs</h1>
            <p className="text-sm text-gray-500 mt-1">
              View and manage the job requisitions assigned to you.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="md">Filter Jobs</Button>
            <Button variant="primary" size="md">View Candidates</Button>
          </div>
        </div>

        <AssignedJobsTable />
      </div>
    </RecruiterLayout>
  );
}
