export interface Notification {
  id: number;
  type: "application" | "interview" | "job_match" | "profile" | "system";
  title: string;
  description: string;
  time: string;
  read: boolean;
  actionLabel?: string;
  actionUrl?: string;
}

export const notifications: Notification[] = [
  {
    id: 1,
    type: "application",
    title: "Application viewed",
    description: "Microsoft viewed your application for Senior Frontend Developer.",
    time: "2026-07-25T10:30:00Z",
    read: false,
    actionLabel: "View Application",
    actionUrl: "/candidate/applications",
  },
  {
    id: 2,
    type: "interview",
    title: "Interview scheduled",
    description: "Zoho has scheduled a Technical Interview for July 28 at 10:30 AM.",
    time: "2026-07-25T09:15:00Z",
    read: false,
    actionLabel: "View Interview",
    actionUrl: "/candidate/interviews",
  },
  {
    id: 3,
    type: "job_match",
    title: "New job match",
    description: "A new AI-recommended job at Google matches your profile (92%).",
    time: "2026-07-24T18:00:00Z",
    read: false,
    actionLabel: "View Job",
    actionUrl: "/candidate/jobs",
  },
  {
    id: 4,
    type: "profile",
    title: "Profile milestone",
    description: "Your profile completion reached 90%. You're almost there!",
    time: "2026-07-24T14:00:00Z",
    read: true,
    actionLabel: "Complete Profile",
    actionUrl: "/candidate/profile",
  },
  {
    id: 5,
    type: "system",
    title: "Resume updated",
    description: "Your resume was updated successfully. ATS score: 89%.",
    time: "2026-07-24T11:00:00Z",
    read: true,
  },
  {
    id: 6,
    type: "application",
    title: "Application shortlisted",
    description: "Amazon shortlisted your application for SDE II - Frontend.",
    time: "2026-07-23T16:30:00Z",
    read: true,
    actionLabel: "View Application",
    actionUrl: "/candidate/applications",
  },
  {
    id: 7,
    type: "interview",
    title: "Interview completed",
    description: "Your HR interview with TCS was completed. Feedback expected within 3 days.",
    time: "2026-07-22T12:00:00Z",
    read: true,
  },
  {
    id: 8,
    type: "application",
    title: "Offer received",
    description: "Amazon has released an offer for SDE II - Frontend position.",
    time: "2026-07-21T15:45:00Z",
    read: true,
    actionLabel: "View Offer",
    actionUrl: "/candidate/applications",
  },
  {
    id: 9,
    type: "job_match",
    title: "Job match alert",
    description: "5 new jobs match your profile. Review them before they expire.",
    time: "2026-07-20T08:00:00Z",
    read: true,
    actionLabel: "View Jobs",
    actionUrl: "/candidate/job-search",
  },
  {
    id: 10,
    type: "profile",
    title: "Profile viewed",
    description: "A recruiter from Infosys viewed your profile.",
    time: "2026-07-19T10:00:00Z",
    read: true,
  },
];

export const notificationCategories = [
  { id: "all", label: "All" },
  { id: "application", label: "Applications" },
  { id: "interview", label: "Interviews" },
  { id: "job_match", label: "Job Matches" },
  { id: "profile", label: "Profile" },
  { id: "system", label: "System" },
];
