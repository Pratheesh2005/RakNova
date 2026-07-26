export interface CandidateReviewData {
  id: number;
  name: string;
  appliedPosition: string;
  currentStage: string;
  applicationDate: string;
  aiMatch: number;
  resumeScore: number;
  experience: string;
  education: string;
  location: string;
  expectedSalary: string;
  noticePeriod: string;
  availability: string;
  currentEmployer: string;
  technicalSkills: string[];
  softSkills: string[];
  projects: string[];
  certifications: string[];
  languages: string[];
  achievements: string[];
  portfolio: string;
  github: string;
  linkedin: string;
  aiAnalysis: {
    overallRecommendation: string;
    strengths: string[];
    skillMatch: number;
    experienceMatch: number;
    projectQuality: number;
    resumeQuality: number;
    potentialRisks: string[];
    missingSkills: string[];
    recommendedNextStep: string;
  };
  recruiterNotes: string;
  checklistItems: { label: string; checked: boolean }[];
  activityHistory: { action: string; detail: string; time: string }[];
  relatedCandidates: { name: string; aiMatch: number; experience: string; resumeScore: number }[];
}

export const candidateReviewData: CandidateReviewData = {
  id: 1,
  name: "Priya Sharma",
  appliedPosition: "Senior Frontend Developer",
  currentStage: "Under Review",
  applicationDate: "2026-07-25",
  aiMatch: 96,
  resumeScore: 89,
  experience: "5 years",
  education: "B.Tech Computer Science, Mumbai University",
  location: "Bangalore, India",
  expectedSalary: "₹18,00,000 per annum",
  noticePeriod: "30 days",
  availability: "Immediate",
  currentEmployer: "TechCorp (Present)",
  technicalSkills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL", "REST APIs"],
  softSkills: ["Communication", "Teamwork", "Problem Solving"],
  projects: [
    "E-commerce Dashboard - Built a full-featured admin dashboard with real-time analytics.",
    "Portfolio Builder - Drag-and-drop portfolio generator for developers.",
  ],
  certifications: ["AWS Solutions Architect Associate", "Meta Front-End Developer Professional Certificate"],
  languages: ["English (Fluent)", "Hindi (Native)", "Kannada (Basic)"],
  achievements: [
    "Led frontend team of 4 at TechCorp",
    "Improved page load time by 35%",
    "Mentored 3 junior developers",
  ],
  portfolio: "https://priyasharma.dev",
  github: "https://github.com/priyasharma",
  linkedin: "https://linkedin.com/in/priyasharma",
  aiAnalysis: {
    overallRecommendation: "Excellent match. Proceed to Technical Interview.",
    strengths: [
      "Strong React & TypeScript skills",
      "Excellent portfolio with production-grade projects",
      "Leadership experience",
    ],
    skillMatch: 95,
    experienceMatch: 90,
    projectQuality: 92,
    resumeQuality: 88,
    potentialRisks: ["Limited Docker experience", "No on-call production support background"],
    missingSkills: ["Docker", "Kubernetes basics"],
    recommendedNextStep: "Schedule a technical interview to assess problem-solving and system design.",
  },
  recruiterNotes: "Priya has an impressive track record. Her portfolio is top-notch. Need to verify her cloud deployment experience during the interview. Consider giving her a small take-home assignment if needed.",
  checklistItems: [
    { label: "Resume Reviewed", checked: true },
    { label: "Portfolio Checked", checked: true },
    { label: "GitHub Reviewed", checked: true },
    { label: "Skills Verified", checked: false },
    { label: "Communication Reviewed", checked: false },
    { label: "Reference Check", checked: false },
  ],
  activityHistory: [
    { action: "Application Submitted", detail: "Priya Sharma applied for Senior Frontend Developer", time: "2026-07-25" },
    { action: "Resume Reviewed", detail: "Recruiter Rahul Kumar reviewed the resume", time: "2026-07-26" },
    { action: "AI Screening Completed", detail: "AI scored candidate 96% match", time: "2026-07-26" },
    { action: "Recruiter Assigned", detail: "Assigned to Rahul Kumar", time: "2026-07-26" },
  ],
  relatedCandidates: [
    { name: "Arun Kumar", aiMatch: 91, experience: "3 years", resumeScore: 92 },
    { name: "Sneha Reddy", aiMatch: 78, experience: "4 years", resumeScore: 75 },
    { name: "Rahul Verma", aiMatch: 88, experience: "6 years", resumeScore: 85 },
  ],
};
