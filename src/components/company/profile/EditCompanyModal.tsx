import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { CompanyProfileData } from "@/data/company/companyProfile";

interface EditCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: CompanyProfileData;
}

export function EditCompanyModal({ isOpen, onClose, company }: EditCompanyModalProps) {
  const [name, setName] = useState(company.name);
  const [description, setDescription] = useState(company.description);
  const [website, setWebsite] = useState(company.website);
  const [industry, setIndustry] = useState(company.industry);
  const [headquarters, setHeadquarters] = useState(company.headquarters);
  const [foundedYear, setFoundedYear] = useState(company.foundedYear);
  const [companySize, setCompanySize] = useState(company.companySize);
  const [mission, setMission] = useState(company.mission);
  const [vision, setVision] = useState(company.vision);
  const [culture, setCulture] = useState(company.culture);
  const [coreValues, setCoreValues] = useState(company.coreValues.join(", "));
  const [benefits, setBenefits] = useState(company.benefits.join(", "));
  const [hrManager, setHrManager] = useState(company.hrManager);
  const [recruitmentEmail, setRecruitmentEmail] = useState(company.recruitmentEmail);
  const [recruitmentPhone, setRecruitmentPhone] = useState(company.recruitmentPhone);
  const [workingHours, setWorkingHours] = useState(company.workingHours);
  const [responseTime, setResponseTime] = useState(company.responseTime);

  const handleSave = () => {
    // placeholder save
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Company Profile" size="lg">
      <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
        {/* Basic Information */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Basic Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">Company Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Industry</label>
              <input type="text" value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Headquarters</label>
              <input type="text" value={headquarters} onChange={(e) => setHeadquarters(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Founded Year</label>
              <input type="number" value={foundedYear} onChange={(e) => setFoundedYear(Number(e.target.value))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Company Size</label>
              <input type="text" value={companySize} onChange={(e) => setCompanySize(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Website</label>
              <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
            </div>
          </div>
        </div>

        {/* Description & About */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">About</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Company Description</label>
              <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Mission</label>
              <input type="text" value={mission} onChange={(e) => setMission(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Vision</label>
              <input type="text" value={vision} onChange={(e) => setVision(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Culture</label>
              <textarea rows={2} value={culture} onChange={(e) => setCulture(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Core Values (comma separated)</label>
              <input type="text" value={coreValues} onChange={(e) => setCoreValues(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Benefits (comma separated)</label>
              <input type="text" value={benefits} onChange={(e) => setBenefits(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
            </div>
          </div>
        </div>

        {/* Hiring Contact */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Hiring Contact</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">HR Manager</label>
              <input type="text" value={hrManager} onChange={(e) => setHrManager(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Recruitment Email</label>
              <input type="email" value={recruitmentEmail} onChange={(e) => setRecruitmentEmail(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Recruitment Phone</label>
              <input type="text" value={recruitmentPhone} onChange={(e) => setRecruitmentPhone(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Working Hours</label>
              <input type="text" value={workingHours} onChange={(e) => setWorkingHours(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Response Time</label>
              <input type="text" value={responseTime} onChange={(e) => setResponseTime(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="sm" onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </Modal>
  );
}
