export interface AssistantType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  gradient: string;
  color: string;
  bgColor: string;
  borderColor: string;
  examplePrompts: string[];
}

export const assistants: AssistantType[] = [
  {
    id: "career-coach",
    title: "Career Coach",
    subtitle: "AI Career Planning",
    description: "Get personalized career guidance, learning roadmaps, and growth strategies tailored to your profile.",
    icon: "🎯",
    gradient: "from-brand-500 to-blue-600",
    color: "text-brand-600",
    bgColor: "bg-brand-50",
    borderColor: "border-brand-200",
    examplePrompts: [
      "What should I learn next to become an AI Engineer?",
      "Create an 8-month career roadmap for me",
      "Which certifications will boost my career?",
      "How do I transition from student to professional?",
      "Analyze my career trajectory and suggest improvements",
    ],
  },
  {
    id: "resume-expert",
    title: "Resume Expert",
    subtitle: "AI Resume Analysis",
    description: "Get your resume reviewed, improve ATS scores, generate cover letters, and optimize your professional story.",
    icon: "📄",
    gradient: "from-green-500 to-emerald-600",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    examplePrompts: [
      "Review my resume and suggest improvements",
      "Improve my ATS score for tech roles",
      "Generate a cover letter for Microsoft",
      "Rewrite my professional summary",
      "What skills am I missing on my resume?",
    ],
  },
  {
    id: "job-advisor",
    title: "Job Advisor",
    subtitle: "AI Job Strategy",
    description: "Find matching jobs, understand job descriptions, compare offers, and make smarter career decisions.",
    icon: "💼",
    gradient: "from-purple-500 to-indigo-600",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    examplePrompts: [
      "Which jobs match my profile best?",
      "Explain this job description in simple terms",
      "Should I apply for this role at Google?",
      "Compare these two job offers for me",
      "What salary should I negotiate for?",
    ],
  },
  {
    id: "interview-mentor",
    title: "Interview Mentor",
    subtitle: "AI Interview Preparation",
    description: "Practice mock interviews, get technical questions, improve communication, and build interview confidence.",
    icon: "🎤",
    gradient: "from-orange-500 to-red-500",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    examplePrompts: [
      "Conduct a mock technical interview for ML role",
      "Ask me 5 Python interview questions",
      "How do I answer 'Tell me about yourself'?",
      "Practice HR interview questions with me",
      "Give me tips for system design interviews",
    ],
  },
];

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  assistantId: string;
  prompt: string;
  color: string;
}

export const quickActions: QuickAction[] = [
  { id: "analyze-resume", label: "Analyze Resume", icon: "📄", assistantId: "resume-expert", prompt: "Analyze my resume and give me a detailed report", color: "bg-green-50 text-green-700 border-green-200" },
  { id: "explain-jd", label: "Explain Job Description", icon: "📋", assistantId: "job-advisor", prompt: "Explain this job description and tell me if I'm a good fit", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { id: "cover-letter", label: "Generate Cover Letter", icon: "✉️", assistantId: "resume-expert", prompt: "Generate a professional cover letter for my target role", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { id: "mock-interview", label: "Interview Practice", icon: "🎤", assistantId: "interview-mentor", prompt: "Start a mock interview session for my upcoming interview", color: "bg-orange-50 text-orange-700 border-orange-200" },
  { id: "career-roadmap", label: "Career Roadmap", icon: "🗺️", assistantId: "career-coach", prompt: "Create a detailed career roadmap for the next 12 months", color: "bg-brand-50 text-brand-700 border-brand-200" },
  { id: "salary-estimator", label: "Salary Estimator", icon: "💰", assistantId: "job-advisor", prompt: "Estimate my market salary based on my skills and experience", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  { id: "learning-plan", label: "Learning Plan", icon: "📚", assistantId: "career-coach", prompt: "Create a personalized learning plan for the next 3 months", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  { id: "skill-gap", label: "Skill Gap Analysis", icon: "🎯", assistantId: "career-coach", prompt: "Analyze my skill gaps for Machine Learning Engineer role", color: "bg-red-50 text-red-700 border-red-200" },
];

export interface CareerHealth {
  category: string;
  score: number;
  color: string;
}

export const careerHealth: CareerHealth[] = [
  { category: "Career Health", score: 92, color: "#1a6fff" },
  { category: "Resume Quality", score: 89, color: "#10b981" },
  { category: "Interview Readiness", score: 84, color: "#f59e0b" },
  { category: "Employability", score: 91, color: "#6c5ce7" },
  { category: "Project Quality", score: 88, color: "#06b6d4" },
  { category: "Skill Strength", score: 94, color: "#10b981" },
];

export const todayRecommendations = [
  { task: "Complete Docker fundamentals course", benefit: "+8% Employability", time: "6 Hours", priority: "High" as const, icon: "🐳" },
  { task: "Update resume with latest project", benefit: "+5% ATS Score", time: "1 Hour", priority: "High" as const, icon: "📄" },
  { task: "Practice 10 SQL interview questions", benefit: "+12% Interview Readiness", time: "2 Hours", priority: "Medium" as const, icon: "💻" },
];

export const weeklyGoals = [
  { task: "Finish SQL revision", done: true },
  { task: "Update resume with RakNova project", done: true },
  { task: "Practice HR interview questions", done: false },
  { task: "Complete FastAPI project deployment", done: false },
  { task: "Upload AWS certification", done: false },
];

export const knowledgeLibrary = [
  { category: "Resume", icon: "📄", color: "bg-green-50 text-green-700", articles: ["ATS Optimization Guide", "Cover Letter Templates", "Resume Action Verbs"] },
  { category: "Interview", icon: "🎤", color: "bg-orange-50 text-orange-700", articles: ["STAR Method Guide", "Technical Interview Prep", "HR Questions Masterlist"] },
  { category: "Career", icon: "🎯", color: "bg-brand-50 text-brand-700", articles: ["Career Pivot Guide", "Salary Negotiation Tips", "Personal Branding 101"] },
  { category: "Skills", icon: "⚡", color: "bg-purple-50 text-purple-700", articles: ["Top Skills 2026", "Learning Path: AI/ML", "Certification Guide"] },
  { category: "Projects", icon: "🔧", color: "bg-blue-50 text-blue-700", articles: ["Portfolio Building", "GitHub Profile Tips", "Project Documentation"] },
  { category: "Salary", icon: "💰", color: "bg-yellow-50 text-yellow-700", articles: ["Market Salary Report", "Offer Evaluation", "Negotiation Scripts"] },
];

export const savedConversations = [
  { id: 1, title: "Resume Review Session", assistant: "Resume Expert", date: "2026-07-24", preview: "Your resume ATS score is 89%. Here are 3 improvements..." },
  { id: 2, title: "Mock Technical Interview", assistant: "Interview Mentor", date: "2026-07-23", preview: "You answered 8/10 questions correctly. Focus on system design..." },
  { id: 3, title: "Career Roadmap Planning", assistant: "Career Coach", date: "2026-07-21", preview: "Based on your profile, here's a 6-month roadmap to AI Engineer..." },
  { id: 4, title: "Cover Letter Generation", assistant: "Resume Expert", date: "2026-07-20", preview: "Here's your customized cover letter for the Microsoft position..." },
];

export const assistantHistory = [
  { date: "Yesterday", sessions: [{ title: "Resume Review", assistant: "Resume Expert", time: "3:00 PM" }] },
  { date: "Monday", sessions: [{ title: "Interview Practice", assistant: "Interview Mentor", time: "11:00 AM" }, { title: "Job Search Strategy", assistant: "Job Advisor", time: "2:00 PM" }] },
  { date: "Saturday", sessions: [{ title: "Career Planning", assistant: "Career Coach", time: "10:00 AM" }] },
];

export const achievements = [
  { title: "Resume Master", description: "Completed 3 resume reviews", earned: true, icon: "📄" },
  { title: "Interview Ready", description: "Practiced 5 mock interviews", earned: true, icon: "🎤" },
  { title: "Profile Pro", description: "Profile strength above 90%", earned: true, icon: "⭐" },
  { title: "Career Visionary", description: "Career health above 90%", earned: true, icon: "🔮" },
  { title: "Learning Champion", description: "Complete 10 learning goals", earned: false, icon: "🏆" },
  { title: "Job Hunter", description: "Apply to 20 matching jobs", earned: false, icon: "💼" },
];

export const careerInsights = {
  strongestArea: "Machine Learning",
  weakestArea: "Cloud Computing",
  industryDemand: "Very High",
  expectedSalary: "₹8–12 LPA",
  interviewReadiness: 86,
};
