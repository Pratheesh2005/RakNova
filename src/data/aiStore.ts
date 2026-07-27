export interface ResumeAnalyzerOutput {
  overall_score: number;
  ats_score: number;
  contact_info: { name: string; email: string; phone: string; location: string };
  skills: { category: string; skills: string[] }[];
  experience_summary: { company: string; role: string; duration: string; achievements: string[] }[];
  education: { degree: string; institution: string; year: string }[];
  recommended_roles: string[];
  strengths: string[];
  weaknesses: string[];
  formatting_feedback: string[];
}

export interface ATSOptimizerOutput {
  ats_score: number;
  keyword_match_percentage: number;
  matched_keywords: string[];
  missing_keywords: string[];
  formatting_issues: string[];
  experience_improvements: { company: string; role: string; original_bullets: string[]; optimized_bullets: string[] }[];
}

export interface SkillGapOutput {
  current_skills: string[];
  missing_skills: string[];
  critical_skills: string[];
  nice_to_have_skills: string[];
  beginner_roadmap: string[];
  intermediate_roadmap: string[];
  advanced_roadmap: string[];
  recommended_certifications: string[];
  recommended_courses: string[];
  salary_impact: string;
}

export interface CareerRoadmapOutput {
  target_role: string;
  estimated_timeline: string;
  milestones: { phase: string; duration: string; goals: string[]; resources: string[] }[];
  recommended_projects: string[];
  key_certifications: string[];
}

export interface CandidateAISession {
  candidateId: string;
  resumeFileName: string;
  lastParsedDate: string;
  resumeAnalyzer?: ResumeAnalyzerOutput;
  atsOptimizer?: ATSOptimizerOutput;
  skillGap?: SkillGapOutput;
  roadmap?: CareerRoadmapOutput;
  lastJobMatch?: { jobTitle: string; matchScore: number; date: string };
  lastInterviewScore?: number;
  lastCoverLetter?: string;
}

const AI_SESSION_KEY = "raknova_ai_session_cache_v2";

const defaultAISession: CandidateAISession = {
  candidateId: "can-401",
  resumeFileName: "Rohan_Nair_FullStack_Resume.pdf",
  lastParsedDate: "2026-03-28",
  resumeAnalyzer: {
    overall_score: 88,
    ats_score: 85,
    contact_info: {
      name: "Rohan Nair",
      email: "rohan.nair@example.com",
      phone: "+91 98765 43210",
      location: "Bangalore, India",
    },
    skills: [
      { category: "Backend", skills: ["Python", "FastAPI", "PostgreSQL", "Docker", "REST APIs"] },
      { category: "Frontend", skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"] },
      { category: "Cloud & DevOps", skills: ["AWS", "CI/CD", "Git"] },
    ],
    experience_summary: [
      {
        company: "TechNova Solutions",
        role: "Senior Full-Stack Developer",
        duration: "2023 - Present",
        achievements: ["Architected FastAPI microservices handling 50k requests/min", "Reduced frontend load times by 40%"],
      },
    ],
    education: [{ degree: "B.Tech Computer Science", institution: "VTU Bangalore", year: "2022" }],
    recommended_roles: ["Senior Full-Stack Engineer", "Lead Python Developer", "Backend Systems Architect"],
    strengths: ["FastAPI Microservices", "React & TypeScript", "PostgreSQL Query Optimization"],
    weaknesses: ["Kubernetes Cluster Administration", "GraphQL Schema Design"],
    formatting_feedback: ["Strong bullet point structure", "Consistent action verbs"],
  },
  atsOptimizer: {
    ats_score: 88,
    keyword_match_percentage: 85,
    matched_keywords: ["Python", "FastAPI", "React", "PostgreSQL", "Docker", "AWS", "REST APIs"],
    missing_keywords: ["Kubernetes", "Redis", "GraphQL"],
    formatting_issues: ["Consider adding a dedicated Technical Skills summary at top"],
    experience_improvements: [],
  },
  skillGap: {
    current_skills: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Docker", "AWS"],
    missing_skills: ["Kubernetes", "GraphQL", "Redis Caching"],
    critical_skills: ["Kubernetes", "Redis Caching"],
    nice_to_have_skills: ["GraphQL"],
    beginner_roadmap: ["Learn Container Orchestration Fundamentals", "Setup local Minikube cluster"],
    intermediate_roadmap: ["Deploy FastAPI microservices to K8s", "Implement Redis caching layer"],
    advanced_roadmap: ["Manage Production EKS Clusters & Helm Charts"],
    recommended_certifications: ["Certified Kubernetes Application Developer (CKAD)", "AWS Solutions Architect"],
    recommended_courses: ["Kubernetes Mastery (Udemy)", "Redis University Advanced Caching"],
    salary_impact: "+18% to +25% compensation potential for K8s & Redis proficiency",
  },
  roadmap: {
    target_role: "Senior Full-Stack Engineer",
    estimated_timeline: "3 Months",
    milestones: [
      { phase: "Month 1: Infrastructure & Caching", duration: "4 Weeks", goals: ["Master Redis Caching", "Setup K8s Minikube"], resources: ["Redis Docs", "Kubernetes.io"] },
      { phase: "Month 2: Microservice Orchestration", duration: "4 Weeks", goals: ["Deploy Dockerized FastAPI to K8s"], resources: ["CKAD Course"] },
    ],
    recommended_projects: ["Distributed Job Queue with FastAPI & Redis", "EKS Deployed Microservice Suite"],
    key_certifications: ["CKAD", "AWS Certified Developer"],
  },
  lastJobMatch: { jobTitle: "Senior Full-Stack Engineer", matchScore: 88, date: "2026-03-28" },
  lastInterviewScore: 92,
};

export function getAISessionCache(): CandidateAISession {
  if (typeof window === "undefined") return defaultAISession;
  try {
    const saved = localStorage.getItem(AI_SESSION_KEY);
    if (saved) return JSON.parse(saved);
  } catch (err) {
    console.warn("Error reading AI session cache:", err);
  }
  return defaultAISession;
}

export function saveAISessionCache(updates: Partial<CandidateAISession>): CandidateAISession {
  const current = getAISessionCache();
  const updated: CandidateAISession = {
    ...current,
    ...updates,
  };

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(AI_SESSION_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn("Error saving AI session cache:", err);
    }
  }

  return updated;
}
