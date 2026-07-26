import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function EmptyFeedbackState() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
      <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-5">
        <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900">No Interview Selected</h3>
      <p className="text-sm text-gray-500 mt-2">Select an interview to submit feedback.</p>
      <Link href="/recruiter/interviews">
        <Button variant="primary" size="md" className="mt-5">Go to Interview Schedule</Button>
      </Link>
    </div>
  );
}
