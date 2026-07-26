import { cn } from "@/utils/cn";

const checklist = [
  { label: "Contact Information", complete: true },
  { label: "Education", complete: true },
  { label: "Skills", complete: true },
  { label: "Projects", complete: true },
  { label: "Resume Uploaded", complete: true },
  { label: "Work Experience", complete: true },
  { label: "Certifications", complete: false },
  { label: "Achievements", complete: false },
  { label: "Portfolio Links", complete: false },
];

export function ResumeChecklist() {
  const completed = checklist.filter((c) => c.complete).length;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Resume Checklist</h3>
        <span className="text-sm text-brand-600 font-medium">{completed}/{checklist.length}</span>
      </div>
      <div className="space-y-2">
        {checklist.map((item) => (
          <div key={item.label} className="flex items-center gap-3 py-2">
            <div className={cn(
              "w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-colors",
              item.complete ? "bg-green-100" : "bg-gray-100"
            )}>
              {item.complete ? (
                <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              )}
            </div>
            <span className={cn("text-sm", item.complete ? "text-gray-700" : "text-gray-500")}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
