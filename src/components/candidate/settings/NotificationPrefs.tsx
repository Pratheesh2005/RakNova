import { useState } from "react";

export function NotificationPrefs() {
  const [prefs, setPrefs] = useState({
    emailJobMatches: true,
    emailInterviews: true,
    emailStatusUpdates: true,
    pushJobMatches: true,
    pushInterviews: true,
    pushStatusUpdates: false,
    marketing: false,
  });

  const toggle = (key: keyof typeof prefs) => {
    setPrefs({ ...prefs, [key]: !prefs[key] });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Email Notifications</p>
          {[
            { key: "emailJobMatches" as const, label: "New job matches" },
            { key: "emailInterviews" as const, label: "Interview invitations & reminders" },
            { key: "emailStatusUpdates" as const, label: "Application status updates" },
          ].map((item) => (
            <label key={item.key} className="flex items-center justify-between py-2 cursor-pointer">
              <span className="text-sm text-gray-600">{item.label}</span>
              <button
                onClick={() => toggle(item.key)}
                className={`relative w-10 h-6 rounded-full transition-colors ${prefs[item.key] ? "bg-brand-600" : "bg-gray-300"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${prefs[item.key] ? "translate-x-4" : ""}`} />
              </button>
            </label>
          ))}
        </div>

        <hr className="border-gray-100" />

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Push Notifications</p>
          {[
            { key: "pushJobMatches" as const, label: "New job matches" },
            { key: "pushInterviews" as const, label: "Interview reminders" },
            { key: "pushStatusUpdates" as const, label: "Application updates" },
          ].map((item) => (
            <label key={item.key} className="flex items-center justify-between py-2 cursor-pointer">
              <span className="text-sm text-gray-600">{item.label}</span>
              <button
                onClick={() => toggle(item.key)}
                className={`relative w-10 h-6 rounded-full transition-colors ${prefs[item.key] ? "bg-brand-600" : "bg-gray-300"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${prefs[item.key] ? "translate-x-4" : ""}`} />
              </button>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
