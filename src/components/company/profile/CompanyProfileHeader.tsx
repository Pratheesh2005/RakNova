import { Button } from "@/components/ui/Button";

export function CompanyProfileHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your company's information, branding and hiring profile.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="md">Preview Public Profile</Button>
        <Button variant="primary" size="md">Edit Company Profile</Button>
      </div>
    </div>
  );
}
