import { Button } from "@/components/ui/Button";

const reports = [
  "Monthly Hiring Report — July 2026",
  "Weekly Hiring Report — Week 30",
  "Candidate Export — July 2026",
  "Offer Report — Q2 2026",
];

export function RecentReports() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h2>
      <div className="space-y-2">
        {reports.map((report, idx) => (
          <div key={idx} className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-700">{report}</span>
            <Button variant="outline" size="sm">Download</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
