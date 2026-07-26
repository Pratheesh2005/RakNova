import { cn } from "@/utils/cn";

type Status = "Applied" | "Under Review" | "Shortlisted" | "Interview Scheduled" | "Selected" | "Rejected";

const statusStyles: Record<Status, string> = {
  Applied: "bg-blue-50 text-blue-700 border-blue-200",
  "Under Review": "bg-yellow-50 text-yellow-700 border-yellow-200",
  Shortlisted: "bg-purple-50 text-purple-700 border-purple-200",
  "Interview Scheduled": "bg-green-50 text-green-700 border-green-200",
  Selected: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Rejected: "bg-red-50 text-red-700 border-red-200",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={cn("px-3 py-1 text-xs font-semibold rounded-full border", statusStyles[status])}>
      {status}
    </span>
  );
}
