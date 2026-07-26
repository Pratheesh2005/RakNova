import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";

export function ProfileProgress() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900">Profile Completion</h3>
      <ProgressBar value={65} size="md" className="mt-4" />
      <p className="mt-2 text-sm text-gray-500">Complete your profile to increase visibility by 3x</p>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">✅ Personal Information</span>
          <span className="text-green-600 font-medium">Complete</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">✅ Education</span>
          <span className="text-green-600 font-medium">Complete</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">⚪ Work Experience</span>
          <span className="text-yellow-600 font-medium">Pending</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">⚪ Skills</span>
          <span className="text-yellow-600 font-medium">Pending</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">🔴 Resume Upload</span>
          <span className="text-red-600 font-medium">Missing</span>
        </div>
      </div>
      <Button variant="primary" size="sm" href="/candidate/profile" className="mt-4 w-full">
        Complete Profile
      </Button>
    </div>
  );
}
