import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const suggestedSkills = [
  "React", "TypeScript", "Next.js", "Node.js", "Tailwind CSS", "JavaScript",
  "Redux", "GraphQL", "REST APIs", "Jest", "Git", "Docker", "AWS", "MongoDB",
  "PostgreSQL", "Python", "Java", "SQL", "Machine Learning", "Deep Learning",
  "FastAPI", "Django", "Flask", "Kubernetes", "CI/CD", "Figma",
];

export function SkillsForm() {
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript", "Next.js", "Tailwind CSS", "JavaScript", "Git", "Node.js", "REST APIs"]);
  const [input, setInput] = useState("");
  const [editSkill, setEditSkill] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [saving, setSaving] = useState(false);

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
    }
    setInput("");
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const startEdit = (skill: string) => {
    setEditSkill(skill);
    setEditValue(skill);
  };

  const saveEdit = () => {
    if (editSkill && editValue.trim() && editValue.trim() !== editSkill) {
      setSkills(skills.map((s) => (s === editSkill ? editValue.trim() : s)));
    }
    setEditSkill(null);
    setEditValue("");
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
        <Button variant="primary" size="sm" onClick={handleSave} loading={saving}>Save</Button>
      </div>

      {/* Skill Chips */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div key={skill} className="group relative">
            {editSkill === skill ? (
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                  className="w-32 px-3 py-1.5 text-sm border border-brand-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500"
                  autoFocus
                />
                <button onClick={saveEdit} className="p-1 text-green-600 hover:bg-green-50 rounded-full">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </button>
              </div>
            ) : (
              <Badge variant="default" size="md" className="pr-1 cursor-pointer group">
                <span onClick={() => startEdit(skill)}>{skill}</span>
                <button onClick={() => removeSkill(skill)} className="ml-1.5 p-0.5 rounded-full hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </Badge>
            )}
          </div>
        ))}
      </div>

      {/* Add Skill Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill(input))}
          placeholder="Type a skill and press Enter"
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <Button variant="primary" size="sm" onClick={() => addSkill(input)}>Add</Button>
      </div>

      {/* Suggested Skills */}
      <div>
        <p className="text-sm text-gray-500 mb-2">Suggested skills:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedSkills.filter((s) => !skills.includes(s)).slice(0, 12).map((skill) => (
            <button
              key={skill}
              onClick={() => addSkill(skill)}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-full hover:border-brand-300 hover:bg-brand-50 transition-colors text-gray-600"
            >
              + {skill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
