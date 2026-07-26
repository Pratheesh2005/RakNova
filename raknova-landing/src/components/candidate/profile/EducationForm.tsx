import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface Education {
  id: number;
  degree: string;
  college: string;
  department: string;
  cgpa: string;
  startYear: string;
  endYear: string;
  currentlyStudying: boolean;
}

export function EducationForm() {
  const [educations, setEducations] = useState<Education[]>([
    { id: 1, degree: "Bachelor of Technology", college: "Mumbai University", department: "Computer Science", cgpa: "8.5", startYear: "2018", endYear: "2022", currentlyStudying: false },
  ]);
  const [saving, setSaving] = useState(false);

  const addEducation = () => {
    setEducations([...educations, { id: Date.now(), degree: "", college: "", department: "", cgpa: "", startYear: "", endYear: "", currentlyStudying: false }]);
  };

  const removeEducation = (id: number) => {
    setEducations(educations.filter((e) => e.id !== id));
  };

  const updateEducation = (idx: number, field: keyof Education, value: string | boolean) => {
    const updated = [...educations];
    (updated[idx] as any)[field] = value;
    setEducations(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Education</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={addEducation}>+ Add Education</Button>
          <Button variant="primary" size="sm" onClick={handleSave} loading={saving}>Save</Button>
        </div>
      </div>

      {educations.map((edu, idx) => (
        <div key={edu.id} className="p-5 border border-gray-200 rounded-xl space-y-4 relative">
          {educations.length > 1 && (
            <button onClick={() => removeEducation(edu.id)} className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          )}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Degree *</label>
              <input type="text" value={edu.degree} onChange={(e) => updateEducation(idx, "degree", e.target.value)} placeholder="e.g. Bachelor of Technology" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">College / University *</label>
              <input type="text" value={edu.college} onChange={(e) => updateEducation(idx, "college", e.target.value)} placeholder="e.g. Mumbai University" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department / Branch</label>
              <input type="text" value={edu.department} onChange={(e) => updateEducation(idx, "department", e.target.value)} placeholder="e.g. Computer Science" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CGPA / Percentage</label>
              <input type="text" value={edu.cgpa} onChange={(e) => updateEducation(idx, "cgpa", e.target.value)} placeholder="e.g. 8.5" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Year</label>
              <input type="text" value={edu.startYear} onChange={(e) => updateEducation(idx, "startYear", e.target.value)} placeholder="e.g. 2018" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Year</label>
              <input type="text" value={edu.endYear} onChange={(e) => updateEducation(idx, "endYear", e.target.value)} placeholder="e.g. 2022" disabled={edu.currentlyStudying} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:bg-gray-100" />
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={edu.currentlyStudying} onChange={(e) => updateEducation(idx, "currentlyStudying", e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
            <span className="text-sm text-gray-600">Currently studying here</span>
          </label>
        </div>
      ))}
    </div>
  );
}
