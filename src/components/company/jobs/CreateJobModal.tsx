import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { getApiEndpoint, smartFetch } from "@/utils/apiConfig";

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job?: any;
}

const steps = [
  { id: 1, label: "Basic Info" },
  { id: 2, label: "Description & AI" },
  { id: 3, label: "Skills & Qualifications" },
  { id: 4, label: "Hiring Details" },
];

export function CreateJobModal({ isOpen, onClose, job }: CreateJobModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiGenerated, setAiGenerated] = useState<any | null>(null);

  const [form, setForm] = useState({
    title: job?.title || "",
    department: job?.department || "Engineering",
    location: job?.location || "Bangalore, India",
    employmentType: job?.employmentType || "Full-time",
    workMode: job?.workMode || "Hybrid",
    salaryMin: job?.salaryMin || "",
    salaryMax: job?.salaryMax || "",
    experience: job?.experience || "2-4 years",
    openings: job?.openings || 1,
    responsibilities: job?.responsibilities?.join("\n") || "",
    requirements: job?.requirements?.join("\n") || "",
    preferredSkills: job?.preferredSkills?.join(", ") || "",
    benefits: job?.benefits?.join("\n") || "",
    requiredSkills: job?.requiredSkills?.join(", ") || "",
    education: job?.education || "",
    languages: job?.languages?.join(", ") || "",
    hiringManager: job?.hiringManager || "",
    closingDate: job?.closingDate || "",
    interviewProcess: job?.interviewProcess?.join("\n") || "",
    visibility: job?.visibility || "Public",
    seoDescription: "",
  });

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerateAI = async () => {
    if (!form.title.trim()) {
      alert("Please enter a Job Title first.");
      return;
    }
    setLoadingAI(true);
    try {
      const payload = {
        title: form.title,
        department: form.department,
        experience: form.experience,
        employment_type: form.employmentType,
        work_mode: form.workMode,
        location: form.location,
        salary: form.salaryMin && form.salaryMax ? `₹${form.salaryMin}-${form.salaryMax} LPA` : undefined,
        required_skills: form.requiredSkills ? form.requiredSkills.split(",").map((s: string) => s.trim()) : [],
        preferred_skills: form.preferredSkills ? form.preferredSkills.split(",").map((s: string) => s.trim()) : [],
      };

      const res = await smartFetch("/company/ai/job-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success && json.data) {
        const d = json.data;
        setAiGenerated(d);
        setForm((prev) => ({
          ...prev,
          title: d.job_title || prev.title,
          responsibilities: d.key_responsibilities?.join("\n") || prev.responsibilities,
          requirements: d.qualifications?.join("\n") || prev.requirements,
          requiredSkills: d.required_skills?.join(", ") || prev.requiredSkills,
          preferredSkills: d.preferred_skills?.join(", ") || prev.preferredSkills,
          benefits: d.benefits?.join("\n") || prev.benefits,
          seoDescription: d.seo_job_description || "",
        }));
        setCurrentStep(2);
      } else {
        alert(json.error?.message || json.detail || "AI generation failed.");
      }
    } catch {
      alert("Could not connect to RakNova AI service.");
    } finally {
      setLoadingAI(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleSave = (publish = false) => {
    console.log("Saving job:", { ...form, status: publish ? "Active" : "Draft" });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={job ? "Edit Job Posting" : "Create Job Posting"} size="lg">
      {/* Top Banner with AI Action */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 rounded-2xl mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400">HR AI Copilot</span>
          <h4 className="text-sm font-bold text-white">Generate Job Description with AI</h4>
        </div>
        <Button variant="primary" size="sm" loading={loadingAI} onClick={handleGenerateAI} className="bg-indigo-600 hover:bg-indigo-700 text-white shrink-0 font-bold">
          ✨ {loadingAI ? "Generating with AI..." : "Generate with AI"}
        </Button>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center gap-2 mb-6">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-center gap-2 flex-1">
            <button
              onClick={() => setCurrentStep(step.id)}
              className={cn(
                "w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all",
                currentStep === step.id ? "bg-indigo-600 text-white shadow-xs" : currentStep > step.id ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-500"
              )}
            >
              {step.id}
            </button>
            <span className="text-xs text-slate-600 font-semibold hidden sm:block">{step.label}</span>
            {idx < steps.length - 1 && <div className="flex-1 h-px bg-slate-200" />}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {currentStep === 1 && (
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Job Title *</label>
              <input type="text" value={form.title} onChange={(e) => handleChange("title", e.target.value)} placeholder="e.g. Senior Full-Stack Engineer" className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium text-xs" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Department</label>
              <select value={form.department} onChange={(e) => handleChange("department", e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium text-xs">
                <option>Engineering</option><option>AI/ML</option><option>Infrastructure</option><option>Design</option><option>Analytics</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Location</label>
              <input type="text" value={form.location} onChange={(e) => handleChange("location", e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium text-xs" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Employment Type</label>
              <select value={form.employmentType} onChange={(e) => handleChange("employmentType", e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium text-xs">
                <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Work Mode</label>
              <select value={form.workMode} onChange={(e) => handleChange("workMode", e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium text-xs">
                <option>Remote</option><option>Hybrid</option><option>On-site</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Experience Level</label>
              <select value={form.experience} onChange={(e) => handleChange("experience", e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium text-xs">
                <option>0-1 years</option><option>1-2 years</option><option>2-4 years</option><option>5+ years</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Required Skills (Comma separated)</label>
              <input type="text" value={form.requiredSkills} onChange={(e) => handleChange("requiredSkills", e.target.value)} placeholder="Python, React, PostgreSQL..." className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium text-xs" />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Description & AI */}
      {currentStep === 2 && (
        <div className="space-y-4 text-xs">
          {aiGenerated && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl font-medium flex items-center justify-between">
              <span>✨ AI Job Description generated successfully! You can review and edit below.</span>
              <button onClick={() => copyToClipboard(form.seoDescription || form.responsibilities)} className="text-emerald-700 font-bold underline ml-2">
                Copy Markdown
              </button>
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1">Key Responsibilities (One per line)</label>
            <textarea rows={5} value={form.responsibilities} onChange={(e) => handleChange("responsibilities", e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-xs leading-relaxed" />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Qualifications & Requirements</label>
            <textarea rows={4} value={form.requirements} onChange={(e) => handleChange("requirements", e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-xs leading-relaxed" />
          </div>
        </div>
      )}

      {/* Step 3: Skills & Benefits */}
      {currentStep === 3 && (
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Preferred Skills</label>
            <input type="text" value={form.preferredSkills} onChange={(e) => handleChange("preferredSkills", e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium text-xs" />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Perks & Benefits (One per line)</label>
            <textarea rows={4} value={form.benefits} onChange={(e) => handleChange("benefits", e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-xs leading-relaxed" />
          </div>
        </div>
      )}

      {/* Step 4: Hiring Details */}
      {currentStep === 4 && (
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Hiring Manager</label>
              <input type="text" value={form.hiringManager} onChange={(e) => handleChange("hiringManager", e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium text-xs" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Posting Visibility</label>
              <select value={form.visibility} onChange={(e) => handleChange("visibility", e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium text-xs">
                <option>Public</option><option>Internal</option><option>Unlisted</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Modal Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6 text-xs">
        <div>
          {currentStep > 1 && (
            <Button variant="outline" size="sm" onClick={() => setCurrentStep(currentStep - 1)}>
              ← Back
            </Button>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleSave(false)}>
            Save Draft
          </Button>

          {currentStep < 4 ? (
            <Button variant="primary" size="sm" onClick={() => setCurrentStep(currentStep + 1)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
              Next →
            </Button>
          ) : (
            <Button variant="primary" size="sm" onClick={() => handleSave(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
              Publish Job
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
