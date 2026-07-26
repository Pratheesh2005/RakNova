import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const sessions = [
  { device: "MacBook Pro — Chrome", location: "Mumbai, India", current: true, lastActive: "Now" },
  { device: "iPhone 15 — Safari", location: "Mumbai, India", current: false, lastActive: "2 hours ago" },
  { device: "Windows PC — Edge", location: "Pune, India", current: false, lastActive: "3 days ago" },
];

export function SecuritySettings() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
      
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-900 mb-3">Active Sessions</p>
        <div className="space-y-3">
          {sessions.map((session, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900">{session.device}</p>
                  {session.current && <Badge variant="success" size="sm">Current</Badge>}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{session.location} • {session.lastActive}</p>
              </div>
              {!session.current && (
                <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">Revoke</Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
        Log Out from All Devices
      </Button>
    </div>
  );
}
