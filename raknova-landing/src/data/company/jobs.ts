export interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  workMode: string;
  salaryMin: number;
  salaryMax: number;
  experience: string;
  openings: number;
  applications: number;
  aiQualified: number;
  status: "Draft" | "Active" | "Paused" | "Closed";
  closingDate: string;
  hiringManager: string;
  postedDate: string;
  responsibilities: string[];
  requirements: string[];
  preferredSkills: string[];
  benefits: string[];
  requiredSkills: string[];
  education: string;
  languages: string[];
  interviewProcess: string[];
  visibility: "Public" | "Internal";
}

export const jobs: Job[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Bangalore",
    employmentType: "Full-time",
    workMode: "Hybrid",
    salaryMin: 1200000,
    salaryMax: 1800000,
    experience: "3-5 years",
    openings: 2,
    applications: 87,
    aiQualified: 34,
    status: "Active",
    closingDate: "2026-08-15",
    hiringManager: "Rajesh Kumar",
    postedDate: "2026-07-15",
    responsibilities: [
      "Develop and maintain complex frontend applications using React and TypeScript",
      "Collaborate with UX designers to implement pixel-perfect interfaces",
      "Optimize application performance and accessibility",
      "Mentor junior developers",
    ],
    requirements: [
      "3+ years of experience with React",
      "Strong TypeScript skills",
      "Experience with state management (Redux, Zustand)",
      "Understanding of CI/CD pipelines",
    ],
    preferredSkills: ["Next.js", "GraphQL", "Docker"],
    benefits: [
      "Health insurance",
      "Stock options",
      "Flexible hours",
      "Learning budget",
    ],
    requiredSkills: ["React", "TypeScript", "JavaScript", "CSS"],
    education: "Bachelor's in Computer Science or related field",
    languages: ["English"],
    interviewProcess: [
      "Phone screen",
      "Technical interview",
      "System design",
      "HR interview",
    ],
    visibility: "Public",
  },
  {
    id: 2,
    title: "ML Engineer",
    department: "AI/ML",
    location: "Remote",
    employmentType: "Full-time",
    workMode: "Remote",
    salaryMin: 1500000,
    salaryMax: 2200000,
    experience: "4-6 years",
    openings: 1,
    applications: 124,
    aiQualified: 52,
    status: "Active",
    closingDate: "2026-08-20",
    hiringManager: "Anita Desai",
    postedDate: "2026-07-10",
    responsibilities: [
      "Design and train machine learning models",
      "Deploy models to production",
      "Monitor model performance",
    ],
    requirements: [
      "Python proficiency",
      "TensorFlow/PyTorch experience",
      "Understanding of MLOps",
    ],
    preferredSkills: ["Kubernetes", "Docker", "AWS"],
    benefits: [
      "Remote work",
      "Stock options",
      "Conference budget",
    ],
    requiredSkills: ["Python", "TensorFlow", "MLOps"],
    education: "Master's in CS, AI, or related",
    languages: ["English"],
    interviewProcess: [
      "ML theory interview",
      "Coding challenge",
      "System design",
      "HR",
    ],
    visibility: "Public",
  },
  {
    id: 3,
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Hyderabad",
    employmentType: "Full-time",
    workMode: "On-site",
    salaryMin: 1000000,
    salaryMax: 1500000,
    experience: "2-4 years",
    openings: 1,
    applications: 56,
    aiQualified: 18,
    status: "Active",
    closingDate: "2026-08-10",
    hiringManager: "Vikram Singh",
    postedDate: "2026-07-20",
    responsibilities: [
      "Manage cloud infrastructure",
      "Implement CI/CD pipelines",
      "Ensure system reliability",
    ],
    requirements: [
      "AWS/GCP experience",
      "Terraform",
      "Kubernetes",
    ],
    preferredSkills: ["Docker", "Python", "Bash"],
    benefits: [
      "Health insurance",
      "Provident fund",
    ],
    requiredSkills: ["AWS", "Terraform", "Kubernetes"],
    education: "Bachelor's degree",
    languages: ["English"],
    interviewProcess: [
      "Technical interview",
      "Practical exercise",
      "HR",
    ],
    visibility: "Public",
  },
  {
    id: 4,
    title: "Product Designer",
    department: "Design",
    location: "Bangalore",
    employmentType: "Full-time",
    workMode: "Hybrid",
    salaryMin: 900000,
    salaryMax: 1400000,
    experience: "2-5 years",
    openings: 1,
    applications: 43,
    aiQualified: 15,
    status: "Active",
    closingDate: "2026-08-25",
    hiringManager: "Priya Sharma",
    postedDate: "2026-07-22",
    responsibilities: [
      "Design user interfaces",
      "Conduct user research",
    ],
    requirements: [
      "Figma expertise",
      "Portfolio required",
    ],
    preferredSkills: ["Prototyping", "User testing"],
    benefits: [
      "Creative environment",
      "Health benefits",
    ],
    requiredSkills: ["Figma", "UI/UX"],
    education: "Design degree or equivalent",
    languages: ["English"],
    interviewProcess: [
      "Portfolio review",
      "Design exercise",
      "HR",
    ],
    visibility: "Public",
  },
  {
    id: 5,
    title: "Backend Developer",
    department: "Engineering",
    location: "Pune",
    employmentType: "Full-time",
    workMode: "Hybrid",
    salaryMin: 1100000,
    salaryMax: 1700000,
    experience: "3-5 years",
    openings: 2,
    applications: 98,
    aiQualified: 41,
    status: "Active",
    closingDate: "2026-08-18",
    hiringManager: "Rahul Mehta",
    postedDate: "2026-07-18",
    responsibilities: [
      "Develop RESTful APIs",
      "Database design",
    ],
    requirements: [
      "Node.js or Python",
      "PostgreSQL",
    ],
    preferredSkills: ["GraphQL", "Docker"],
    benefits: [
      "Health insurance",
      "Flexible timing",
    ],
    requiredSkills: ["Node.js", "PostgreSQL"],
    education: "Bachelor's in CS",
    languages: ["English"],
    interviewProcess: [
      "Coding test",
      "System design",
      "HR",
    ],
    visibility: "Public",
  },
  {
    id: 6,
    title: "Data Analyst",
    department: "Analytics",
    location: "Remote",
    employmentType: "Full-time",
    workMode: "Remote",
    salaryMin: 700000,
    salaryMax: 1100000,
    experience: "1-3 years",
    openings: 1,
    applications: 67,
    aiQualified: 23,
    status: "Draft",
    closingDate: "",
    hiringManager: "Sneha Reddy",
    postedDate: "2026-07-25",
    responsibilities: [
      "Analyze data",
      "Create reports",
    ],
    requirements: [
      "SQL",
      "Python",
    ],
    preferredSkills: ["Tableau", "Power BI"],
    benefits: [],
    requiredSkills: ["SQL", "Python"],
    education: "Any graduate",
    languages: ["English"],
    interviewProcess: [],
    visibility: "Internal",
  },
];

export interface JobStat {
  label: string;
  value: number;
  change: number;
}

export const jobStats: JobStat[] = [
  { label: "Active Jobs", value: 5, change: 2 },
  { label: "Draft Jobs", value: 1, change: 0 },
  { label: "Paused Jobs", value: 0, change: 0 },
  { label: "Closed Jobs", value: 0, change: 0 },
  { label: "Applications Received", value: 475, change: 12 },
  { label: "Jobs Closing Soon", value: 2, change: -1 },
];

export const aiInsightsForJobs = [
  {
    observation:
      "Only 18% of applicants meet the required Python experience for ML Engineer.",
    reason:
      "The required experience is set to 4-6 years; many strong candidates have 2-3 years.",
    recommendation:
      "Reduce required experience from 4-6 years to 2-4 years.",
  },
  {
    observation:
      "No candidates matched Kubernetes for DevOps Engineer.",
    reason:
      "Kubernetes is listed as a required skill; it's not common among early-career DevOps applicants.",
    recommendation:
      "Remove Kubernetes from required skills or widen search to include candidates willing to learn.",
  },
  {
    observation:
      "Application rate for Product Designer is below average.",
    reason:
      "The salary range is 12% lower than market for the given experience.",
    recommendation:
      "Increase salary range by 10-15% and promote the role on design communities.",
  },
];
