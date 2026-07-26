import { useState } from "react";
import { CompanyLayout } from "@/components/company/layout/CompanyLayout";
import { Button } from "@/components/ui/Button";
import { companySettings } from "@/data/company/settings";
import { cn } from "@/utils/cn";

export default function SettingsPage() {
  const [settings, setSettings] = useState(companySettings);

  const toggleNotification = (key: keyof typeof settings.notifications) => {
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: !prev.notifications[key] },
    }));
  };

  return (
    <CompanyLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage company preferences, security and recruitment settings.</p>
        </div>

        {/* Organization */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Organization</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Company Name</label>
              <input
                type="text"
                value={settings.organization.name}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
                readOnly
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Default Time Zone</label>
              <input
                type="text"
                value={settings.organization.timezone}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
                readOnly
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Language</label>
              <input
                type="text"
                value={settings.organization.language}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
                readOnly
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Currency</label>
              <input
                type="text"
                value={settings.organization.currency}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
                readOnly
              />
            </div>
          </div>
        </section>

        {/* Recruitment Preferences */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recruitment Preferences</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Default Hiring Workflow</label>
              <input
                type="text"
                value={settings.recruitment.defaultWorkflow}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
                readOnly
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Default Interview Duration</label>
              <input
                type="text"
                value={settings.recruitment.defaultInterviewDuration}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
                readOnly
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Default Offer Validity</label>
              <input
                type="text"
                value={settings.recruitment.defaultOfferValidity}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
                readOnly
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-700">Application Auto Close</span>
              <button
                className={cn(
                  "relative w-10 h-6 rounded-full transition-colors",
                  settings.recruitment.applicationAutoClose ? "bg-blue-600" : "bg-gray-300"
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform",
                    settings.recruitment.applicationAutoClose && "translate-x-4"
                  )}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Notification Preferences */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
          <div className="space-y-3">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                </span>
                <button
                  onClick={() => toggleNotification(key as keyof typeof settings.notifications)}
                  className={cn("relative w-10 h-6 rounded-full transition-colors", value ? "bg-blue-600" : "bg-gray-300")}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform",
                      value && "translate-x-4"
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Security */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Security</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Two-factor Authentication</span>
              <span className="text-sm text-gray-500">{settings.security.twoFactorAuth ? "Enabled" : "Disabled"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Active Sessions</span>
              <span className="text-sm font-medium">{settings.security.activeSessions}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Password Policy</span>
              <span className="text-sm text-gray-500">{settings.security.passwordPolicy}</span>
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Integrations</h2>
          <div className="space-y-3">
            {Object.entries(settings.integrations).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                </span>
                <span className={cn("text-sm font-medium", value ? "text-green-600" : "text-gray-500")}>
                  {value ? "Connected" : "Not Connected"}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Data Management */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm">Export Company Data</Button>
            <Button variant="outline" size="sm">Download Reports</Button>
            <Button variant="outline" size="sm">Backup Settings</Button>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-white rounded-2xl border border-red-100 p-6">
          <h2 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
              Deactivate Company
            </Button>
            <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
              Delete Organization
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-3">These actions are irreversible. Proceed with caution.</p>
        </section>
      </div>
    </CompanyLayout>
  );
}
