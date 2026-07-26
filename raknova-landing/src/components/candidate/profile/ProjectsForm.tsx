import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string;
  githubLink: string;
  liveDemo: string;
  duration: string;
}

export function ProjectsForm() {
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, title: "E-Commerce Platform", description: "Built a full-stack e-commerce platform with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.", technologies: "React, Node.js, MongoDB, Stripe", githubLink: "https://github.com/johndoe/ecommerce", liveDemo: "https://ecommerce-demo.vercel.app", duration: "3 months" },
    { id: 2, title: "AI Resume Analyzer", description: "Developed an AI-powered resume analysis tool that extracts skills, experience, and education from resumes using NLP techniques.", technologies: "Python, FastAPI, spaCy, React", githubLink: "https://github.com/johndoe/resume-analyzer", liveDemo: "", duration: "2 months" },
  ]);
  const [saving, setSaving] = useState(false);

  const addProject = () => {
    setProjects([...projects, { id: Date.now(), title: "", description: "", technologies: "", githubLink: "", liveDemo: "", duration: "" }]);
  };

  const removeProject = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const updateProject = (idx: number, field: keyof Omit<Project, "id">, value: string) => {
    const updated = [...projects];
    updated[idx][field] = value;
    setProjects(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={addProject}>+ Add Project</Button>
          <Button variant="primary" size="sm" onClick={handleSave} loading={saving}>Save</Button>
        </div>
      </div>

      {projects.map((project, idx) => (
        <div key={project.id} className="p-5 border border-gray-200 rounded-xl space-y-4 relative">
          {projects.length > 1 && (
            <button onClick={() => removeProject(project.id)} className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          )}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Title *</label>
              <input type="text" value={project.title} onChange={(e) => updateProject(idx, "title", e.target.value)} placeholder="e.g. E-Commerce Platform" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea rows={3} value={project.description} onChange={(e) => updateProject(idx, "description", e.target.value)} placeholder="Describe your project, your role, and key achievements..." className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Technologies Used</label>
              <input type="text" value={project.technologies} onChange={(e) => updateProject(idx, "technologies", e.target.value)} placeholder="e.g. React, Node.js, MongoDB, Stripe" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Link</label>
              <input type="url" value={project.githubLink} onChange={(e) => updateProject(idx, "githubLink", e.target.value)} placeholder="https://github.com/..." className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Live Demo Link</label>
              <input type="url" value={project.liveDemo} onChange={(e) => updateProject(idx, "liveDemo", e.target.value)} placeholder="https://..." className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input type="text" value={project.duration} onChange={(e) => updateProject(idx, "duration", e.target.value)} placeholder="e.g. 3 months" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
