import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export function CertificationsForm() {
  const [certifications, setCertifications] = useState<Certification[]>([
    { id: 1, name: "AWS Solutions Architect", issuer: "Amazon Web Services", date: "2025-03", url: "" },
  ]);

  const addCert = () => {
    setCertifications([...certifications, { id: Date.now(), name: "", issuer: "", date: "", url: "" }]);
  };

  const removeCert = (id: number) => {
    setCertifications(certifications.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
        <Button variant="outline" size="sm" onClick={addCert}>+ Add Certification</Button>
      </div>

      {certifications.map((cert, idx) => (
        <div key={cert.id} className="p-5 border border-gray-200 rounded-xl space-y-4 relative">
          {certifications.length > 1 && (
            <button onClick={() => removeCert(cert.id)} className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          )}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name</label>
              <input type="text" value={cert.name} onChange={(e) => { const updated = [...certifications]; updated[idx].name = e.target.value; setCertifications(updated); }} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization</label>
              <input type="text" value={cert.issuer} onChange={(e) => { const updated = [...certifications]; updated[idx].issuer = e.target.value; setCertifications(updated); }} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="month" value={cert.date} onChange={(e) => { const updated = [...certifications]; updated[idx].date = e.target.value; setCertifications(updated); }} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Credential URL</label>
              <input type="url" value={cert.url} onChange={(e) => { const updated = [...certifications]; updated[idx].url = e.target.value; setCertifications(updated); }} placeholder="https://" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
