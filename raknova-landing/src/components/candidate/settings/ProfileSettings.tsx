import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function ProfileSettings() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Edit Profile</p>
            <p className="text-xs text-gray-500">Update your personal and professional information</p>
          </div>
          <Link href="/candidate/profile">
            <Button variant="outline" size="sm">Edit</Button>
          </Link>
        </div>
        <hr className="border-gray-100" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Profile Photo</p>
            <p className="text-xs text-gray-500">Change your profile picture</p>
          </div>
          <label className="cursor-pointer">
            <Button variant="outline" size="sm" type="button" onClick={() => document.getElementById("photo-input")?.click()}>
              Change
            </Button>
            <input id="photo-input" type="file" accept="image/*" className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
}
