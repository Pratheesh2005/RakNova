export interface PipelineCandidate {
  id: number;
  name: string;
  position: string;
  aiMatch: number;
  resumeScore: number;
  appliedDate: string;
  priority: "High" | "Medium" | "Low";
  stage: PipelineStage;
  experience: string;
  education: string;
  skills: string[];
  portfolio?: string;
  github?: string;
  linkedin?: string;
  expectedSalary: string;
  noticePeriod: string;
}

export type PipelineStage =
  | "Applications"
  | "Under Review"
  | "Shortlisted"
  | "Technical Interview"
  | "HR Interview"
  | "Offer"
  | "Hired"
  | "Rejected";

export const pipelineStages: PipelineStage[] = [
  "Applications",
  "Under Review",
  "Shortlisted",
  "Technical Interview",
  "HR Interview",
  "Offer",
  "Hired",
  "Rejected",
];

export const candidates: PipelineCandidate[] = [
  {
    id: 1,
    name: "Priya Sharma",
    position: "Senior Frontend Developer",
    aiMatch: 94,
    resumeScore: 89,
    appliedDate: "2026-07-25",
    priority: "High",
    stage: "Under Review",
    experience: "5 years",
    education: "B.Tech Computer Science",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    portfolio: "https://priyasharma.dev",
    github: "https://github.com/priyasharma",
    linkedin: "https://linkedin.com/in/priyasharma",
    expectedSalary: "₹18,00,000",
    noticePeriod: "30 days",
  },
  {
    id: 2,
    name: "Arun Kumar",
    position: "ML Engineer",
    aiMatch: 91,
    resumeScore: 92,
    appliedDate: "2026-07-24",
    priority: "High",
    stage: "Shortlisted",
    experience: "3 years",
    education: "M.Tech AI & ML",
    skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn"],
    github: "https://github.com/arunkumar",
    linkedin: "https://linkedin.com/in/arunkumar",
    expectedSalary: "₹15,00,000",
    noticePeriod: "Immediate",
  },
  {
    id: 3,
    name: "Rahul Mehta",
    position: "Backend Developer",
    aiMatch: 88,
    resumeScore: 85,
    appliedDate: "2026-07-22",
    priority: "Medium",
    stage: "Technical Interview",
    experience: "6 years",
    education: "M.Sc. Computer Science",
    skills: ["Node.js", "PostgreSQL", "GraphQL", "Docker"],
    github: "https://github.com/rahulmehta",
    linkedin: "https://linkedin.com/in/rahulmehta",
    expectedSalary: "₹20,00,000",
    noticePeriod: "15 days",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    position: "DevOps Engineer",
    aiMatch: 78,
    resumeScore: 75,
    appliedDate: "2026-07-23",
    priority: "Low",
    stage: "Applications",
    experience: "4 years",
    education: "B.E. Computer Science",
    skills: ["AWS", "Terraform", "Kubernetes", "Docker"],
    expectedSalary: "₹12,00,000",
    noticePeriod: "60 days",
  },
  {
    id: 5,
    name: "Anita Desai",
    position: "Product Designer",
    aiMatch: 82,
    resumeScore: 80,
    appliedDate: "2026-07-21",
    priority: "Medium",
    stage: "Applications",
    experience: "2 years",
    education: "B.Des Interaction Design",
    skills: ["Figma", "User Research", "Prototyping"],
    portfolio: "https://anitadesai.design",
    linkedin: "https://linkedin.com/in/anitadesai",
    expectedSalary: "₹10,00,000",
    noticePeriod: "30 days",
  },
  {
    id: 6,
    name: "Vikram Singh",
    position: "DevOps Engineer",
    aiMatch: 86,
    resumeScore: 88,
    appliedDate: "2026-07-20",
    priority: "High",
    stage: "HR Interview",
    experience: "5 years",
    education: "B.E. Computer Science",
    skills: ["AWS", "Terraform", "Kubernetes", "Docker", "CI/CD"],
    github: "https://github.com/vikramsingh",
    linkedin: "https://linkedin.com/in/vikramsingh",
    expectedSalary: "₹20,00,000",
    noticePeriod: "15 days",
  },
];

export const pipelineInsights = [
  {
    observation: "3 candidates have remained in 'Under Review' for more than 5 days.",
    reason: "Hiring manager feedback is pending.",
    recommendedAction: "Review these candidates today.",
  },
  {
    observation: "Technical Interview stage has the highest rejection rate (40%).",
    reason: "Candidates lack required system design skills.",
    recommendedAction: "Review interview criteria and consider adding a pre-screening task.",
  },
  {
    observation: "Two excellent candidates are waiting for HR interviews.",
    reason: "HR interview slots are fully booked until next week.",
    recommendedAction: "Schedule interviews today by adding additional slots.",
  },
];

export const pipelineActivity = [
  { action: "Candidate moved to Interview", detail: "Rahul Mehta moved to Technical Interview", time: "1 hour ago" },
  { action: "Offer generated", detail: "Offer letter for Vikram Singh prepared", time: "2 hours ago" },
  { action: "Application withdrawn", detail: "Karthik withdrew application for DevOps Engineer", time: "Yesterday" },
  { action: "Resume updated", detail: "Priya Sharma updated her resume", time: "Yesterday" },
  { action: "Interview completed", detail: "Arun Kumar completed technical interview", time: "2 days ago" },
];
