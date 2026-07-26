import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function EmptyApplications() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900">No Applications Yet</h3>
      <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
        You haven't applied for any jobs yet. Explore opportunities and let RakNova AI help you land your dream career.
      </p>
      <Link href="/candidate/job-search">
        <Button variant="primary" size="lg" className="mt-6">
          Browse Jobs
        </Button>
      </Link>
    </div>
  );
}
