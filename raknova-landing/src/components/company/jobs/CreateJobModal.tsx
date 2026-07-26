import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job?: any; // For edit, can pre-fill
}

const steps = [
  { id: 1, label: "Basic Info" },
  { id: 2, label: "Description" },
  { id: 3, label: "Skills" },
  { id: 4, label: "Hiring Details" },
];

export function CreateJobModal({ isOpen, onClose, job }: CreateJobModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    title: job?.title || "",
    department: job?.department || "",
    location: job?.location || "",
    employmentType: job?.employmentType || "Full-time",
    workMode: job?.workMode || "Hybrid",
    salaryMin: job?.salaryMin || "",
    salaryMax: job?.salaryMax || "",
    experience: job?.experience || "",
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
  });

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (publish = false) => {
    console.log("Saving job:", { ...form, status: publish ? "Active" : "Draft" });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={job ? "Edit Job" : "Create New Job"} size="lg">
      {/* Steps indicator */}
      <div className="flex items-center gap-2 mb-6">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-center gap-2 flex-1">
            <button
              onClick={() => setCurrentStep(step.id)}
              className={cn(
                "w-8 h-8 rounded-full text-sm font-semibold flex items-center justify-center transition-all",
                currentStep === step.id ? "bg-blue-600 text-white" : currentStep > step.id ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"
              )}
            >
              {step.id}
            </button>
            <span className="text-xs text-gray-500 hidden sm:block">{step.label}</span>
            {idx < steps.length - 1 && <div className="flex-1 h-px bg-gray-200" />}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input type="text" value={form.title} onChange={(e) => handleChange("title", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select value={form.department} onChange={(e) => handleChange("department", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm">
                <option value="">Select</option>
                <option>Engineering</option><option>AI/ML</option><option>Infrastructure</option><option>Design</option><option>Analytics</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input type="text" value={form.location} onChange={(e) => handleChange("location", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
              <select value={form.employmentType} onChange={(e) => handleChange("employmentType", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm">
                <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Work Mode</label>
              <select value={form.workMode} onChange={(e) => handleChange("workMode", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm">
                <option>Remote</option><option>Hybrid</option><option>On-site</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary Min (₹/year)</label>
              <input type="number" value={form.salaryMin} onChange={(e) => handleChange("salaryMin", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary Max (₹/year)</label>
              <input type="number" value={form.salaryMax} onChange={(e) => handleChange("salaryMax", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
              <select value={form.experience} onChange={(e) => handleChange("experience", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm">
                <option>0-1 years</option><option>1-2 years</option><option>2-4 years</option><option>3-5 years</option><option>5+ years</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Openings</label>
              <input type="number" value={form.openings} onChange={(e) => handleChange("openings", parseInt(e.target.value))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Description */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Responsibilities (one per line)</label>
            <textarea rows={4} value={form.responsibilities} onChange={(e) => handleChange("responsibilities", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (one per line)</label>
            <textarea rows={4} value={form.requirements} onChange={(e) => handleChange("requirements", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Skills (comma separated)</label>
            <input type="text" value={form.preferredSkills} onChange={(e) => handleChange("preferredSkills", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Benefits (one per line)</label>
            <textarea rows={3} value={form.benefits} onChange={(e) => handleChange("benefits", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
      )}

      {/* Step 3: Skills */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills (comma separated)</label>
            <input type="text" value={form.requiredSkills} onChange={(e) => handleChange("requiredSkills", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
            <input type="text" value={form.education} onChange={(e) => handleChange("education", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Languages (comma separated)</label>
            <input type="text" value={form.languages} onChange={(e) => handleChange("languages", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
      )}

      {/* Step 4: Hiring Details */}
      {currentStep === 4 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hiring Manager</label>
              <input type="text" value={form.hiringManager} onChange={(e) => handleChange("hiringManager", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
              <input type="date" value={form.closingDate} onChange={(e) => handleChange("closingDate", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interview Process (one per line)</label>
            <textarea rows={3} value={form.interviewProcess} onChange={(e) => handleChange("interviewProcess", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Visibility</label>
            <select value={form.visibility} onChange={(e) => handleChange("visibility", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm">
              <option>Public</option><option>Internal</option>
            </select>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100">
        <div>
          {currentStep > 1 && (
            <Button variant="outline" size="sm" onClick={() => setCurrentStep(currentStep - 1)}>Previous</Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => handleSave(false)}>Save Draft</Button>
          {currentStep < 4 ? (
            <Button variant="primary" size="sm" onClick={() => setCurrentStep(currentStep + 1)}>Next</Button>
          ) : (
            <Button variant="primary" size="sm" onClick={() => handleSave(true)}>Publish Job</Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
