import { Button } from "@/components/ui/Button";

export function EmptyInterviewState() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
      <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-5">
        <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900">No Interviews Scheduled</h3>
      <p className="text-sm text-gray-500 mt-2">Schedule your first interview to get started.</p>
      <Button variant="primary" size="md" className="mt-5">Schedule Interview</Button>
    </div>
  );
}
