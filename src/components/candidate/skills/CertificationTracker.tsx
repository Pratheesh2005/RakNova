import { Badge } from "@/components/ui/Badge";
import { certifications } from "@/data/candidate/skills";

const statusColors = {
  Completed: "bg-green-100 text-green-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Recommended: "bg-yellow-100 text-yellow-700",
  Expired: "bg-red-100 text-red-700",
};

export function CertificationTracker() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">📜 Certification Tracker</h3>
      <div className="space-y-2">
        {certifications.map((cert, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-900">{cert.name}</p>
              <p className="text-xs text-gray-500">{cert.provider}</p>
            </div>
            <Badge variant="default" size="sm" className={statusColors[cert.status]}>{cert.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
