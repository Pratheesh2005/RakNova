export interface AnalyticsSummary {
  applications: number;
  interviewsConducted: number;
  offersSent: number;
  successfulHires: number;
  avgTimeToHire: string; // e.g., "12 days"
  offerAcceptanceRate: number; // percentage
}

export const summary: AnalyticsSummary = {
  applications: 487,
  interviewsConducted: 42,
  offersSent: 15,
  successfulHires: 23,
  avgTimeToHire: "14 days",
  offerAcceptanceRate: 78,
};

export interface FunnelStage {
  stage: string;
  count: number;
  conversion: number; // from previous stage
  dropOff: number;
}

export const funnel: FunnelStage[] = [
  { stage: "Applications", count: 487, conversion: 100, dropOff: 0 },
  { stage: "Under Review", count: 320, conversion: 66, dropOff: 34 },
  { stage: "Shortlisted", count: 94, conversion: 29, dropOff: 71 },
  { stage: "Interviewed", count: 42, conversion: 45, dropOff: 55 },
  { stage: "Offer", count: 15, conversion: 36, dropOff: 64 },
  { stage: "Hired", count: 23, conversion: 153, dropOff: 0 }, // Hired can exceed offers if some are pending
];

export interface JobPerformance {
  id: number;
  title: string;
  applications: number;
  shortlisted: number;
  interviews: number;
  offers: number;
  hires: number;
  avgAIMatch: number;
  status: string;
}

export const jobsPerformance: JobPerformance[] = [
  { id: 1, title: "Senior Frontend Developer", applications: 87, shortlisted: 20, interviews: 8, offers: 3, hires: 2, avgAIMatch: 85, status: "Active" },
  { id: 2, title: "ML Engineer", applications: 124, shortlisted: 28, interviews: 12, offers: 5, hires: 3, avgAIMatch: 88, status: "Active" },
  { id: 3, title: "DevOps Engineer", applications: 56, shortlisted: 10, interviews: 4, offers: 1, hires: 1, avgAIMatch: 72, status: "Active" },
  { id: 4, title: "Product Designer", applications: 43, shortlisted: 8, interviews: 3, offers: 1, hires: 1, avgAIMatch: 78, status: "Active" },
  { id: 5, title: "Backend Developer", applications: 98, shortlisted: 22, interviews: 9, offers: 4, hires: 2, avgAIMatch: 82, status: "Active" },
];

export const timeToHireStages = [
  { stage: "Application → Review", days: 3 },
  { stage: "Review → Interview", days: 5 },
  { stage: "Interview → Offer", days: 4 },
  { stage: "Offer → Hire", days: 2 },
];

export const aiAnalyticsInsights = [
  {
    observation: "Frontend Developer hiring takes 6 days longer than average.",
    reason: "Multiple interview rounds and feedback delays.",
    recommendedAction: "Reduce interview rounds to two technical + one HR.",
  },
  {
    observation: "ML Engineer receives many applications but few qualified candidates.",
    reason: "Required skills (Kubernetes, MLOps) are uncommon among applicants.",
    recommendedAction: "Adjust required skills or salary range, and add training for cloud tools.",
  },
  {
    observation: "Offer acceptance rate decreased from 82% to 78% this month.",
    reason: "Competitors are offering higher salaries for DevOps roles.",
    recommendedAction: "Review compensation package and consider benefits enhancement.",
  },
];

export const topPerformingJobs = [
  { title: "Backend Developer", applications: 98, avgAIMatch: 82, offers: 4, hires: 2 },
  { title: "ML Engineer", applications: 124, avgAIMatch: 88, offers: 5, hires: 3 },
  { title: "Senior Frontend Developer", applications: 87, avgAIMatch: 85, offers: 3, hires: 2 },
];
