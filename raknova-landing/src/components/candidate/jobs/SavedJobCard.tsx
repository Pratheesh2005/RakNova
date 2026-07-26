import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MatchBadge } from "./MatchBadge";
import { AIRecommendation } from "./AIRecommendation";
import { SavedJob, formatSalaryINR, getDaysUntilDeadline, getSavedTimeLabel } from "@/data/candidate/savedJobs";
import { cn } from "@/utils/cn";

interface SavedJobCardProps {
  job: SavedJob;
  selected: boolean;
  onSelect: (id: number) => void;
  onRemove: (id: number) => void;
  onApply: (id: number) => void;
  onViewDetails: (job: SavedJob) => void;
  onShare: (job: SavedJob) => void;
}

export function SavedJobCard({ job, selected, onSelect, onRemove, onApply, onViewDetails, onShare }: SavedJobCardProps) {
  const daysLeft = getDaysUntilDeadline(job.deadline);
  const isExpiring = daysLeft <= 3;
  const savedLabel = getSavedTimeLabel(job.savedDate);

  return (
    <div className={cn(
      "bg-white rounded-2xl border p-6 transition-all duration-200",
      selected ? "border-brand-400 bg-brand-50/30 shadow-md ring-2 ring-brand-200" : "border-gray-100 hover:shadow-lg"
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {/* Selection checkbox */}
          <button
            onClick={() => onSelect(job.id)}
            className={cn(
              "w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all mt-1",
              selected ? "bg-brand-600 border-brand-600" : "border-gray-300 hover:border-brand-400"
            )}
          >
            {selected && (
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-xl font-bold text-gray-500 flex-shrink-0">
            {job.company.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{job.position}</h3>
            <p className="text-sm text-gray-600">{job.company}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isExpiring && (
            <Badge variant="danger" size="sm">⏰ {daysLeft} Days Left</Badge>
          )}
          {job.hasApplied && (
            <Badge variant="success" size="sm">✅ Applied</Badge>
          )}
          <MatchBadge percentage={job.matchPercentage} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {job.location}
        </span>
        <span>•</span>
        <span className="font-medium text-gray-700">{formatSalaryINR(job.salaryMin, job.salaryMax)}</span>
        <span>•</span>
        <Badge variant="info" size="sm">{job.workType}</Badge>
        <span>•</span>
        <span>{job.experience}</span>
        <span>•</span>
        <span>⭐ {job.companyRating}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {job.requiredSkills.map((skill) => (
          <Badge key={skill} variant="default" size="sm">{skill}</Badge>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
        <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
        <span>•</span>
        <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
        <span>•</span>
        <span className="text-gray-500">{savedLabel}</span>
      </div>

      {/* AI Recommendation */}
      <div className="mt-4">
        <AIRecommendation job={job} />
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="primary" size="sm" onClick={() => onApply(job.id)} disabled={job.hasApplied}>
          {job.hasApplied ? "Applied" : "Apply Now"}
        </Button>
        <Button variant="outline" size="sm" onClick={() => onViewDetails(job)}>View Details</Button>
        <Button variant="outline" size="sm" onClick={() => onShare(job)}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </Button>
        <button
          onClick={() => onRemove(job.id)}
          className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Remove
        </button>
      </div>
    </div>
  );
}
