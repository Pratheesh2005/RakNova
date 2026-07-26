import { Button } from "@/components/ui/Button";

export function EmptyTeamState() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
      <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-5">
        <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900">No Team Members Yet</h3>
      <p className="text-sm text-gray-500 mt-2">Invite your first recruiter to start collaborating.</p>
      <Button variant="primary" size="md" className="mt-5">Invite Team Member</Button>
    </div>
  );
}
