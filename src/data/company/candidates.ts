export interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  appliedJob: string;
  experience: string;
  education: string;
  location: string;
  skills: string[];
  aiMatch: number;
  resumeScore: number;
  currentStage: "Applied" | "Under Review" | "Shortlisted" | "Interview Scheduled" | "Offer Sent" | "Rejected";
  appliedDate: string;
  expectedSalary: string;
  noticePeriod: string;
  portfolio?: string;
  github?: string;
  linkedin?: string;
  aiSummary: {
    strengths: string[];
    concerns: string[];
    recommendation: string;
  };
}

export const candidates: Candidate[] = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    appliedJob: "Senior Frontend Developer",
    experience: "5 years",
    education: "B.Tech Computer Science",
    location: "Bangalore",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
    aiMatch: 94,
    resumeScore: 89,
    currentStage: "Under Review",
    appliedDate: "2026-07-25",
    expectedSalary: "₹18,00,000",
    noticePeriod: "30 days",
    portfolio: "https://priyasharma.dev",
    github: "https://github.com/priyasharma",
    linkedin: "https://linkedin.com/in/priyasharma",
    aiSummary: {
      strengths: [
        "Excellent React & TypeScript skills",
        "Strong project portfolio",
        "Matches required experience level",
        "Good GitHub activity",
      ],
      concerns: ["Limited Docker experience"],
      recommendation: "Proceed to Technical Interview",
    },
  },
  {
    id: 2,
    name: "Arun Kumar",
    email: "arun.kumar@email.com",
    phone: "+91 87654 32109",
    appliedJob: "ML Engineer",
    experience: "3 years",
    education: "M.Tech AI & ML",
    location: "Chennai",
    skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Docker"],
    aiMatch: 91,
    resumeScore: 92,
    currentStage: "Shortlisted",
    appliedDate: "2026-07-24",
    expectedSalary: "₹15,00,000",
    noticePeriod: "Immediate",
    github: "https://github.com/arunkumar",
    linkedin: "https://linkedin.com/in/arunkumar",
    aiSummary: {
      strengths: [
        "Strong ML fundamentals",
        "Relevant project experience",
        "Good resume formatting",
      ],
      concerns: ["Kubernetes knowledge missing"],
      recommendation: "Schedule Technical Interview",
    },
  },
  {
    id: 3,
    name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    phone: "+91 76543 21098",
    appliedJob: "DevOps Engineer",
    experience: "4 years",
    education: "B.E. Computer Science",
    location: "Hyderabad",
    skills: ["AWS", "Terraform", "Kubernetes", "Docker", "CI/CD"],
    aiMatch: 78,
    resumeScore: 75,
    currentStage: "Applied",
    appliedDate: "2026-07-23",
    expectedSalary: "₹12,00,000",
    noticePeriod: "60 days",
    portfolio: "https://snehareddy.dev",
    linkedin: "https://linkedin.com/in/snehareddy",
    aiSummary: {
      strengths: [
        "Certified AWS Solutions Architect",
        "Hands-on Terraform experience",
      ],
      concerns: [
        "Limited scripting skills",
        "Resume lacks quantifiable achievements",
      ],
      recommendation: "Review after technical screening",
    },
  },
  {
    id: 4,
    name: "Rahul Mehta",
    email: "rahul.mehta@email.com",
    phone: "+91 65432 10987",
    appliedJob: "Backend Developer",
    experience: "6 years",
    education: "M.Sc. Computer Science",
    location: "Pune",
    skills: ["Node.js", "PostgreSQL", "GraphQL", "Docker", "AWS"],
    aiMatch: 88,
    resumeScore: 85,
    currentStage: "Interview Scheduled",
    appliedDate: "2026-07-22",
    expectedSalary: "₹20,00,000",
    noticePeriod: "15 days",
    github: "https://github.com/rahulmehta",
    linkedin: "https://linkedin.com/in/rahulmehta",
    aiSummary: {
      strengths: [
        "Extensive backend experience",
        "Strong database design skills",
        "Positive interview feedback",
      ],
      concerns: [],
      recommendation: "Proceed to final HR round",
    },
  },
  {
    id: 5,
    name: "Anita Desai",
    email: "anita.desai@email.com",
    phone: "+91 54321 09876",
    appliedJob: "Product Designer",
    experience: "2 years",
    education: "B.Des Interaction Design",
    location: "Bangalore",
    skills: ["Figma", "User Research", "Prototyping", "UI Design"],
    aiMatch: 82,
    resumeScore: 80,
    currentStage: "Applied",
    appliedDate: "2026-07-21",
    expectedSalary: "₹10,00,000",
    noticePeriod: "30 days",
    portfolio: "https://anitadesai.design",
    linkedin: "https://linkedin.com/in/anitadesai",
    aiSummary: {
      strengths: [
        "Strong design portfolio",
        "User-centered approach",
      ],
      concerns: [
        "Limited experience with design systems",
      ],
      recommendation: "Shortlist for portfolio review",
    },
  },
];

export interface ReviewTask {
  id: number;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  actionLabel: string;
}

export const reviewQueue: ReviewTask[] = [
  {
    id: 1,
    title: "12 New Applications",
    description: "From the last 24 hours across 4 active jobs.",
    priority: "High",
    actionLabel: "Review",
  },
  {
    id: 2,
    title: "5 AI Recommended Candidates",
    description: "High match scores, potential for quick hires.",
    priority: "High",
    actionLabel: "View",
  },
  {
    id: 3,
    title: "3 Interviews Awaiting Feedback",
    description: "Feedback pending from hiring managers.",
    priority: "Medium",
    actionLabel: "Request Feedback",
  },
  {
    id: 4,
    title: "2 Candidates Waiting for HR Decision",
    description: "Final round completed, offer stage pending.",
    priority: "Medium",
    actionLabel: "Decide",
  },
  {
    id: 5,
    title: "1 Offer Awaiting Approval",
    description: "Backend Developer offer for Vikram Singh.",
    priority: "High",
    actionLabel: "Approve",
  },
];

export interface ActivityItem {
  action: string;
  detail: string;
  time: string;
}

export const recentActivity: ActivityItem[] = [
  { action: "Shortlisted", detail: "Priya Sharma was shortlisted for Senior Frontend Developer", time: "10 minutes ago" },
  { action: "Resume Reviewed", detail: "Arun Kumar's resume scored 92% by AI", time: "1 hour ago" },
  { action: "Interview Scheduled", detail: "Technical Interview with Rahul Mehta on July 28", time: "3 hours ago" },
  { action: "Offer Sent", detail: "Offer letter sent to Vikram Singh for Backend Developer", time: "Yesterday" },
  { action: "Application Withdrawn", detail: "Karthik withdrew application for DevOps Engineer", time: "Yesterday" },
];
