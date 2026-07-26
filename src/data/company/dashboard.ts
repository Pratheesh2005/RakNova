// Realistic dummy data for Company Dashboard v2.0

export interface CompanyInfo {
  name: string;
  logo: string;
  plan: string;
  verified: boolean;
}

export const companyInfo: CompanyInfo = {
  name: "TechNova Solutions",
  logo: "/company-logos/technova.png",
  plan: "Enterprise",
  verified: true,
};

export interface PriorityTask {
  id: number;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  actionLabel: string;
  actionUrl: string;
}

export const todayPriorities: PriorityTask[] = [
  {
    id: 1,
    title: "Review 8 new candidates",
    description: "AI identified 3 highly qualified candidates for Senior Frontend Developer",
    priority: "High",
    actionLabel: "Review",
    actionUrl: "/company/candidates?filter=new",
  },
  {
    id: 2,
    title: "2 interviews require scheduling",
    description: "Pending scheduling for ML Engineer and DevOps candidates",
    priority: "High",
    actionLabel: "Schedule",
    actionUrl: "/company/interviews",
  },
  {
    id: 3,
    title: "1 offer letter waiting for approval",
    description: "Backend Developer offer for Vikram Singh needs final sign-off",
    priority: "Medium",
    actionLabel: "Approve",
    actionUrl: "/company/offers",
  },
  {
    id: 4,
    title: "Frontend Developer job closes tomorrow",
    description: "12 applications received, 3 shortlisted. Consider extending deadline.",
    priority: "Medium",
    actionLabel: "View Job",
    actionUrl: "/company/jobs/1",
  },
  {
    id: 5,
    title: "AI screening completed for 50 applications",
    description: "42 passed, 8 flagged for manual review. Results ready.",
    priority: "Low",
    actionLabel: "View Report",
    actionUrl: "/company/ai-screening",
  },
];

export interface HiringStat {
  label: string;
  value: number;
  change: number; // positive = improvement, negative = decline, 0 = unchanged
}

export const hiringStats: HiringStat[] = [
  { label: "Active Jobs", value: 12, change: 2 },
  { label: "Applications Received", value: 487, change: 12 },
  { label: "Candidates Shortlisted", value: 94, change: 8 },
  { label: "Interviews Today", value: 4, change: 0 },
  { label: "Offers Sent", value: 15, change: -3 },
  { label: "Positions Filled", value: 23, change: 5 },
];

export interface ActiveJob {
  id: number;
  title: string;
  department: string;
  location: string;
  applications: number;
  aiQualified: number;
  status: "Active" | "Draft" | "Closed";
  closingDate: string;
}

export const activeJobs: ActiveJob[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Bangalore",
    applications: 87,
    aiQualified: 34,
    status: "Active",
    closingDate: "2026-08-15",
  },
  {
    id: 2,
    title: "ML Engineer",
    department: "AI/ML",
    location: "Remote",
    applications: 124,
    aiQualified: 52,
    status: "Active",
    closingDate: "2026-08-20",
  },
  {
    id: 3,
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Hyderabad",
    applications: 56,
    aiQualified: 18,
    status: "Active",
    closingDate: "2026-08-10",
  },
  {
    id: 4,
    title: "Product Designer",
    department: "Design",
    location: "Bangalore",
    applications: 43,
    aiQualified: 15,
    status: "Active",
    closingDate: "2026-08-25",
  },
  {
    id: 5,
    title: "Backend Developer",
    department: "Engineering",
    location: "Pune",
    applications: 98,
    aiQualified: 41,
    status: "Active",
    closingDate: "2026-08-18",
  },
];

export interface RecentApplicant {
  id: number;
  name: string;
  role: string;
  experience: string;
  aiMatch: number;
  resumeScore: number;
  status: "New" | "Reviewed" | "Shortlisted" | "Rejected";
  appliedDate: string;
}

export const recentApplicants: RecentApplicant[] = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Senior Frontend Developer",
    experience: "5 years",
    aiMatch: 94,
    resumeScore: 89,
    status: "New",
    appliedDate: "2026-07-25",
  },
  {
    id: 2,
    name: "Arun Kumar",
    role: "ML Engineer",
    experience: "3 years",
    aiMatch: 91,
    resumeScore: 92,
    status: "New",
    appliedDate: "2026-07-25",
  },
  {
    id: 3,
    name: "Sneha Reddy",
    role: "DevOps Engineer",
    experience: "4 years",
    aiMatch: 78,
    resumeScore: 75,
    status: "Reviewed",
    appliedDate: "2026-07-24",
  },
  {
    id: 4,
    name: "Rahul Mehta",
    role: "Backend Developer",
    experience: "6 years",
    aiMatch: 88,
    resumeScore: 85,
    status: "Shortlisted",
    appliedDate: "2026-07-24",
  },
  {
    id: 5,
    name: "Anita Desai",
    role: "Product Designer",
    experience: "2 years",
    aiMatch: 82,
    resumeScore: 80,
    status: "New",
    appliedDate: "2026-07-23",
  },
];

export interface AIInsight {
  observation: string;
  reason: string;
  recommendation: string;
  actionLabel: string;
  actionUrl: string;
}

export const aiInsights: AIInsight[] = [
  {
    observation: "AI Engineer role has low interview conversion rate (12%).",
    reason: "Salary range is 8% below market average, and preferred locations are limited to Bangalore.",
    recommendation: "Increase salary range by 10% and add remote or Hyderabad as options.",
    actionLabel: "Edit Job",
    actionUrl: "/company/jobs/2/edit",
  },
  {
    observation: "Candidates with Python skills have 35% higher interview success rate than Java candidates this month.",
    reason: "Your active engineering roles require Python proficiency; Java applicants lack required ML libraries experience.",
    recommendation: "Adjust job descriptions to emphasize Python as a must-have skill for technical roles.",
    actionLabel: "Update Requirements",
    actionUrl: "/company/jobs?filter=engineering",
  },
];

export interface ScheduleItem {
  id: number;
  time: string;
  type: "Interview" | "Meeting" | "Offer Discussion" | "Assessment";
  title: string;
  candidate?: string;
  role?: string;
}

export const todaySchedule: ScheduleItem[] = [
  {
    id: 1,
    time: "10:30 AM",
    type: "Interview",
    title: "Technical Interview",
    candidate: "Priya Sharma",
    role: "Frontend Developer",
  },
  {
    id: 2,
    time: "1:00 PM",
    type: "Meeting",
    title: "Hiring Strategy Review",
  },
  {
    id: 3,
    time: "2:30 PM",
    type: "Interview",
    title: "HR Round",
    candidate: "Arun Kumar",
    role: "ML Engineer",
  },
  {
    id: 4,
    time: "4:00 PM",
    type: "Offer Discussion",
    title: "Offer Discussion",
    candidate: "Vikram Singh",
    role: "Backend Developer",
  },
];

export interface ActivityItem {
  id: number;
  action: string;
  detail: string;
  time: string;
}

export const activityFeed: ActivityItem[] = [
  {
    id: 1,
    action: "Candidate applied",
    detail: "Priya Sharma applied for Senior Frontend Developer",
    time: "2 minutes ago",
  },
  {
    id: 2,
    action: "Resume reviewed",
    detail: "Arun Kumar's resume scored 92% by AI",
    time: "1 hour ago",
  },
  {
    id: 3,
    action: "Interview scheduled",
    detail: "Technical Interview with Priya Sharma on July 28",
    time: "3 hours ago",
  },
  {
    id: 4,
    action: "Offer accepted",
    detail: "Vikram Singh accepted Backend Developer offer",
    time: "Yesterday",
  },
  {
    id: 5,
    action: "Job closed",
    detail: "Data Analyst position closed after 67 applications",
    time: "Yesterday",
  },
];

export interface NotificationItem {
  id: number;
  type: "application" | "interview" | "offer" | "deadline";
  message: string;
  time: string;
}

export const companyNotifications: NotificationItem[] = [
  {
    id: 1,
    type: "application",
    message: "New application for ML Engineer (94% match)",
    time: "5 min ago",
  },
  {
    id: 2,
    type: "interview",
    message: "Interview reminder: Priya Sharma at 10:30 AM",
    time: "30 min ago",
  },
  {
    id: 3,
    type: "offer",
    message: "Vikram Singh accepted the offer",
    time: "2 hours ago",
  },
  {
    id: 4,
    type: "deadline",
    message: "DevOps Engineer job closes in 3 days",
    time: "4 hours ago",
  },
  {
    id: 5,
    type: "application",
    message: "AI screening completed for 50 applications",
    time: "6 hours ago",
  },
];
