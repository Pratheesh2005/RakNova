import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface Experience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export function ExperienceForm() {
  const [experiences, setExperiences] = useState<Experience[]>([
    { id: 1, company: "TechCorp", position: "Senior Frontend Developer", startDate: "2022-06", endDate: "", current: true, description: "Leading frontend team, building React applications." },
    { id: 2, company: "WebSoft Solutions", position: "Frontend Developer", startDate: "2020-01", endDate: "2022-05", current: false, description: "Developed responsive web apps using React and TypeScript." },
  ]);

  const addExperience = () => {
    setExperiences([...experiences, { id: Date.now(), company: "", position: "", startDate: "", endDate: "", current: false, description: "" }]);
  };

  const removeExperience = (id: number) => {
    setExperiences(experiences.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
        <Button variant="outline" size="sm" onClick={addExperience}>+ Add Experience</Button>
      </div>

      {experiences.map((exp, idx) => (
        <div key={exp.id} className="p-5 border border-gray-200 rounded-xl space-y-4 relative">
          {experiences.length > 1 && (
            <button onClick={() => removeExperience(exp.id)} className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          )}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input type="text" value={exp.company} onChange={(e) => { const updated = [...experiences]; updated[idx].company = e.target.value; setExperiences(updated); }} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <input type="text" value={exp.position} onChange={(e) => { const updated = [...experiences]; updated[idx].position = e.target.value; setExperiences(updated); }} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input type="month" value={exp.startDate} onChange={(e) => { const updated = [...experiences]; updated[idx].startDate = e.target.value; setExperiences(updated); }} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input type="month" value={exp.endDate} disabled={exp.current} onChange={(e) => { const updated = [...experiences]; updated[idx].endDate = e.target.value; setExperiences(updated); }} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:bg-gray-100" />
            </div>
          </div>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={exp.current} onChange={(e) => { const updated = [...experiences]; updated[idx].current = e.target.checked; setExperiences(updated); }} className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
            <span className="text-sm text-gray-600">I currently work here</span>
          </label>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea rows={3} value={exp.description} onChange={(e) => { const updated = [...experiences]; updated[idx].description = e.target.value; setExperiences(updated); }} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>
        </div>
      ))}
    </div>
  );
}
