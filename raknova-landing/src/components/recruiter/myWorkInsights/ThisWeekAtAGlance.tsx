import { weekStats } from "@/data/recruiter/myWorkInsights";

const stats = [
  { label: "Candidates Reviewed", value: weekStats.candidatesReviewed },
  { label: "Interviews Conducted", value: weekStats.interviewsConducted },
  { label: "Feedback Submitted", value: weekStats.feedbackSubmitted },
  { label: "Candidates Shortlisted", value: weekStats.candidatesShortlisted },
  { label: "Tasks Completed", value: weekStats.tasksCompleted },
  { label: "Pending Tasks", value: weekStats.pendingTasks },
];

export function ThisWeekAtAGlance() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
