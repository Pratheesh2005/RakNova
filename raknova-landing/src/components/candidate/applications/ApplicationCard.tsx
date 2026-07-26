import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Application } from "@/data/candidate/applications";
import { AIInsightsPanel } from "./AIInsightsPanel";
import { ApplicationTimeline } from "./ApplicationTimeline";
import { RecruiterFeedback } from "./RecruiterFeedback";
import { OfferPrediction } from "./OfferPrediction";
import { InterviewPrep } from "./InterviewPrep";
import { DocumentsSection } from "./DocumentsSection";
import { cn } from "@/utils/cn";

interface ApplicationCardProps {
  application: Application;
  onViewDetails: (app: Application) => void;
}

const stageColors: Record<string, string> = {
  Applied: "bg-blue-50 text-blue-700 border-blue-200",
  "Resume Reviewed": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "AI Screening": "bg-purple-50 text-purple-700 border-purple-200",
  "HR Shortlisted": "bg-yellow-50 text-yellow-700 border-yellow-200",
  "Technical Round": "bg-orange-50 text-orange-700 border-orange-200",
  "Manager Round": "bg-pink-50 text-pink-700 border-pink-200",
  "HR Discussion": "bg-cyan-50 text-cyan-700 border-cyan-200",
  Offer: "bg-green-50 text-green-700 border-green-200",
  Hired: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Rejected: "bg-red-50 text-red-700 border-red-200",
};

const priorityColors: Record<string, string> = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-gray-100 text-gray-600",
};

export function ApplicationCard({ application, onViewDetails }: ApplicationCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("insights");

  const formatSalary = (min: number, max: number) => {
    const formatNum = (n: number) => (n >= 1000000 ? `₹${(n / 100000).toFixed(1)} LPA` : `₹${(n / 1000).toFixed(0)}K`);
    return `${formatNum(min)} – ${formatNum(max)}`;
  };

  const tabs = [
    { id: "insights", label: "AI Insights" },
    { id: "timeline", label: "Timeline" },
    ...(application.recruiterFeedback ? [{ id: "feedback", label: "Feedback" }] : []),
    { id: "prediction", label: "Offer Prediction" },
    ...(application.interview ? [{ id: "prep", label: "Interview Prep" }] : []),
    { id: "documents", label: "Documents" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200">
      {/* Main Card */}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Company Info */}
          <div className="flex items-center gap-4 flex-1">
            <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-xl font-bold text-gray-500 flex-shrink-0 shadow-sm">
              {application.company.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-semibold text-gray-900">{application.position}</h3>
                <Badge variant="default" size="sm" className={priorityColors[application.priority]}>
                  {application.priority} Priority
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{application.company}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-gray-500">
                <span>{application.location}</span>
                <span>•</span>
                <span>{formatSalary(application.salaryMin, application.salaryMax)}</span>
                <span>•</span>
                <span>ID: {application.applicationId}</span>
              </div>
            </div>
          </div>

          {/* Stage & Actions */}
          <div className="flex items-center gap-3">
            <Badge variant="default" size="md" className={cn("border", stageColors[application.currentStage])}>
              {application.currentStage}
            </Badge>
            <div className="flex items-center gap-1 bg-brand-50 rounded-lg px-2 py-1">
              <svg className="w-4 h-4 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-bold text-brand-700">{application.aiMatch}%</span>
            </div>
          </div>
        </div>

        {/* Meta Row */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-xs text-gray-500">
          <span>📅 Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
          <span>👤 Recruiter: {application.recruiterName}</span>
          <span>⏱️ Response: {application.expectedResponse}</span>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button variant="primary" size="sm" onClick={() => onViewDetails(application)}>
            View Details
          </Button>
          <Button variant="outline" size="sm" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Hide Analysis" : "Show AI Analysis"}
          </Button>
          {application.currentStage !== "Rejected" && application.currentStage !== "Hired" && (
            <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
              Withdraw
            </Button>
          )}
        </div>
      </div>

      {/* Expandable AI Analysis Section */}
      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50/50">
          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-gray-200 bg-white">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all",
                  activeTab === tab.id
                    ? "border-brand-600 text-brand-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "insights" && <AIInsightsPanel application={application} />}
            {activeTab === "timeline" && <ApplicationTimeline timeline={application.timeline} />}
            {activeTab === "feedback" && application.recruiterFeedback && (
              <RecruiterFeedback feedback={application.recruiterFeedback} />
            )}
            {activeTab === "prediction" && <OfferPrediction application={application} />}
            {activeTab === "prep" && application.interview && (
              <InterviewPrep interview={application.interview} />
            )}
            {activeTab === "documents" && <DocumentsSection documents={application.documents} />}
          </div>
        </div>
      )}
    </div>
  );
}
