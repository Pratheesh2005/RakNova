export type ApplicationStage =
  | "Applied"
  | "Resume Reviewed"
  | "AI Screening"
  | "HR Shortlisted"
  | "Technical Round"
  | "Manager Round"
  | "HR Discussion"
  | "Offer"
  | "Hired"
  | "Rejected";

export interface TimelineEvent {
  date: string;
  time: string;
  status: string;
  icon: string;
  description: string;
}

export interface Application {
  id: number;
  applicationId: string;
  company: string;
  companyLogo: string;
  position: string;
  location: string;
  workType: "Remote" | "Hybrid" | "On-site";
  salaryMin: number;
  salaryMax: number;
  appliedDate: string;
  currentStage: ApplicationStage;
  aiMatch: number;
  priority: "High" | "Medium" | "Low";
  recruiterName: string;
  expectedResponse: string;
  aiInsights: {
    chances: string;
    reason: string[];
    recommendedActions: string[];
    offerProbability: number;
    confidence: string;
  };
  timeline: TimelineEvent[];
  recruiterFeedback?: {
    strengths: string[];
    improvements: string[];
  };
  interview?: {
    type: string;
    date: string;
    time: string;
    preparationTips: string[];
    estimatedPrepTime: string;
  };
  documents: {
    resume: string;
    coverLetter?: string;
    portfolio?: string;
    certificates?: string[];
    linkedin?: string;
    github?: string;
  };
  notifications: {
    message: string;
    time: string;
    type: "view" | "shortlist" | "interview" | "document" | "reject" | "offer";
  }[];
}

export const applications: Application[] = [
  {
    id: 1,
    applicationId: "RN-2026-001",
    company: "Microsoft",
    companyLogo: "/company-logos/microsoft.png",
    position: "Senior Frontend Developer",
    location: "Bangalore",
    workType: "Hybrid",
    salaryMin: 2500000,
    salaryMax: 4000000,
    appliedDate: "2026-07-20T09:30:00Z",
    currentStage: "Technical Round",
    aiMatch: 94,
    priority: "High",
    recruiterName: "Priya Sharma",
    expectedResponse: "2-3 days",
    aiInsights: {
      chances: "Very High",
      reason: [
        "Resume strongly matches job requirements",
        "Portfolio demonstrates relevant projects",
        "Required skills completed with high proficiency",
        "Previous interview feedback was positive",
      ],
      recommendedActions: [
        "Review system design concepts",
        "Prepare questions about Microsoft's tech stack",
        "Update GitHub with recent contributions",
      ],
      offerProbability: 84,
      confidence: "High",
    },
    timeline: [
      { date: "2026-07-20", time: "09:30 AM", status: "Applied", icon: "📤", description: "Application submitted successfully" },
      { date: "2026-07-21", time: "11:00 AM", status: "Viewed", icon: "👁️", description: "Recruiter Priya Sharma viewed your application" },
      { date: "2026-07-21", time: "03:00 PM", status: "Resume Downloaded", icon: "📥", description: "Your resume was downloaded" },
      { date: "2026-07-22", time: "10:00 AM", status: "Shortlisted", icon: "⭐", description: "You were shortlisted for the next round" },
      { date: "2026-07-23", time: "02:00 PM", status: "Interview Scheduled", icon: "📅", description: "Technical interview scheduled" },
    ],
    recruiterFeedback: {
      strengths: ["Excellent resume formatting", "Strong React & TypeScript skills", "Good open source contributions", "Relevant project experience"],
      improvements: ["Add more system design experience", "Include cloud deployment examples", "Prepare behavioral interview answers"],
    },
    interview: {
      type: "Technical Round",
      date: "2026-07-28",
      time: "10:30 AM",
      preparationTips: [
        "Practice React performance optimization",
        "Review TypeScript advanced patterns",
        "Prepare system design for scalable frontends",
        "Review your past projects for discussion",
      ],
      estimatedPrepTime: "4 hours",
    },
    documents: {
      resume: "John_Doe_Resume_v3.pdf",
      coverLetter: "Cover_Letter_Microsoft.pdf",
      portfolio: "https://johndoe.dev",
      certificates: ["AWS Solutions Architect", "Google Professional Cloud Developer"],
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
    },
    notifications: [
      { message: "Microsoft viewed your application", time: "2026-07-21T11:00:00Z", type: "view" },
      { message: "Microsoft shortlisted you", time: "2026-07-22T10:00:00Z", type: "shortlist" },
      { message: "Technical interview scheduled with Microsoft", time: "2026-07-23T14:00:00Z", type: "interview" },
    ],
  },
  {
    id: 2,
    applicationId: "RN-2026-002",
    company: "Google",
    companyLogo: "/company-logos/google.png",
    position: "Frontend Engineer",
    location: "Hyderabad",
    workType: "On-site",
    salaryMin: 2200000,
    salaryMax: 3500000,
    appliedDate: "2026-07-18T14:00:00Z",
    currentStage: "HR Discussion",
    aiMatch: 89,
    priority: "High",
    recruiterName: "Rahul Mehta",
    expectedResponse: "1 week",
    aiInsights: {
      chances: "High",
      reason: [
        "Profile matches 89% of requirements",
        "Strong algorithmic skills demonstrated",
        "Good performance in technical rounds",
        "Culture fit assessment passed",
      ],
      recommendedActions: [
        "Prepare salary negotiation points",
        "Research Google's team structure",
        "Prepare questions about work culture",
      ],
      offerProbability: 76,
      confidence: "High",
    },
    timeline: [
      { date: "2026-07-18", time: "02:00 PM", status: "Applied", icon: "📤", description: "Application submitted" },
      { date: "2026-07-19", time: "09:00 AM", status: "AI Screening", icon: "🤖", description: "Passed AI resume screening" },
      { date: "2026-07-20", time: "04:00 PM", status: "Technical Round", icon: "💻", description: "Completed technical assessment" },
      { date: "2026-07-22", time: "11:00 AM", status: "Manager Round", icon: "👔", description: "Completed manager interview" },
      { date: "2026-07-24", time: "03:00 PM", status: "HR Discussion", icon: "🤝", description: "HR discussion in progress" },
    ],
    recruiterFeedback: {
      strengths: ["Strong problem-solving skills", "Excellent communication", "Deep JavaScript knowledge", "Good system design approach"],
      improvements: ["Work on leadership examples", "Prepare more data-driven achievements"],
    },
    interview: {
      type: "HR Discussion",
      date: "2026-07-26",
      time: "11:00 AM",
      preparationTips: [
        "Prepare salary expectations",
        "Research Google benefits and perks",
        "Prepare questions about team allocation",
        "Review your career goals and timeline",
      ],
      estimatedPrepTime: "2 hours",
    },
    documents: {
      resume: "John_Doe_Resume_v3.pdf",
      coverLetter: "Cover_Letter_Google.pdf",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
    },
    notifications: [
      { message: "Google completed your technical assessment", time: "2026-07-20T16:00:00Z", type: "interview" },
      { message: "Google scheduled HR discussion", time: "2026-07-24T15:00:00Z", type: "interview" },
    ],
  },
  {
    id: 3,
    applicationId: "RN-2026-003",
    company: "Amazon",
    companyLogo: "/company-logos/amazon.png",
    position: "SDE II - Frontend",
    location: "Chennai",
    workType: "Hybrid",
    salaryMin: 2000000,
    salaryMax: 3200000,
    appliedDate: "2026-07-15T10:00:00Z",
    currentStage: "Offer",
    aiMatch: 91,
    priority: "High",
    recruiterName: "Anita Desai",
    expectedResponse: "Awaiting offer letter",
    aiInsights: {
      chances: "Excellent",
      reason: [
        "Exceptional performance in all interview rounds",
        "Strong leadership principles demonstrated",
        "Technical skills exceed requirements",
        "Bar raiser interview completed successfully",
      ],
      recommendedActions: [
        "Review offer letter carefully",
        "Prepare for negotiation if needed",
        "Complete background verification documents",
      ],
      offerProbability: 95,
      confidence: "Very High",
    },
    timeline: [
      { date: "2026-07-15", time: "10:00 AM", status: "Applied", icon: "📤", description: "Application submitted" },
      { date: "2026-07-16", time: "02:00 PM", status: "Resume Reviewed", icon: "📋", description: "Resume shortlisted by recruiter" },
      { date: "2026-07-18", time: "10:00 AM", status: "Technical Round 1", icon: "💻", description: "Completed DSA & Frontend round" },
      { date: "2026-07-20", time: "11:00 AM", status: "Technical Round 2", icon: "💻", description: "Completed system design round" },
      { date: "2026-07-22", time: "03:00 PM", status: "Bar Raiser", icon: "🌟", description: "Completed bar raiser interview" },
      { date: "2026-07-24", time: "05:00 PM", status: "Offer", icon: "🎉", description: "Offer released - Congratulations!" },
    ],
    recruiterFeedback: {
      strengths: ["Outstanding technical skills", "Excellent leadership principles", "Strong customer obsession", "Great cultural fit"],
      improvements: [],
    },
    documents: {
      resume: "John_Doe_Resume_v3.pdf",
      coverLetter: "Cover_Letter_Amazon.pdf",
      portfolio: "https://johndoe.dev",
      certificates: ["AWS Solutions Architect"],
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
    },
    notifications: [
      { message: "Amazon released your offer letter", time: "2026-07-24T17:00:00Z", type: "offer" },
    ],
  },
  {
    id: 4,
    applicationId: "RN-2026-004",
    company: "TCS",
    companyLogo: "/company-logos/tcs.png",
    position: "React Developer",
    location: "Pune",
    workType: "On-site",
    salaryMin: 800000,
    salaryMax: 1200000,
    appliedDate: "2026-07-22T08:00:00Z",
    currentStage: "AI Screening",
    aiMatch: 78,
    priority: "Medium",
    recruiterName: "Vikram Patel",
    expectedResponse: "3-5 days",
    aiInsights: {
      chances: "Moderate",
      reason: [
        "Profile partially matches requirements",
        "Missing some preferred skills",
        "Resume format is ATS-friendly",
        "Good academic background",
      ],
      recommendedActions: [
        "Complete AWS certification",
        "Add more React projects to portfolio",
        "Improve LinkedIn profile completeness",
      ],
      offerProbability: 62,
      confidence: "Medium",
    },
    timeline: [
      { date: "2026-07-22", time: "08:00 AM", status: "Applied", icon: "📤", description: "Application submitted" },
      { date: "2026-07-23", time: "10:00 AM", status: "AI Screening", icon: "🤖", description: "Undergoing AI resume screening" },
    ],
    documents: {
      resume: "John_Doe_Resume_v3.pdf",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
    },
    notifications: [
      { message: "TCS received your application", time: "2026-07-22T08:00:00Z", type: "view" },
    ],
  },
  {
    id: 5,
    applicationId: "RN-2026-005",
    company: "Zoho",
    companyLogo: "/company-logos/zoho.png",
    position: "Full Stack Developer",
    location: "Chennai",
    workType: "On-site",
    salaryMin: 1200000,
    salaryMax: 1800000,
    appliedDate: "2026-07-19T11:00:00Z",
    currentStage: "Rejected",
    aiMatch: 72,
    priority: "Low",
    recruiterName: "Lakshmi Narayanan",
    expectedResponse: "N/A",
    aiInsights: {
      chances: "Low",
      reason: [
        "Position requires more backend experience",
        "Competing candidates had stronger profiles",
        "Missing required database skills",
      ],
      recommendedActions: [
        "Strengthen backend development skills",
        "Learn PostgreSQL and database design",
        "Apply for frontend-focused roles instead",
      ],
      offerProbability: 10,
      confidence: "Low",
    },
    timeline: [
      { date: "2026-07-19", time: "11:00 AM", status: "Applied", icon: "📤", description: "Application submitted" },
      { date: "2026-07-21", time: "09:00 AM", status: "Resume Reviewed", icon: "📋", description: "Resume reviewed by recruiter" },
      { date: "2026-07-23", time: "04:00 PM", status: "Rejected", icon: "❌", description: "Application not selected for next round" },
    ],
    recruiterFeedback: {
      strengths: ["Good frontend skills", "Nice portfolio presentation"],
      improvements: ["Strengthen backend knowledge", "Add database projects", "Improve system design skills"],
    },
    documents: {
      resume: "John_Doe_Resume_v2.pdf",
      linkedin: "https://linkedin.com/in/johndoe",
    },
    notifications: [
      { message: "Zoho reviewed your application", time: "2026-07-21T09:00:00Z", type: "view" },
      { message: "Zoho did not select your application", time: "2026-07-23T16:00:00Z", type: "reject" },
    ],
  },
  {
    id: 6,
    applicationId: "RN-2026-006",
    company: "Infosys",
    companyLogo: "/company-logos/infosys.png",
    position: "UI Developer",
    location: "Mysore",
    workType: "On-site",
    salaryMin: 600000,
    salaryMax: 900000,
    appliedDate: "2026-07-24T07:00:00Z",
    currentStage: "Applied",
    aiMatch: 68,
    priority: "Medium",
    recruiterName: "Pending Assignment",
    expectedResponse: "5-7 days",
    aiInsights: {
      chances: "Moderate",
      reason: [
        "Application just submitted",
        "Profile matches basic requirements",
        "Good educational background",
      ],
      recommendedActions: [
        "Wait for recruiter to review",
        "Prepare for potential aptitude test",
        "Keep phone available for communication",
      ],
      offerProbability: 55,
      confidence: "Low",
    },
    timeline: [
      { date: "2026-07-24", time: "07:00 AM", status: "Applied", icon: "📤", description: "Application submitted successfully" },
    ],
    documents: {
      resume: "John_Doe_Resume_v3.pdf",
      linkedin: "https://linkedin.com/in/johndoe",
    },
    notifications: [
      { message: "Infosys received your application", time: "2026-07-24T07:00:00Z", type: "view" },
    ],
  },
];

export const pipelineStages: { stage: ApplicationStage; label: string }[] = [
  { stage: "Applied", label: "Applied" },
  { stage: "Resume Reviewed", label: "Resume Reviewed" },
  { stage: "AI Screening", label: "AI Screening" },
  { stage: "HR Shortlisted", label: "HR Shortlisted" },
  { stage: "Technical Round", label: "Technical Round" },
  { stage: "Manager Round", label: "Manager Round" },
  { stage: "HR Discussion", label: "HR Discussion" },
  { stage: "Offer", label: "Offer" },
  { stage: "Hired", label: "Hired" },
];

export function getStageIndex(stage: ApplicationStage): number {
  return pipelineStages.findIndex((s) => s.stage === stage);
}
