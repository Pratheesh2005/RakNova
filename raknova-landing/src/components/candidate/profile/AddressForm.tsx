import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function AddressForm() {
  const [formData, setFormData] = useState({
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    pinCode: "400001",
    currentAddress: "123, Marine Drive, Churchgate",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Address</h3>
        <Button variant="primary" size="sm" onClick={handleSave} loading={saving}>Save</Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <input type="text" value={formData.country} onChange={(e) => handleChange("country", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <input type="text" value={formData.state} onChange={(e) => handleChange("state", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input type="text" value={formData.city} onChange={(e) => handleChange("city", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
          <input type="text" value={formData.pinCode} onChange={(e) => handleChange("pinCode", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Current Address</label>
        <textarea rows={3} value={formData.currentAddress} onChange={(e) => handleChange("currentAddress", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
      </div>
    </div>
  );
}
