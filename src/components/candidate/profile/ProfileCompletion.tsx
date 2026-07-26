import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/utils/cn";

const checklist = [
  { label: "Personal Information", complete: true },
  { label: "Education", complete: true },
  { label: "Skills", complete: true },
  { label: "Resume Upload", complete: true },
  { label: "Projects", complete: true },
  { label: "Certifications", complete: false },
  { label: "Work Experience", complete: true },
  { label: "Languages", complete: true },
  { label: "Social Links", complete: false },
];

export function ProfileCompletion() {
  const completed = checklist.filter((c) => c.complete).length;
  const total = checklist.length;
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Profile Completion</h3>

      {/* Circular Progress */}
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 flex-shrink-0">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="34" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <circle
              cx="40"
              cy="40"
              r="34"
              fill="none"
              stroke="#6366f1"
              strokeWidth="8"
              strokeDasharray={213.6}
              strokeDashoffset={213.6 - (213.6 * percentage) / 100}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-900">{percentage}%</span>
          </div>
        </div>
        <div>
          <p className="font-medium text-gray-900">{completed} of {total} sections completed</p>
          <p className="text-sm text-gray-500 mt-0.5">Complete all sections to rank higher in recruiter searches</p>
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-2 pt-2">
        {checklist.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-sm">
            <span className={cn(item.complete ? "text-gray-700" : "text-gray-400")}>{item.label}</span>
            {item.complete ? (
              <span className="text-green-600 text-xs font-medium bg-green-50 px-2 py-0.5 rounded-full">✓ Done</span>
            ) : (
              <span className="text-amber-600 text-xs font-medium bg-amber-50 px-2 py-0.5 rounded-full">+ Add</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
