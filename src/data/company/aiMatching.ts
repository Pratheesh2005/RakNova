export interface JobOpening {
  id: number;
  title: string;
  department: string;
}

export interface RecommendedCandidate {
  id: number;
  name: string;
  matchPercentage: number;
  resumeScore: number;
  experience: string;
  keySkills: string[];
  education: string;
  currentStage: string;
  recommendation: string; // e.g., "Interview Immediately", "Strong Candidate", etc.
  matchBreakdown: {
    technicalSkills: number;
    projects: number;
    experience: number;
    education: number;
    resumeQuality: number;
    portfolio: number;
  };
  reasons: string[];
  risks: string[];
  recommendedAction: string;
  expectedSalary: string;
  noticePeriod: string;
}

export const jobOpenings: JobOpening[] = [
  { id: 1, title: "Senior Frontend Developer", department: "Engineering" },
  { id: 2, title: "ML Engineer", department: "AI/ML" },
  { id: 3, title: "DevOps Engineer", department: "Infrastructure" },
  { id: 4, title: "Product Designer", department: "Design" },
  { id: 5, title: "Backend Developer", department: "Engineering" },
];

// Dummy recommended candidates for a given job (selected via dropdown)
// We'll generate different sets based on job id, but for simplicity, we'll have a master list and filter.
export const allRecommendedCandidates: Record<number, RecommendedCandidate[]> = {
  1: [
    {
      id: 101,
      name: "Priya Sharma",
      matchPercentage: 94,
      resumeScore: 89,
      experience: "5 years",
      keySkills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      education: "B.Tech Computer Science",
      currentStage: "Under Review",
      recommendation: "Interview Immediately",
      matchBreakdown: {
        technicalSkills: 95,
        projects: 92,
        experience: 85,
        education: 90,
        resumeQuality: 88,
        portfolio: 93,
      },
      reasons: [
        "Strong React & TypeScript skills",
        "Excellent portfolio with 3 production apps",
        "Matches required experience level",
        "Good GitHub activity",
      ],
      risks: ["Limited Docker experience"],
      recommendedAction: "Proceed to Technical Interview",
      expectedSalary: "₹18,00,000",
      noticePeriod: "30 days",
    },
    {
      id: 102,
      name: "Rahul Verma",
      matchPercentage: 88,
      resumeScore: 82,
      experience: "4 years",
      keySkills: ["React", "JavaScript", "Redux", "SASS"],
      education: "B.E. Computer Science",
      currentStage: "Applied",
      recommendation: "Strong Candidate",
      matchBreakdown: {
        technicalSkills: 80,
        projects: 85,
        experience: 88,
        education: 85,
        resumeQuality: 80,
        portfolio: 78,
      },
      reasons: [
        "Solid React experience",
        "Good understanding of state management",
        "Previous experience in similar role",
      ],
      risks: ["No TypeScript knowledge", "Limited Next.js exposure"],
      recommendedAction: "Schedule Technical Screening",
      expectedSalary: "₹15,00,000",
      noticePeriod: "Immediate",
    },
  ],
  2: [
    {
      id: 201,
      name: "Arun Kumar",
      matchPercentage: 91,
      resumeScore: 92,
      experience: "3 years",
      keySkills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn"],
      education: "M.Tech AI & ML",
      currentStage: "Shortlisted",
      recommendation: "Interview Immediately",
      matchBreakdown: {
        technicalSkills: 92,
        projects: 90,
        experience: 82,
        education: 95,
        resumeQuality: 91,
        portfolio: 88,
      },
      reasons: [
        "Strong ML fundamentals",
        "Relevant project experience",
        "Good resume formatting",
      ],
      risks: ["Kubernetes knowledge missing"],
      recommendedAction: "Schedule Technical Interview",
      expectedSalary: "₹15,00,000",
      noticePeriod: "Immediate",
    },
    {
      id: 202,
      name: "Sneha Reddy",
      matchPercentage: 78,
      resumeScore: 75,
      experience: "4 years",
      keySkills: ["Python", "TensorFlow", "Keras", "SQL"],
      education: "B.Sc. Data Science",
      currentStage: "Applied",
      recommendation: "Needs Manual Review",
      matchBreakdown: {
        technicalSkills: 70,
        projects: 75,
        experience: 80,
        education: 70,
        resumeQuality: 72,
        portfolio: 68,
      },
      reasons: [
        "Has foundational ML skills",
        "Some relevant project experience",
      ],
      risks: [
        "Limited deep learning experience",
        "Resume lacks quantifiable achievements",
      ],
      recommendedAction: "Review after technical screening",
      expectedSalary: "₹12,00,000",
      noticePeriod: "60 days",
    },
  ],
  3: [
    {
      id: 301,
      name: "Vikram Singh",
      matchPercentage: 86,
      resumeScore: 88,
      experience: "5 years",
      keySkills: ["AWS", "Terraform", "Kubernetes", "Docker"],
      education: "B.E. Computer Science",
      currentStage: "Shortlisted",
      recommendation: "Interview Immediately",
      matchBreakdown: {
        technicalSkills: 90,
        projects: 85,
        experience: 88,
        education: 85,
        resumeQuality: 86,
        portfolio: 82,
      },
      reasons: [
        "Certified AWS Solutions Architect",
        "Hands-on Terraform & Kubernetes experience",
        "Good CI/CD pipeline experience",
      ],
      risks: ["Limited scripting skills"],
      recommendedAction: "Proceed to Technical Interview",
      expectedSalary: "₹20,00,000",
      noticePeriod: "15 days",
    },
  ],
  4: [
    {
      id: 401,
      name: "Anita Desai",
      matchPercentage: 82,
      resumeScore: 80,
      experience: "2 years",
      keySkills: ["Figma", "User Research", "Prototyping", "UI Design"],
      education: "B.Des Interaction Design",
      currentStage: "Applied",
      recommendation: "Strong Candidate",
      matchBreakdown: {
        technicalSkills: 75,
        projects: 85,
        experience: 70,
        education: 88,
        resumeQuality: 78,
        portfolio: 90,
      },
      reasons: [
        "Strong design portfolio",
        "User-centered design approach",
      ],
      risks: ["Limited experience with design systems"],
      recommendedAction: "Shortlist for portfolio review",
      expectedSalary: "₹10,00,000",
      noticePeriod: "30 days",
    },
  ],
  5: [
    {
      id: 501,
      name: "Rahul Mehta",
      matchPercentage: 88,
      resumeScore: 85,
      experience: "6 years",
      keySkills: ["Node.js", "PostgreSQL", "GraphQL", "Docker"],
      education: "M.Sc. Computer Science",
      currentStage: "Interview Scheduled",
      recommendation: "Interview Immediately",
      matchBreakdown: {
        technicalSkills: 90,
        projects: 85,
        experience: 92,
        education: 88,
        resumeQuality: 84,
        portfolio: 80,
      },
      reasons: [
        "Extensive backend experience",
        "Strong database design skills",
        "Positive interview feedback",
      ],
      risks: [],
      recommendedAction: "Proceed to final HR round",
      expectedSalary: "₹20,00,000",
      noticePeriod: "15 days",
    },
  ],
};

export const aiHighlightsData = (candidates: RecommendedCandidate[]) => {
  const highlyRecommended = candidates.filter(c => c.matchPercentage >= 90).length;
  const excellentMatches = candidates.filter(c => c.matchPercentage >= 80 && c.matchPercentage < 90).length;
  const strongMatches = candidates.filter(c => c.matchPercentage >= 70 && c.matchPercentage < 80).length;
  const needsReview = candidates.filter(c => c.matchPercentage < 70).length;
  const avgMatch = candidates.length ? Math.round(candidates.reduce((sum, c) => sum + c.matchPercentage, 0) / candidates.length) : 0;

  return { highlyRecommended, excellentMatches, strongMatches, needsReview, avgMatch };
};
