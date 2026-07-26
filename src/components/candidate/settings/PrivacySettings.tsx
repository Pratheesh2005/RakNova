import { useState } from "react";

export function PrivacySettings() {
  const [prefs, setPrefs] = useState({
    profileVisibility: true,
    resumeVisibility: true,
    recruiterContact: true,
  });

  const toggle = (key: keyof typeof prefs) => {
    setPrefs({ ...prefs, [key]: !prefs[key] });
  };

  const items = [
    { key: "profileVisibility" as const, label: "Profile Visibility", desc: "Allow recruiters to find your profile" },
    { key: "resumeVisibility" as const, label: "Resume Visibility", desc: "Make your resume visible to companies" },
    { key: "recruiterContact" as const, label: "Allow Recruiters to Contact Me", desc: "Receive messages from recruiters" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.key} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">{item.label}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
            <button
              onClick={() => toggle(item.key)}
              className={`relative w-10 h-6 rounded-full transition-colors ${prefs[item.key] ? "bg-brand-600" : "bg-gray-300"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${prefs[item.key] ? "translate-x-4" : ""}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
