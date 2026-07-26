import Link from "next/link";

interface ActionItem {
  label: string;
  href: string;
  icon: string;
  onClick?: () => void;
}

const actions: ActionItem[] = [
  { label: "Create Job", href: "#", icon: "M12 6v6m0 0v6m0-6h6m-6 0H6" },
  { label: "View Candidates", href: "/company/candidates", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857" },
  { label: "Download Applications", href: "#", icon: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { label: "Export Job Report", href: "#", icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
];

interface JobQuickActionsProps {
  onCreateJob: () => void;
}

export function JobQuickActions({ onCreateJob }: JobQuickActionsProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          action.label === "Create Job" ? (
            <button
              key={action.label}
              onClick={onCreateJob}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-all border border-transparent text-left"
            >
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
              </svg>
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </button>
          ) : (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-all border border-transparent"
            >
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
              </svg>
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </Link>
          )
        ))}
      </div>
    </div>
  );
}
