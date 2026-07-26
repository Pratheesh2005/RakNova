import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";

export function ProfileHeader() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Profile Photo */}
        <div className="relative">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-3xl md:text-4xl font-bold text-white shadow-lg">
            JD
          </div>
          <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-lg shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">John Doe</h1>
            <Badge variant="info" size="md">Fresher</Badge>
          </div>
          <p className="text-lg text-gray-600 mt-1">Senior Frontend Developer</p>
          <div className="flex flex-wrap items-center gap-4 mt-3">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Mumbai, India
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              john.doe@example.com
            </div>
          </div>

          {/* AI Profile Completion */}
          <div className="mt-4 max-w-md">
            <ProgressBar value={65} size="sm" label="Profile Completion" color="brand" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 flex-shrink-0">
          <Button variant="outline" size="sm">Preview</Button>
          <Button variant="primary" size="sm">Edit Profile</Button>
        </div>
      </div>
    </div>
  );
}
