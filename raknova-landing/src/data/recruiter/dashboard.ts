export interface RecruiterInfo {
  name: string;
  photo: string;
  greeting: string;
  date: string;
  tasksCount: number;
}

export const recruiterInfo: RecruiterInfo = {
  name: "Rahul Kumar",
  photo: "/avatars/rahul-kumar.jpg",
  greeting: "Good Morning",
  date: "July 28, 2026",
  tasksCount: 9,
};

export interface TaskItem {
  title: string;
  priority: "High" | "Medium" | "Low";
  estimatedTime: string;
  actionLabel: string;
}

export const todayTasks: TaskItem[] = [
  {
    title: "Review 7 new resumes",
    priority: "High",
    estimatedTime: "30 min",
    actionLabel: "Start Review",
  },
  {
    title: "Schedule 3 interviews",
    priority: "High",
    estimatedTime: "15 min",
    actionLabel: "Schedule",
  },
  {
    title: "Submit 2 interview feedback forms",
    priority: "Medium",
    estimatedTime: "20 min",
    actionLabel: "Submit Feedback",
  },
  {
    title: "Call 4 shortlisted candidates",
    priority: "Medium",
    estimatedTime: "1 hour",
    actionLabel: "Call",
  },
  {
    title: "Review 2 AI recommended candidates",
    priority: "Low",
    estimatedTime: "10 min",
    actionLabel: "Review",
  },
];

export interface WorkStat {
  label: string;
  value: number;
}

export const workStats: WorkStat[] = [
  { label: "Candidates Assigned", value: 34 },
  { label: "Reviewed Today", value: 7 },
  { label: "Interviews Scheduled", value: 4 },
  { label: "Feedback Pending", value: 2 },
  { label: "Shortlisted Candidates", value: 12 },
  { label: "Tasks Completed", value: 15 },
];

export interface AssignedJob {
  id: number;
  title: string;
  department: string;
  candidatesAssigned: number;
  openPositions: number;
  closingDate: string;
  priority: "High" | "Medium" | "Low";
}

export const assignedJobs: AssignedJob[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    candidatesAssigned: 12,
    openPositions: 2,
    closingDate: "2026-08-15",
    priority: "High",
  },
  {
    id: 2,
    title: "ML Engineer",
    department: "AI/ML",
    candidatesAssigned: 18,
    openPositions: 1,
    closingDate: "2026-08-20",
    priority: "High",
  },
  {
    id: 3,
    title: "Backend Developer",
    department: "Engineering",
    candidatesAssigned: 4,
    openPositions: 2,
    closingDate: "2026-08-18",
    priority: "Medium",
  },
];

export interface CandidateItem {
  id: number;
  name: string;
  appliedRole: string;
  aiMatch: number;
  resumeScore: number;
  currentStage: string;
  priority: "High" | "Medium" | "Low";
}

export const todayCandidates: CandidateItem[] = [
  {
    id: 1,
    name: "Priya Sharma",
    appliedRole: "Senior Frontend Developer",
    aiMatch: 96,
    resumeScore: 89,
    currentStage: "Under Review",
    priority: "High",
  },
  {
    id: 2,
    name: "Arun Kumar",
    appliedRole: "ML Engineer",
    aiMatch: 91,
    resumeScore: 92,
    currentStage: "Shortlisted",
    priority: "High",
  },
  {
    id: 3,
    name: "Sneha Reddy",
    appliedRole: "DevOps Engineer",
    aiMatch: 78,
    resumeScore: 75,
    currentStage: "Applied",
    priority: "Medium",
  },
];

export interface InterviewItem {
  id: number;
  time: string;
  candidate: string;
  role: string;
  interviewType: string;
  meetingMode: string;
  status: string;
}

export const todayInterviews: InterviewItem[] = [
  {
    id: 1,
    time: "10:30 AM",
    candidate: "Priya Sharma",
    role: "Frontend Developer",
    interviewType: "Technical",
    meetingMode: "Online",
    status: "Scheduled",
  },
  {
    id: 2,
    time: "2:00 PM",
    candidate: "Arun Kumar",
    role: "ML Engineer",
    interviewType: "Technical",
    meetingMode: "Online",
    status: "In Progress",
  },
];

export interface AISuggestion {
  observation: string;
  reason: string;
  recommendedAction: string;
}

export const aiSuggestions: AISuggestion[] = [
  {
    observation: "Candidate Priya Sharma has a 96% match.",
    reason: "Skills, experience and portfolio align perfectly with the Frontend Developer role.",
    recommendedAction: "Review immediately.",
  },
  {
    observation: "Interview feedback for Rahul Verma has been pending for two days.",
    reason: "Without feedback, the candidate cannot proceed.",
    recommendedAction: "Submit feedback today.",
  },
  {
    observation: "Frontend Developer role has several highly qualified candidates.",
    reason: "Three candidates with 90%+ match are awaiting review.",
    recommendedAction: "Begin scheduling interviews.",
  },
];

export const recruiterActivity = [
  { action: "Candidate reviewed", detail: "Priya Sharma's resume reviewed and scored 89%", time: "30 min ago" },
  { action: "Interview scheduled", detail: "Technical Interview with Arun Kumar on July 30", time: "1 hour ago" },
  { action: "Feedback submitted", detail: "Interview feedback for Vikram Singh", time: "3 hours ago" },
  { action: "Candidate shortlisted", detail: "Arun Kumar shortlisted for ML Engineer", time: "Yesterday" },
  { action: "Resume downloaded", detail: "Downloaded resume of Priya Sharma", time: "Yesterday" },
];

export const recruiterNotifications = [
  { message: "New candidate assigned to you: Priya Sharma", time: "5 min ago" },
  { message: "Interview reminder: Priya Sharma at 10:30 AM", time: "30 min ago" },
  { message: "Feedback overdue: Rahul Verma (2 days)", time: "2 hours ago" },
  { message: "Candidate accepted interview invitation: Arun Kumar", time: "3 hours ago" },
];
