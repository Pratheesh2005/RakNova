export interface AdminKPI {
  label: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease" | "neutral";
}

export interface UserActivityLog {
  id: string;
  action: string;
  timestamp: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Candidate" | "Recruiter" | "Company Admin" | "Super Admin";
  status: "Active" | "Inactive" | "Suspended" | "Deactivated";
  verificationStatus: "Verified" | "Pending" | "Unverified";
  registrationDate: string;
  lastLogin: string;
  location: string;
  companyName?: string;
  bio?: string;
  resumeFileName?: string;
  jobsPostedCount?: number;
  candidatesManagedCount?: number;
  activityTimeline: UserActivityLog[];
}

export interface AdminCompany {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  contactPerson: string;
  industry: string;
  location: string;
  companySize: string;
  description: string;
  jobsPosted: number;
  applicationsCount: number;
  activeRecruiters: number;
  verificationStatus: "Verified" | "Pending Approval" | "Rejected";
  companyStatus: "Active" | "Suspended";
  plan: "Free" | "Premium" | "Enterprise";
  registrationDate: string;
  rejectionReason?: string;
  activeJobListings?: { id: string; title: string; applications: number; status: string }[];
}

export interface AdminRecruiter {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  experience: string;
  skills: string[];
  assignedCompany: string;
  assignedCompanies: string[];
  openJobsCount: number;
  candidatesManaged: number;
  interviewsConducted: number;
  placementsCompleted: number;
  performanceScore: number;
  status: "Active" | "Inactive" | "Suspended";
  registrationDate: string;
  lastLogin: string;
  activityTimeline: UserActivityLog[];
}

export interface AdminCandidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  headline: string;
  currentRole: string;
  location: string;
  experience: string;
  education: string;
  availability: string;
  skills: string[];
  resumeFileName: string;
  applicationsCount: number;
  savedJobsCount: number;
  interviewHistoryCount: number;
  aiReportsCount: number;
  atsScore: number;
  status: "Active" | "Available" | "Hired" | "Suspended";
  registrationDate: string;
  lastActivity: string;
  activityTimeline: UserActivityLog[];
}

export interface AdminJob {
  id: string;
  title: string;
  company: string;
  department: string;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
  workMode: "Remote" | "Hybrid" | "On-site";
  salaryRange: string;
  experienceRequired: string;
  requiredSkills: string[];
  preferredSkills: string[];
  description: string;
  status: "Published" | "Draft" | "Closed" | "Expired";
  applications: number;
  views: number;
  recruitersAssigned: number;
  postedDate: string;
  expiryDate: string;
}

export interface AdminApplication {
  id: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  jobTitle: string;
  companyName: string;
  recruiterName: string;
  appliedDate: string;
  stage: "Applied" | "Screening" | "Interview" | "Offer" | "Hired" | "Rejected";
  matchScore: number;
  resumeFileName: string;
  interviewStatus: string;
  offerStatus: string;
  notes: string;
  timeline: UserActivityLog[];
}

export interface AdminAuditLog {
  id: string;
  timestamp: string;
  userName: string;
  userEmail: string;
  userRole: "Candidate" | "Recruiter" | "Company" | "Super Admin" | "System";
  module: string;
  action: string;
  actionType: "Security" | "System" | "User Update" | "Permission";
  status: "Success" | "Failed" | "Warning";
  ipAddress: string;
  browser: string;
  operatingSystem: string;
  detailsJson?: string;
}

export interface AIModuleStat {
  moduleName: string;
  requestsCount: number;
  avgTimeSec: number;
  successRate: number;
}

export interface AIErrorLog {
  id: string;
  moduleName: string;
  timestamp: string;
  errorType: string;
  status: "Resolved" | "Investigating" | "Logged";
}

export const adminKPIs: AdminKPI[] = [
  { label: "Total Users", value: "24,850", change: "+12.4%", changeType: "increase" },
  { label: "Candidates", value: "18,420", change: "+14.1%", changeType: "increase" },
  { label: "Companies", value: "1,240", change: "+6.8%", changeType: "increase" },
  { label: "Recruiters", value: "5,190", change: "+8.2%", changeType: "increase" },
  { label: "Active Jobs", value: "3,840", change: "+5.1%", changeType: "increase" },
  { label: "Applications", value: "142,600", change: "+18.9%", changeType: "increase" },
  { label: "Interviews", value: "8,920", change: "+9.3%", changeType: "increase" },
  { label: "Platform Status", value: "99.98%", change: "Operational", changeType: "neutral" },
];

export const mockAdminUserKPIs = [
  { label: "Total Users", value: "24,850" },
  { label: "Candidates", value: "18,420" },
  { label: "Companies", value: "1,240" },
  { label: "Recruiters", value: "5,190" },
  { label: "Administrators", value: "12" },
  { label: "Active Users", value: "23,100" },
  { label: "Inactive Users", value: "1,200" },
  { label: "Suspended Users", value: "550" },
];

export const mockAdminUsers: AdminUser[] = [
  {
    id: "usr-101",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    role: "Candidate",
    status: "Active",
    verificationStatus: "Verified",
    registrationDate: "2026-01-15",
    lastLogin: "10 mins ago",
    location: "Bangalore, India",
    bio: "Senior Full-Stack Engineer specializing in FastAPI, React, PostgreSQL, and AWS Cloud.",
    resumeFileName: "Aarav_Sharma_Resume.pdf",
    activityTimeline: []
  },
  {
    id: "usr-102",
    name: "Priya Patel",
    email: "priya.patel@techcorp.com",
    phone: "+91 98123 45678",
    role: "Recruiter",
    status: "Active",
    verificationStatus: "Verified",
    registrationDate: "2026-02-01",
    lastLogin: "1 hour ago",
    location: "Mumbai, India",
    companyName: "TechCorp Systems",
    activityTimeline: []
  }
];

export const mockAdminCompanies: AdminCompany[] = [
  {
    id: "cmp-201",
    name: "TechCorp Systems",
    email: "contact@techcorp.com",
    phone: "+91 80 4123 4567",
    website: "https://techcorp.example.com",
    contactPerson: "Priya Patel",
    industry: "Software & Cloud",
    location: "Bangalore, India",
    companySize: "500-1000 employees",
    description: "Leading enterprise cloud software provider.",
    jobsPosted: 42,
    applicationsCount: 1850,
    activeRecruiters: 12,
    verificationStatus: "Verified",
    companyStatus: "Active",
    plan: "Enterprise",
    registrationDate: "2025-06-15",
    activeJobListings: [
      { id: "job-501", title: "Senior Full-Stack Engineer", applications: 184, status: "Active" }
    ]
  },
  {
    id: "cmp-202",
    name: "Innovate AI",
    email: "hr@innovate.io",
    phone: "+91 40 6789 0123",
    website: "https://innovate.io",
    contactPerson: "Vikram Malhotra",
    industry: "Artificial Intelligence",
    location: "Hyderabad, India",
    companySize: "100-250 employees",
    description: "Cutting-edge artificial intelligence research firm.",
    jobsPosted: 18,
    applicationsCount: 640,
    activeRecruiters: 5,
    verificationStatus: "Verified",
    companyStatus: "Active",
    plan: "Premium",
    registrationDate: "2025-09-01",
    activeJobListings: [
      { id: "job-502", title: "Lead AI Systems Architect", applications: 92, status: "Active" }
    ]
  }
];

export const mockAdminRecruiters: AdminRecruiter[] = [
  {
    id: "rec-301",
    name: "Siddharth Verma",
    email: "s.verma@techcorp.com",
    phone: "+91 98123 45678",
    department: "Technical Talent Acquisition",
    experience: "5+ years",
    skills: ["Technical Screening"],
    assignedCompany: "TechCorp Systems",
    assignedCompanies: ["TechCorp Systems"],
    openJobsCount: 8,
    candidatesManaged: 142,
    interviewsConducted: 48,
    placementsCompleted: 34,
    performanceScore: 94,
    status: "Active",
    registrationDate: "2025-05-10",
    lastLogin: "20 mins ago",
    activityTimeline: []
  }
];

export const mockAdminCandidates: AdminCandidate[] = [
  {
    id: "can-401",
    name: "Rohan Nair",
    email: "rohan.nair@example.com",
    phone: "+91 98765 43210",
    headline: "Senior Full-Stack Engineer",
    currentRole: "Senior Developer",
    location: "Bangalore, India",
    experience: "5+ years",
    education: "B.Tech CS",
    availability: "Immediate",
    skills: ["Python", "FastAPI"],
    resumeFileName: "Rohan_Nair_Resume.pdf",
    applicationsCount: 14,
    savedJobsCount: 6,
    interviewHistoryCount: 4,
    aiReportsCount: 8,
    atsScore: 88,
    status: "Available",
    registrationDate: "2026-01-10",
    lastActivity: "Today 10:30 AM",
    activityTimeline: []
  }
];

export const mockAdminJobs: AdminJob[] = [
  {
    id: "job-501",
    title: "Senior Full-Stack Engineer",
    company: "TechCorp Systems",
    department: "Engineering",
    location: "Bangalore, India",
    employmentType: "Full-time",
    workMode: "Hybrid",
    salaryRange: "₹24 - ₹32 LPA",
    experienceRequired: "3-5 years",
    requiredSkills: ["Python", "FastAPI"],
    preferredSkills: ["Docker"],
    description: "Build scalable cloud microservices.",
    status: "Published",
    applications: 184,
    views: 1250,
    recruitersAssigned: 4,
    postedDate: "2026-03-01",
    expiryDate: "2026-04-01"
  }
];

export const mockAdminApplications: AdminApplication[] = [
  {
    id: "APP-901",
    candidateName: "Rohan Nair",
    candidateEmail: "rohan.nair@example.com",
    candidatePhone: "+91 98765 43210",
    jobTitle: "Senior Full-Stack Engineer",
    companyName: "TechCorp Systems",
    recruiterName: "Priya Patel",
    appliedDate: "2026-03-10",
    stage: "Interview",
    matchScore: 88,
    resumeFileName: "Rohan_Nair_Resume.pdf",
    interviewStatus: "Scheduled",
    offerStatus: "Pending",
    notes: "Strong match",
    timeline: []
  }
];

export const mockAIModuleStats: AIModuleStat[] = [
  { moduleName: "Resume Analyzer", requestsCount: 14250, avgTimeSec: 1.2, successRate: 99.4 },
  { moduleName: "ATS Resume Optimizer", requestsCount: 18900, avgTimeSec: 1.5, successRate: 98.8 },
  { moduleName: "Job Match Analyzer", requestsCount: 22400, avgTimeSec: 1.1, successRate: 99.6 },
  { moduleName: "Interview Assistant", requestsCount: 8900, avgTimeSec: 2.1, successRate: 97.9 },
  { moduleName: "Skill Gap Analyzer", requestsCount: 11200, avgTimeSec: 1.8, successRate: 99.1 },
  { moduleName: "Career Roadmap Generator", requestsCount: 7600, avgTimeSec: 2.4, successRate: 98.2 },
  { moduleName: "Cover Letter Generator", requestsCount: 9400, avgTimeSec: 1.6, successRate: 99.5 },
  { moduleName: "AI Career Chat", requestsCount: 31000, avgTimeSec: 0.9, successRate: 99.8 },
  { moduleName: "Company AI Matching", requestsCount: 6500, avgTimeSec: 1.4, successRate: 99.2 },
];

export const mockAIErrors: AIErrorLog[] = [
  { id: "err-1", moduleName: "Interview Assistant", timestamp: "2026-03-28 10:14:02", errorType: "Gemini API Timeout (504)", status: "Resolved" },
  { id: "err-2", moduleName: "Career Roadmap Generator", timestamp: "2026-03-28 09:32:18", errorType: "JSON Output Malformed", status: "Resolved" },
  { id: "err-3", moduleName: "ATS Resume Optimizer", timestamp: "2026-03-27 18:45:10", errorType: "PDF File Parse Failure", status: "Logged" },
];

export const mockAdminAuditLogs: AdminAuditLog[] = [
  { id: "log-701", timestamp: "2026-03-28 10:14:22", userName: "Admin (sysadmin)", userEmail: "admin@raknova.com", userRole: "Super Admin", action: "Approved Company Verification for Innovate AI", module: "Company Management", actionType: "User Update", ipAddress: "192.168.1.45", browser: "Chrome 122", operatingSystem: "Windows 11", status: "Success", detailsJson: '{"companyId": "cmp-202", "status": "Verified"}' },
  { id: "log-702", timestamp: "2026-03-28 09:48:10", userName: "Priya Patel", userEmail: "priya@techcorp.com", userRole: "Recruiter", action: "Updated Job Posting #job-501", module: "Job Management", actionType: "User Update", ipAddress: "10.0.4.12", browser: "Firefox 123", operatingSystem: "macOS Sonoma", status: "Success" }
];
