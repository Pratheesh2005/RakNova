import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MatchBadge } from "./MatchBadge";
import { formatSalary, formatRelativeTime } from "@/utils/formatDate";
import { Job } from "@/data/candidate/jobs";

interface JobCardProps {
  job: Job;
  onViewDetails?: (job: Job) => void;
  saved?: boolean;
  onSave?: () => void;
}

export function JobCard({ job, onViewDetails, saved = false, onSave }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(saved);

  const toggleSave = () => {
    setIsSaved(!isSaved);
    onSave?.();
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 group">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-xl font-bold text-gray-500 flex-shrink-0">
            {job.company.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
              {job.position}
            </h3>
            <p className="text-sm text-gray-600">{job.company}</p>
          </div>
        </div>
        <MatchBadge percentage={job.matchPercentage} />
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
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {job.jobType}
        </span>
        <span>•</span>
        <Badge variant="info" size="sm">{job.workType}</Badge>
        <span>•</span>
        <span className="font-medium text-gray-700">{formatSalary(job.salaryMin, job.salaryMax, "INR")}</span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
        <span>💼 {job.experience}</span>
        <span>•</span>
        <span>🏢 {job.companySize}</span>
        <span>•</span>
        <span>📅 {formatRelativeTime(job.postedDate)}</span>
        <span>•</span>
        <span className="text-green-600 font-medium">{job.openPositions} open position{job.openPositions > 1 ? "s" : ""}</span>
      </div>

      <p className="mt-3 text-sm text-gray-600 line-clamp-2">{job.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.requiredSkills.slice(0, 4).map((skill) => (
          <Badge key={skill} variant="default" size="sm">{skill}</Badge>
        ))}
        {job.requiredSkills.length > 4 && (
          <Badge variant="default" size="sm">+{job.requiredSkills.length - 4}</Badge>
        )}
      </div>

      <div className="mt-5 flex gap-3">
        <Button variant="primary" size="sm" className="flex-1">Apply Now</Button>
        <Button variant="outline" size="sm" onClick={() => onViewDetails?.(job)}>View Details</Button>
        <button
          onClick={toggleSave}
          className={`p-2 rounded-lg border transition-all flex-shrink-0 ${
            isSaved
              ? "bg-brand-50 border-brand-200 text-brand-600"
              : "border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600"
          }`}
        >
          <svg className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
