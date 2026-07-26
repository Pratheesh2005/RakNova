export interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  category: string;
  demand: "Low" | "Medium" | "High" | "Very High" | "Extremely High";
  color: string;
}

export const skillCategories = {
  Programming: {
    icon: "💻",
    color: "bg-blue-50 text-blue-700",
    skills: [
      { name: "Python", level: "Expert" as const, demand: "Extremely High" as const, color: "#1a6fff" },
      { name: "Java", level: "Intermediate" as const, demand: "High" as const, color: "#f59e0b" },
      { name: "C++", level: "Beginner" as const, demand: "Medium" as const, color: "#ef4444" },
      { name: "JavaScript", level: "Advanced" as const, demand: "Very High" as const, color: "#10b981" },
      { name: "TypeScript", level: "Intermediate" as const, demand: "High" as const, color: "#6366f1" },
    ],
  },
  "AI / ML": {
    icon: "🤖",
    color: "bg-purple-50 text-purple-700",
    skills: [
      { name: "Machine Learning", level: "Advanced" as const, demand: "Extremely High" as const, color: "#1a6fff" },
      { name: "Deep Learning", level: "Intermediate" as const, demand: "Very High" as const, color: "#10b981" },
      { name: "TensorFlow", level: "Advanced" as const, demand: "High" as const, color: "#f59e0b" },
      { name: "PyTorch", level: "Intermediate" as const, demand: "Very High" as const, color: "#6366f1" },
      { name: "Scikit-learn", level: "Advanced" as const, demand: "High" as const, color: "#10b981" },
    ],
  },
  Data: {
    icon: "📊",
    color: "bg-green-50 text-green-700",
    skills: [
      { name: "SQL", level: "Advanced" as const, demand: "Extremely High" as const, color: "#1a6fff" },
      { name: "Pandas", level: "Expert" as const, demand: "Very High" as const, color: "#10b981" },
      { name: "NumPy", level: "Advanced" as const, demand: "High" as const, color: "#6366f1" },
      { name: "Matplotlib", level: "Intermediate" as const, demand: "Medium" as const, color: "#f59e0b" },
    ],
  },
  Cloud: {
    icon: "☁️",
    color: "bg-sky-50 text-sky-700",
    skills: [
      { name: "AWS", level: "Beginner" as const, demand: "Extremely High" as const, color: "#ef4444" },
      { name: "Azure", level: "Beginner" as const, demand: "High" as const, color: "#ef4444" },
      { name: "GCP", level: "Beginner" as const, demand: "Medium" as const, color: "#ef4444" },
      { name: "Docker", level: "Beginner" as const, demand: "Extremely High" as const, color: "#ef4444" },
      { name: "Kubernetes", level: "Beginner" as const, demand: "Very High" as const, color: "#ef4444" },
    ],
  },
  Development: {
    icon: "⚛️",
    color: "bg-indigo-50 text-indigo-700",
    skills: [
      { name: "React", level: "Intermediate" as const, demand: "Very High" as const, color: "#f59e0b" },
      { name: "Next.js", level: "Intermediate" as const, demand: "High" as const, color: "#f59e0b" },
      { name: "FastAPI", level: "Advanced" as const, demand: "High" as const, color: "#10b981" },
      { name: "Git", level: "Expert" as const, demand: "Extremely High" as const, color: "#1a6fff" },
    ],
  },
};

export interface SkillGap {
  skill: string;
  currentLevel: string;
  requiredLevel: string;
  estimatedTime: string;
  priority: "Critical" | "High" | "Medium";
  learningResource: string;
}

export const skillGaps: SkillGap[] = [
  { skill: "Docker", currentLevel: "Beginner", requiredLevel: "Advanced", estimatedTime: "3 weeks", priority: "Critical", learningResource: "Docker Mastery Course" },
  { skill: "Kubernetes", currentLevel: "Beginner", requiredLevel: "Intermediate", estimatedTime: "4 weeks", priority: "Critical", learningResource: "Kubernetes in Action" },
  { skill: "MLflow", currentLevel: "None", requiredLevel: "Intermediate", estimatedTime: "2 weeks", priority: "High", learningResource: "MLflow Official Guide" },
  { skill: "CI/CD", currentLevel: "Beginner", requiredLevel: "Advanced", estimatedTime: "3 weeks", priority: "High", learningResource: "GitHub Actions Tutorial" },
  { skill: "Linux", currentLevel: "Beginner", requiredLevel: "Intermediate", estimatedTime: "2 weeks", priority: "Medium", learningResource: "Linux Command Line Basics" },
  { skill: "System Design", currentLevel: "Beginner", requiredLevel: "Advanced", estimatedTime: "6 weeks", priority: "High", learningResource: "System Design Interview Course" },
];

export interface CareerPath {
  role: string;
  confidence: number;
  salary: string;
  demand: string;
  skillsMatch: number;
}

export const careerPredictions: CareerPath[] = [
  { role: "Machine Learning Engineer", confidence: 91, salary: "₹12-25 LPA", demand: "Very High", skillsMatch: 88 },
  { role: "Data Scientist", confidence: 85, salary: "₹10-22 LPA", demand: "Very High", skillsMatch: 82 },
  { role: "AI Engineer", confidence: 80, salary: "₹15-30 LPA", demand: "High", skillsMatch: 75 },
  { role: "Computer Vision Engineer", confidence: 72, salary: "₹12-28 LPA", demand: "High", skillsMatch: 68 },
  { role: "MLOps Engineer", confidence: 65, salary: "₹18-35 LPA", demand: "Extremely High", skillsMatch: 58 },
];

export interface Certification {
  name: string;
  status: "Completed" | "In Progress" | "Recommended" | "Expired";
  provider: string;
  validUntil?: string;
}

export const certifications: Certification[] = [
  { name: "AWS Solutions Architect", status: "Recommended", provider: "Amazon Web Services" },
  { name: "TensorFlow Developer", status: "In Progress", provider: "Google" },
  { name: "Python for Data Science", status: "Completed", provider: "Coursera" },
  { name: "Deep Learning Specialization", status: "Completed", provider: "deeplearning.ai" },
  { name: "Azure AI Engineer", status: "Expired", provider: "Microsoft", validUntil: "2025-12" },
  { name: "Kubernetes CKA", status: "Recommended", provider: "CNCF" },
];

export interface Milestone {
  date: string;
  title: string;
  description: string;
  achieved: boolean;
  icon: string;
}

export const milestones: Milestone[] = [
  { date: "2026-07-24", title: "Resume Completed", description: "ATS score: 91%", achieved: true, icon: "📄" },
  { date: "2026-07-20", title: "Profile Completed", description: "100% complete", achieved: true, icon: "👤" },
  { date: "2026-07-18", title: "First Interview", description: "Zoho - Full Stack Developer", achieved: true, icon: "🎯" },
  { date: "2026-07-24", title: "First Offer", description: "Amazon - Offer Released", achieved: true, icon: "🎉" },
  { date: "2026-08-01", title: "First Internship", description: "Target: AI/ML Intern", achieved: false, icon: "🚀" },
  { date: "2026-12-01", title: "First Job", description: "Target: ML Engineer", achieved: false, icon: "💼" },
];

export const weeklyChallenge = {
  title: "AI Weekly Challenge",
  tasks: [
    "Complete one FastAPI project with ML model deployment",
    "Solve five advanced SQL problems on LeetCode",
    "Deploy one ML model using Docker on AWS",
    "Practice five behavioral interview questions using STAR method",
    "Read two research papers on transformer architectures",
  ],
  completed: 2,
  total: 5,
  reward: "Earn the 'Consistent Learner' badge",
};

export const aiInsights = [
  "✔ Python is your strongest skill — leverage it in interviews",
  "⚠ Docker will increase your employability by 35% — prioritize learning it",
  "✔ Resume quality is above average — ATS score 91%",
  "⚠ Completing AWS certification can boost your salary by ₹3-5 LPA",
  "✔ Add one more end-to-end ML project with deployment",
  "⚠ System design skills need improvement for senior roles",
  "✔ Your GitHub activity is consistent — good signal for recruiters",
  "⚠ Prepare leadership stories for behavioral interviews",
];
