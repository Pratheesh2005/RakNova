import { useState } from "react";
import { RecruiterLayout } from "@/components/recruiter/layout/RecruiterLayout";
import { Button } from "@/components/ui/Button";
import { recruiterSettings } from "@/data/recruiter/settings";
import { cn } from "@/utils/cn";

export default function SettingsPage() {
  const [settings, setSettings] = useState(recruiterSettings);

  const toggleNotification = (key: keyof typeof settings.notifications) => {
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: !prev.notifications[key] },
    }));
  };

  return (
    <RecruiterLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your personal preferences and account settings.</p>
        </div>

        {/* Profile */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile</h2>
          <div className="flex items-center gap-6 mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-xl font-bold text-blue-700">
              {settings.profile.name.charAt(0)}
            </div>
            <Button variant="outline" size="sm">Change Photo</Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
              <input type="text" value={settings.profile.name} readOnly className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
              <input type="email" value={settings.profile.email} readOnly className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Phone Number</label>
              <input type="text" value={settings.profile.phone} readOnly className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Designation</label>
              <input type="text" value={settings.profile.designation} readOnly className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50" />
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Security</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Change Password</span>
              <Button variant="outline" size="sm">Change</Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Two-Factor Authentication</span>
              <span className="text-sm text-gray-500">{settings.security.twoFactorAuth ? "Enabled" : "Disabled"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Active Sessions</span>
              <span className="text-sm font-medium">{settings.security.activeSessions}</span>
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

        {/* Appearance */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h2>
          <div className="flex gap-3">
            {["light", "dark", "system"].map((theme) => (
              <button
                key={theme}
                onClick={() => setSettings((prev) => ({ ...prev, appearance: theme as any }))}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium border transition-all",
                  settings.appearance === theme
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                )}
              >
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </button>
            ))}
          </div>
        </section>

        {/* Language */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Language</h2>
          <select
            value={settings.language}
            onChange={(e) => setSettings((prev) => ({ ...prev, language: e.target.value }))}
            className="w-full max-w-xs px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ta">Tamil</option>
          </select>
        </section>

        {/* Quick Actions */}
        <div className="flex gap-3">
          <Button variant="primary" size="md">Save Changes</Button>
          <Button variant="outline" size="md" className="text-red-600 border-red-300 hover:bg-red-50">Logout</Button>
        </div>
      </div>
    </RecruiterLayout>
  );
}
