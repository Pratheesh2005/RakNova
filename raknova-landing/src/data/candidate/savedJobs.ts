export interface SavedJob {
  id: number;
  company: string;
  companyLogo: string;
  position: string;
  location: string;
  workType: "Remote" | "Hybrid" | "On-site";
  jobType: "Full Time" | "Part Time" | "Internship" | "Contract" | "Freelance";
  experience: string;
  salaryMin: number;
  salaryMax: number;
  matchPercentage: number;
  requiredSkills: string[];
  postedDate: string;
  deadline: string;
  companyRating: number;
  savedDate: string;
  hasApplied: boolean;
  aiInsights: {
    skillMatches: string[];
    resumeSuitable: boolean;
    hiringProbability: string;
    recommendedAction: string;
  };
  benefits: string[];
  hiringSpeed: string;
  description: string;
}

export const savedJobs: SavedJob[] = [
  {
    id: 1,
    company: "TechCorp",
    companyLogo: "/company-logos/techcorp.png",
    position: "Senior Frontend Developer",
    location: "Bangalore",
    workType: "Hybrid",
    jobType: "Full Time",
    experience: "3–5 Years",
    salaryMin: 1200000,
    salaryMax: 1800000,
    matchPercentage: 95,
    requiredSkills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    postedDate: "2026-07-20T00:00:00Z",
    deadline: "2026-08-15T00:00:00Z",
    companyRating: 4.5,
    savedDate: "2026-07-24T10:30:00Z",
    hasApplied: false,
    aiInsights: {
      skillMatches: ["React", "TypeScript", "Next.js"],
      resumeSuitable: true,
      hiringProbability: "Very High",
      recommendedAction: "Apply immediately — this job matches your profile exceptionally well.",
    },
    benefits: ["Health Insurance", "Stock Options", "Flexible Hours", "Learning Budget"],
    hiringSpeed: "Fast (1-2 weeks)",
    description: "Join our core engineering team to build next-generation web applications serving millions of users.",
  },
  {
    id: 2,
    company: "CloudNine",
    companyLogo: "/company-logos/cloudnine.png",
    position: "Full Stack Developer",
    location: "Remote",
    workType: "Remote",
    jobType: "Full Time",
    experience: "1–2 Years",
    salaryMin: 800000,
    salaryMax: 1400000,
    matchPercentage: 88,
    requiredSkills: ["Node.js", "React", "PostgreSQL", "AWS"],
    postedDate: "2026-07-21T00:00:00Z",
    deadline: "2026-08-20T00:00:00Z",
    companyRating: 4.3,
    savedDate: "2026-07-23T15:00:00Z",
    hasApplied: false,
    aiInsights: {
      skillMatches: ["React", "Node.js"],
      resumeSuitable: true,
      hiringProbability: "High",
      recommendedAction: "Apply this week — good match with growth potential.",
    },
    benefits: ["Remote-First", "Stock Options", "Annual Retreats", "Home Office Budget"],
    hiringSpeed: "Moderate (2-3 weeks)",
    description: "Build scalable cloud-native applications in a fast-paced startup environment.",
  },
  {
    id: 3,
    company: "DataFlow Inc.",
    companyLogo: "/company-logos/dataflow.png",
    position: "React Developer",
    location: "Chennai",
    workType: "On-site",
    jobType: "Full Time",
    experience: "3–5 Years",
    salaryMin: 1000000,
    salaryMax: 1600000,
    matchPercentage: 82,
    requiredSkills: ["React", "JavaScript", "Redux", "CSS"],
    postedDate: "2026-07-19T00:00:00Z",
    deadline: "2026-07-28T00:00:00Z",
    companyRating: 4.1,
    savedDate: "2026-07-22T09:00:00Z",
    hasApplied: true,
    aiInsights: {
      skillMatches: ["React", "JavaScript"],
      resumeSuitable: true,
      hiringProbability: "High",
      recommendedAction: "You've already applied. Prepare for the interview.",
    },
    benefits: ["Health Insurance", "Performance Bonus", "Gym Membership", "Free Parking"],
    hiringSpeed: "Fast (1-2 weeks)",
    description: "Work on data visualization dashboards serving enterprise clients.",
  },
  {
    id: 4,
    company: "WebWorks",
    companyLogo: "/company-logos/webworks.png",
    position: "Frontend Engineer",
    location: "Remote",
    workType: "Remote",
    jobType: "Full Time",
    experience: "1–2 Years",
    salaryMin: 700000,
    salaryMax: 1200000,
    matchPercentage: 78,
    requiredSkills: ["Vue.js", "TypeScript", "SASS", "Jest"],
    postedDate: "2026-07-18T00:00:00Z",
    deadline: "2026-08-10T00:00:00Z",
    companyRating: 4.6,
    savedDate: "2026-07-21T11:00:00Z",
    hasApplied: false,
    aiInsights: {
      skillMatches: ["TypeScript"],
      resumeSuitable: true,
      hiringProbability: "Moderate",
      recommendedAction: "Add Vue.js to your skills before applying for higher chances.",
    },
    benefits: ["Fully Remote", "Flexible Schedule", "Conference Budget", "Profit Sharing"],
    hiringSpeed: "Moderate (2-3 weeks)",
    description: "Create beautiful, accessible user interfaces for our SaaS platform.",
  },
  {
    id: 5,
    company: "FinanceHub",
    companyLogo: "/company-logos/financehub.png",
    position: "Frontend Developer",
    location: "Mumbai",
    workType: "On-site",
    jobType: "Full Time",
    experience: "3–5 Years",
    salaryMin: 1500000,
    salaryMax: 2200000,
    matchPercentage: 85,
    requiredSkills: ["Angular", "TypeScript", "RxJS", "SCSS"],
    postedDate: "2026-07-17T00:00:00Z",
    deadline: "2026-07-30T00:00:00Z",
    companyRating: 4.4,
    savedDate: "2026-07-24T08:00:00Z",
    hasApplied: false,
    aiInsights: {
      skillMatches: ["TypeScript"],
      resumeSuitable: false,
      hiringProbability: "Moderate",
      recommendedAction: "Your resume needs Angular experience. Consider upskilling before applying.",
    },
    benefits: ["Industry-Leading Salary", "Annual Bonus 30%", "Stock Options", "Life Insurance"],
    hiringSpeed: "Slow (3-4 weeks)",
    description: "Build the next generation of our fintech platform for institutional investors.",
  },
  {
    id: 6,
    company: "AILabs",
    companyLogo: "/company-logos/ailabs.png",
    position: "ML Engineer Intern",
    location: "Bangalore",
    workType: "On-site",
    jobType: "Internship",
    experience: "Fresher",
    salaryMin: 300000,
    salaryMax: 500000,
    matchPercentage: 65,
    requiredSkills: ["Python", "TensorFlow", "Pandas", "NumPy"],
    postedDate: "2026-07-22T00:00:00Z",
    deadline: "2026-07-27T00:00:00Z",
    companyRating: 4.7,
    savedDate: "2026-07-24T14:00:00Z",
    hasApplied: false,
    aiInsights: {
      skillMatches: ["Python"],
      resumeSuitable: true,
      hiringProbability: "Moderate",
      recommendedAction: "Deadline approaching in 3 days! Apply now.",
    },
    benefits: ["Monthly Stipend ₹40,000", "Free Meals", "Mentorship", "PPO Opportunity"],
    hiringSpeed: "Fast (1 week)",
    description: "6-month internship working on cutting-edge computer vision models.",
  },
];

export function formatSalaryINR(min: number, max: number): string {
  const formatNum = (n: number) => {
    if (n >= 1000000) return `₹${(n / 100000).toFixed(0)} LPA`;
    return `₹${(n / 1000).toFixed(0)}K`;
  };
  return `${formatNum(min)} – ${formatNum(max)}`;
}

export function getDaysUntilDeadline(deadline: string): number {
  const now = new Date();
  const dl = new Date(deadline);
  return Math.ceil((dl.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function getSavedTimeLabel(date: string): string {
  const now = new Date();
  const saved = new Date(date);
  const diffDays = Math.floor((now.getTime() - saved.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Saved Today";
  if (diffDays === 1) return "Saved Yesterday";
  if (diffDays <= 7) return "Saved Last Week";
  if (diffDays <= 30) return "Saved This Month";
  return "Saved Earlier";
}
