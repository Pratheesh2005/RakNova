import { useState } from "react";
import { cn } from "@/utils/cn";

const themes = [
  { id: "light", label: "Light Mode", icon: "☀️" },
  { id: "dark", label: "Dark Mode", icon: "🌙" },
  { id: "system", label: "System Default", icon: "💻" },
];

export function AppearanceSettings() {
  const [theme, setTheme] = useState("light");

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h3>
      <div className="grid grid-cols-3 gap-3">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all",
              theme === t.id
                ? "border-brand-500 bg-brand-50 text-brand-700"
                : "border-gray-200 text-gray-600 hover:border-gray-300"
            )}
          >
            <span className="text-2xl">{t.icon}</span>
            <span className="text-sm font-medium">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
