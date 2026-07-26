import { useState } from "react";
import { cn } from "@/utils/cn";
import { validateEmail, validatePhone, validateRequired } from "@/utils/validation";
import { Button } from "@/components/ui/Button";

export function PersonalInfoForm() {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "9876543210",
    countryCode: "+91",
    gender: "Male",
    dob: "2000-05-15",
    nationality: "Indian",
    headline: "Senior Frontend Developer",
    bio: "Experienced frontend developer with 5+ years building scalable web applications.",
    preferredRole: "Frontend Developer",
    preferredIndustry: "Information Technology",
    preferredLocation: "Mumbai, India",
    workMode: "Hybrid",
    employmentType: "Full-time",
    expectedSalary: "1200000",
    noticePeriod: "30 days",
  });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [saving, setSaving] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleSave = async () => {
    const newErrors: Record<string, string | null> = {
      firstName: validateRequired(formData.firstName, "First name"),
      lastName: validateRequired(formData.lastName, "Last name"),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e !== null)) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
  };

  const inputClass = (field: string) =>
    cn(
      "w-full px-4 py-2.5 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all",
      errors[field] ? "border-red-300 bg-red-50" : "border-gray-300"
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
        <Button variant="primary" size="sm" onClick={handleSave} loading={saving}>Save</Button>
      </div>

      {/* Basic Info */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
          <input type="text" value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} className={inputClass("firstName")} />
          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
          <input type="text" value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} className={inputClass("lastName")} />
          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} className={inputClass("email")} />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
          <div className="flex gap-2">
            <select value={formData.countryCode} onChange={(e) => handleChange("countryCode", e.target.value)} className="px-3 py-2.5 border border-gray-300 rounded-lg bg-white w-[100px]">
              <option value="+91">🇮🇳 +91</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
            </select>
            <input type="tel" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} className={cn("flex-1", inputClass("phone"))} />
          </div>
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select value={formData.gender} onChange={(e) => handleChange("gender", e.target.value)} className={inputClass("gender")}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
            <option>Prefer not to say</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <input type="date" value={formData.dob} onChange={(e) => handleChange("dob", e.target.value)} className={inputClass("dob")} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
          <input type="text" value={formData.nationality} onChange={(e) => handleChange("nationality", e.target.value)} className={inputClass("nationality")} />
        </div>
      </div>

      {/* Professional Headline & Bio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Professional Headline</label>
        <input type="text" value={formData.headline} onChange={(e) => handleChange("headline", e.target.value)} placeholder="e.g. Senior Frontend Developer" className={inputClass("headline")} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
        <textarea rows={4} value={formData.bio} onChange={(e) => handleChange("bio", e.target.value)} className={inputClass("bio")} placeholder="Tell employers about yourself..." />
      </div>

      {/* Career Information */}
      <h4 className="text-base font-semibold text-gray-800 pt-2">Career Information</h4>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Job Role</label>
          <input type="text" value={formData.preferredRole} onChange={(e) => handleChange("preferredRole", e.target.value)} className={inputClass("preferredRole")} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Industry</label>
          <select value={formData.preferredIndustry} onChange={(e) => handleChange("preferredIndustry", e.target.value)} className={inputClass("preferredIndustry")}>
            <option>Information Technology</option>
            <option>Finance</option>
            <option>Healthcare</option>
            <option>Education</option>
            <option>Manufacturing</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Location</label>
          <input type="text" value={formData.preferredLocation} onChange={(e) => handleChange("preferredLocation", e.target.value)} className={inputClass("preferredLocation")} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Work Mode</label>
          <select value={formData.workMode} onChange={(e) => handleChange("workMode", e.target.value)} className={inputClass("workMode")}>
            <option>Remote</option>
            <option>Hybrid</option>
            <option>On-site</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
          <select value={formData.employmentType} onChange={(e) => handleChange("employmentType", e.target.value)} className={inputClass("employmentType")}>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
            <option>Freelance</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expected Salary (₹/year)</label>
          <input type="text" value={formData.expectedSalary} onChange={(e) => handleChange("expectedSalary", e.target.value)} className={inputClass("expectedSalary")} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notice Period</label>
          <select value={formData.noticePeriod} onChange={(e) => handleChange("noticePeriod", e.target.value)} className={inputClass("noticePeriod")}>
            <option>Immediate</option>
            <option>15 days</option>
            <option>30 days</option>
            <option>60 days</option>
            <option>90 days</option>
          </select>
        </div>
      </div>
    </div>
  );
}
