export interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  assignedJobs: string[];
  activeCandidates: number;
  status: "Active" | "Away" | "Inactive" | "Pending Invitation";
  lastActive: string;
}

export interface WorkloadItem {
  recruiter: string;
  jobsAssigned: number;
  candidates: number;
  interviewsThisWeek: number;
  pendingReviews: number;
  workloadStatus: "Light" | "Normal" | "Busy" | "Overloaded";
}

export const teamOverview = {
  totalMembers: 8,
  activeRecruiters: 5,
  hiringManagers: 3,
  pendingInvitations: 1,
};

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "HR Manager",
    department: "Human Resources",
    email: "rajesh.kumar@technova.com",
    assignedJobs: ["Senior Frontend Developer", "Backend Developer"],
    activeCandidates: 34,
    status: "Active",
    lastActive: "Today",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Recruiter",
    department: "Human Resources",
    email: "priya.sharma@technova.com",
    assignedJobs: ["ML Engineer"],
    activeCandidates: 28,
    status: "Active",
    lastActive: "Today",
  },
  {
    id: 3,
    name: "Anita Desai",
    role: "Recruiter",
    department: "Human Resources",
    email: "anita.desai@technova.com",
    assignedJobs: ["DevOps Engineer", "Product Designer"],
    activeCandidates: 15,
    status: "Active",
    lastActive: "Yesterday",
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Hiring Manager",
    department: "Engineering",
    email: "vikram.singh@technova.com",
    assignedJobs: ["Senior Frontend Developer", "Backend Developer"],
    activeCandidates: 22,
    status: "Active",
    lastActive: "Today",
  },
  {
    id: 5,
    name: "Sneha Reddy",
    role: "Hiring Manager",
    department: "AI/ML",
    email: "sneha.reddy@technova.com",
    assignedJobs: ["ML Engineer"],
    activeCandidates: 12,
    status: "Away",
    lastActive: "2 days ago",
  },
  {
    id: 6,
    name: "Rahul Verma",
    role: "Recruiter",
    department: "Human Resources",
    email: "rahul.verma@technova.com",
    assignedJobs: ["Backend Developer"],
    activeCandidates: 9,
    status: "Inactive",
    lastActive: "1 week ago",
  },
  {
    id: 7,
    name: "Amit Joshi",
    role: "Department Head",
    department: "Engineering",
    email: "amit.joshi@technova.com",
    assignedJobs: [],
    activeCandidates: 0,
    status: "Pending Invitation",
    lastActive: "—",
  },
];

export const workload: WorkloadItem[] = [
  { recruiter: "Rajesh Kumar", jobsAssigned: 2, candidates: 34, interviewsThisWeek: 6, pendingReviews: 4, workloadStatus: "Busy" },
  { recruiter: "Priya Sharma", jobsAssigned: 1, candidates: 28, interviewsThisWeek: 4, pendingReviews: 2, workloadStatus: "Normal" },
  { recruiter: "Anita Desai", jobsAssigned: 2, candidates: 15, interviewsThisWeek: 3, pendingReviews: 5, workloadStatus: "Busy" },
  { recruiter: "Vikram Singh", jobsAssigned: 2, candidates: 22, interviewsThisWeek: 2, pendingReviews: 1, workloadStatus: "Light" },
];

export const roles = [
  { role: "HR Manager", responsibilities: "Oversee recruitment operations, approve offers, manage team.", permissions: "Full access to all recruitment features.", users: 1 },
  { role: "Recruiter", responsibilities: "Review candidates, schedule interviews, coordinate with hiring managers.", permissions: "Access assigned jobs and candidates, can move candidates through pipeline.", users: 3 },
  { role: "Hiring Manager", responsibilities: "Conduct interviews, provide feedback, request offers.", permissions: "Access assigned candidates, submit interview feedback, view pipeline.", users: 3 },
  { role: "Department Head", responsibilities: "Approve hiring requests, review departmental hiring performance.", permissions: "View analytics and reports, approve new job postings.", users: 1 },
];

export const teamActivity = [
  { action: "Recruiter assigned", detail: "Priya Sharma assigned to ML Engineer role", time: "1 hour ago" },
  { action: "Interview feedback submitted", detail: "Vikram Singh submitted feedback for Priya Sharma", time: "2 hours ago" },
  { action: "Candidate shortlisted", detail: "Rajesh Kumar shortlisted Arun Kumar for ML Engineer", time: "3 hours ago" },
  { action: "Offer approved", detail: "Offer for Vikram Singh approved by Rajesh Kumar", time: "Yesterday" },
  { action: "Invitation accepted", detail: "Amit Joshi accepted team invitation", time: "2 days ago" },
];
