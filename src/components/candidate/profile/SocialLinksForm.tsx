import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function SocialLinksForm() {
  const [links, setLinks] = useState({
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    portfolio: "https://johndoe.dev",
    kaggle: "",
    leetcode: "https://leetcode.com/johndoe",
    hackerrank: "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (field: string, value: string) => {
    setLinks((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
  };

  const socialFields = [
    { key: "linkedin", label: "LinkedIn", icon: "💼", placeholder: "https://linkedin.com/in/..." },
    { key: "github", label: "GitHub", icon: "💻", placeholder: "https://github.com/..." },
    { key: "portfolio", label: "Portfolio", icon: "🌐", placeholder: "https://..." },
    { key: "kaggle", label: "Kaggle", icon: "📊", placeholder: "https://kaggle.com/..." },
    { key: "leetcode", label: "LeetCode", icon: "⚡", placeholder: "https://leetcode.com/..." },
    { key: "hackerrank", label: "HackerRank", icon: "🏆", placeholder: "https://hackerrank.com/..." },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Social Links</h3>
        <Button variant="primary" size="sm" onClick={handleSave} loading={saving}>Save</Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {socialFields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="mr-1">{field.icon}</span> {field.label}
            </label>
            <input
              type="url"
              value={(links as any)[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
