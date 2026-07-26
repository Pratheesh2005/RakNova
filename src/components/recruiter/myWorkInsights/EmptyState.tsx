import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function EmptyState() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
      <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-5">
        <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900">No Activity Available</h3>
      <p className="text-sm text-gray-500 mt-2">Start reviewing assigned candidates to see your work insights.</p>
      <Link href="/recruiter/candidates">
        <Button variant="primary" size="md" className="mt-5">Review Assigned Candidates</Button>
      </Link>
    </div>
  );
}
