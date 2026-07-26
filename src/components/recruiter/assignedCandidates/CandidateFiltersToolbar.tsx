import { cn } from "@/utils/cn";

interface CandidateFiltersToolbarProps {
  search: string;
  onSearchChange: (val: string) => void;
  stageFilter: string;
  onStageChange: (val: string) => void;
  sort: string;
  onSortChange: (val: string) => void;
}

const stageOptions = ["All", "Assigned", "Under Review", "Interview Ready", "Interview Scheduled", "Feedback Pending", "Offer Recommended"];
const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "match", label: "Highest AI Match" },
  { value: "oldest", label: "Oldest" },
  { value: "resumeScore", label: "Resume Score" },
];

export function CandidateFiltersToolbar({
  search,
  onSearchChange,
  stageFilter,
  onStageChange,
  sort,
  onSortChange,
}: CandidateFiltersToolbarProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="relative flex-1 w-full">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search candidate name, email, job..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Stage:</span>
        <select
          value={stageFilter}
          onChange={(e) => onStageChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {stageOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Sort:</span>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
