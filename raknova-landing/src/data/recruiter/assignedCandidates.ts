export interface AssignedCandidate {
  id: number;
  name: string;
  email: string;
  appliedJob: string;
  experience: string;
  education: string;
  location: string;
  skills: string[];
  aiMatch: number;
  resumeScore: number;
  currentStage: "Assigned" | "Under Review" | "Interview Ready" | "Interview Scheduled" | "Feedback Pending" | "Offer Recommended";
  assignedDate: string;
  priority: "High" | "Medium" | "Low";
  portfolio?: string;
  github?: string;
  linkedin?: string;
  projects?: string[];
  recruiterNotes?: string;
  aiSummary?: {
    strengths: string[];
    concerns: string[];
    recommendedAction: string;
  };
}

export const reviewQueue = [
  { title: "Candidates Awaiting Review", count: 4, priority: "High", actionLabel: "Start Review" },
  { title: "High Priority Candidates", count: 2, priority: "High", actionLabel: "View" },
  { title: "Interview Ready Candidates", count: 3, priority: "Medium", actionLabel: "Schedule" },
  { title: "Feedback Pending", count: 1, priority: "Medium", actionLabel: "Submit Feedback" },
  { title: "Applications Received Today", count: 5, priority: "Low", actionLabel: "Review" },
];

export const assignedCandidates: AssignedCandidate[] = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    appliedJob: "Senior Frontend Developer",
    experience: "5 years",
    education: "B.Tech Computer Science",
    location: "Bangalore",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
    aiMatch: 96,
    resumeScore: 89,
    currentStage: "Under Review",
    assignedDate: "2026-07-25",
    priority: "High",
    portfolio: "https://priyasharma.dev",
    github: "https://github.com/priyasharma",
    linkedin: "https://linkedin.com/in/priyasharma",
    projects: ["E-commerce Dashboard", "Portfolio Builder"],
    recruiterNotes: "Excellent frontend skills, strong portfolio. Schedule technical interview.",
    aiSummary: {
      strengths: ["Python", "TensorFlow", "FastAPI", "Strong Projects", "Excellent Resume"],
      concerns: ["Limited Docker experience"],
      recommendedAction: "Schedule Technical Interview",
    },
  },
  {
    id: 2,
    name: "Arun Kumar",
    email: "arun.kumar@email.com",
    appliedJob: "ML Engineer",
    experience: "3 years",
    education: "M.Tech AI & ML",
    location: "Chennai",
    skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Docker"],
    aiMatch: 91,
    resumeScore: 92,
    currentStage: "Interview Ready",
    assignedDate: "2026-07-24",
    priority: "High",
    github: "https://github.com/arunkumar",
    linkedin: "https://linkedin.com/in/arunkumar",
    projects: ["Sentiment Analysis API", "Image Classifier"],
    aiSummary: {
      strengths: ["Machine Learning", "Deep Learning", "Strong GitHub", "Relevant Projects"],
      concerns: ["Kubernetes knowledge missing"],
      recommendedAction: "Proceed to Technical Interview",
    },
  },
  {
    id: 3,
    name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    appliedJob: "DevOps Engineer",
    experience: "4 years",
    education: "B.E. Computer Science",
    location: "Hyderabad",
    skills: ["AWS", "Terraform", "Kubernetes", "Docker", "CI/CD"],
    aiMatch: 78,
    resumeScore: 75,
    currentStage: "Assigned",
    assignedDate: "2026-07-23",
    priority: "Medium",
    portfolio: "https://snehareddy.dev",
    linkedin: "https://linkedin.com/in/snehareddy",
    recruiterNotes: "Needs technical screening. Might be a good fit for junior role.",
  },
  {
    id: 4,
    name: "Rahul Mehta",
    email: "rahul.mehta@email.com",
    appliedJob: "Backend Developer",
    experience: "6 years",
    education: "M.Sc. Computer Science",
    location: "Pune",
    skills: ["Node.js", "PostgreSQL", "GraphQL", "Docker", "AWS"],
    aiMatch: 88,
    resumeScore: 85,
    currentStage: "Interview Scheduled",
    assignedDate: "2026-07-22",
    priority: "High",
    github: "https://github.com/rahulmehta",
    linkedin: "https://linkedin.com/in/rahulmehta",
    recruiterNotes: "Strong candidate. HR round scheduled.",
    aiSummary: {
      strengths: ["Backend Architecture", "Database Design", "AWS Experience"],
      concerns: [],
      recommendedAction: "Finalize Offer after HR round",
    },
  },
  {
    id: 5,
    name: "Anita Desai",
    email: "anita.desai@email.com",
    appliedJob: "Product Designer",
    experience: "2 years",
    education: "B.Des Interaction Design",
    location: "Bangalore",
    skills: ["Figma", "User Research", "Prototyping", "UI Design"],
    aiMatch: 82,
    resumeScore: 80,
    currentStage: "Feedback Pending",
    assignedDate: "2026-07-21",
    priority: "Medium",
    portfolio: "https://anitadesai.design",
    linkedin: "https://linkedin.com/in/anitadesai",
    recruiterNotes: "Portfolio is impressive, but experience is limited. Gather feedback from design team.",
    aiSummary: {
      strengths: ["Design Portfolio", "User Research"],
      concerns: ["Limited experience with design systems"],
      recommendedAction: "Collect feedback from design team",
    },
  },
];

export const recruiterActivity = [
  { action: "Candidate reviewed", detail: "Priya Sharma's resume reviewed and scored 89%", time: "30 min ago" },
  { action: "Resume downloaded", detail: "Downloaded resume of Arun Kumar", time: "1 hour ago" },
  { action: "Interview scheduled", detail: "Technical Interview with Rahul Mehta on July 28", time: "3 hours ago" },
  { action: "Feedback submitted", detail: "Interview feedback for Vikram Singh", time: "Yesterday" },
  { action: "Candidate shortlisted", detail: "Arun Kumar shortlisted for ML Engineer", time: "Yesterday" },
];
