export interface WeekStats {
  candidatesReviewed: number;
  interviewsConducted: number;
  feedbackSubmitted: number;
  candidatesShortlisted: number;
  tasksCompleted: number;
  pendingTasks: number;
}

export const weekStats: WeekStats = {
  candidatesReviewed: 18,
  interviewsConducted: 6,
  feedbackSubmitted: 4,
  candidatesShortlisted: 9,
  tasksCompleted: 22,
  pendingTasks: 5,
};

export interface WorkloadItem {
  label: string;
  value: number; // percentage
}

export const workloadItems: WorkloadItem[] = [
  { label: "Candidate Reviews", value: 75 },
  { label: "Interview Schedule", value: 60 },
  { label: "Pending Feedback", value: 40 },
  { label: "Completed Tasks", value: 85 },
];

export interface AIInsight {
  observation: string;
  reason: string;
  suggestedImprovement: string;
}

export const aiProductivityInsights: AIInsight[] = [
  {
    observation: "You review resumes fastest during morning hours.",
    reason: "85% of your resume reviews are completed before noon.",
    suggestedImprovement: "Schedule resume reviews before noon to maintain high throughput.",
  },
  {
    observation: "Interview feedback is usually submitted one day late.",
    reason: "Average feedback submission time is 24 hours after the interview.",
    suggestedImprovement: "Submit feedback immediately after interviews to speed up the hiring process.",
  },
  {
    observation: "Candidates shortlisted within 24 hours have a higher interview acceptance rate.",
    reason: "Quick follow-up shows candidate engagement; acceptance rate drops after 48 hours.",
    suggestedImprovement: "Review new candidates daily to maintain a high interview acceptance rate.",
  },
];

export interface ActivityItem {
  action: string;
  detail: string;
  time: string;
}

export const recentActivity: ActivityItem[] = [
  { action: "Candidate Reviewed", detail: "Reviewed Priya Sharma's resume", time: "1 hour ago" },
  { action: "Interview Scheduled", detail: "Scheduled technical interview for Arun Kumar", time: "3 hours ago" },
  { action: "Feedback Submitted", detail: "Submitted feedback for Vikram Singh", time: "Yesterday" },
  { action: "Resume Downloaded", detail: "Downloaded resume of Sneha Reddy", time: "Yesterday" },
  { action: "Candidate Shortlisted", detail: "Shortlisted Rahul Mehta for HR round", time: "2 days ago" },
];

export interface ResponsibilityItem {
  title: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  actionLabel: string;
}

export const upcomingResponsibilities: ResponsibilityItem[] = [
  {
    title: "3 interviews tomorrow",
    dueDate: "July 29, 2026",
    priority: "High",
    actionLabel: "View Interviews",
  },
  {
    title: "5 resumes pending",
    dueDate: "Today",
    priority: "High",
    actionLabel: "Start Review",
  },
  {
    title: "2 feedback forms due",
    dueDate: "July 30, 2026",
    priority: "Medium",
    actionLabel: "Submit Feedback",
  },
  {
    title: "1 follow-up reminder",
    dueDate: "July 31, 2026",
    priority: "Low",
    actionLabel: "Send Reminder",
  },
];

export const learningSuggestions = [
  "Improve behavioral interview techniques to assess cultural fit more accurately.",
  "Learn to leverage AI resume evaluation to speed up initial screenings.",
  "Review structured interview practices to ensure consistency across candidates.",
  "Explore advanced Boolean search techniques to source passive candidates.",
  "Attend a workshop on unconscious bias in recruitment.",
];
