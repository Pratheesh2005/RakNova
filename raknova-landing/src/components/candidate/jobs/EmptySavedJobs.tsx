import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function EmptySavedJobs() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
      <div className="w-24 h-24 mx-auto bg-gray-100 rounded-3xl flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900">No saved jobs yet</h3>
      <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
        Save interesting jobs while browsing to access them quickly later. Your bookmarked opportunities will appear here.
      </p>
      <Link href="/candidate/job-search">
        <Button variant="primary" size="lg" className="mt-6">
          Browse Jobs
        </Button>
      </Link>
    </div>
  );
}
