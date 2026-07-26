import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface Language {
  id: number;
  name: string;
  read: boolean;
  write: boolean;
  speak: boolean;
}

const languageOptions = ["English", "Hindi", "Tamil", "Telugu", "Marathi", "Bengali", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Spanish", "French", "German", "Japanese", "Chinese"];

export function LanguagesForm() {
  const [languages, setLanguages] = useState<Language[]>([
    { id: 1, name: "English", read: true, write: true, speak: true },
    { id: 2, name: "Hindi", read: true, write: true, speak: true },
    { id: 3, name: "Tamil", read: true, write: false, speak: true },
  ]);
  const [adding, setAdding] = useState(false);
  const [newLang, setNewLang] = useState("");
  const [saving, setSaving] = useState(false);

  const addLanguage = () => {
    if (newLang.trim() && !languages.find((l) => l.name === newLang.trim())) {
      setLanguages([...languages, { id: Date.now(), name: newLang.trim(), read: false, write: false, speak: false }]);
      setNewLang("");
      setAdding(false);
    }
  };

  const removeLanguage = (id: number) => {
    setLanguages(languages.filter((l) => l.id !== id));
  };

  const toggle = (id: number, field: "read" | "write" | "speak") => {
    setLanguages(languages.map((l) => (l.id === id ? { ...l, [field]: !l[field] } : l)));
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Languages</h3>
        <Button variant="primary" size="sm" onClick={handleSave} loading={saving}>Save</Button>
      </div>

      <div className="space-y-3">
        {languages.map((lang) => (
          <div key={lang.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border border-gray-200 rounded-xl">
            <div className="flex-1">
              <span className="font-medium text-gray-900">{lang.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" checked={lang.read} onChange={() => toggle(lang.id, "read")} className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                <span className="text-sm text-gray-600">Read</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" checked={lang.write} onChange={() => toggle(lang.id, "write")} className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                <span className="text-sm text-gray-600">Write</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" checked={lang.speak} onChange={() => toggle(lang.id, "speak")} className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                <span className="text-sm text-gray-600">Speak</span>
              </label>
              <button onClick={() => removeLanguage(lang.id)} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {adding ? (
        <div className="flex gap-2">
          <select value={newLang} onChange={(e) => setNewLang(e.target.value)} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500">
            <option value="">Select a language...</option>
            {languageOptions.filter((l) => !languages.find((lang) => lang.name === l)).map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <Button variant="primary" size="sm" onClick={addLanguage}>Add</Button>
          <Button variant="ghost" size="sm" onClick={() => setAdding(false)}>Cancel</Button>
        </div>
      ) : (
        <Button variant="outline" size="sm" onClick={() => setAdding(true)}>+ Add Language</Button>
      )}
    </div>
  );
}
