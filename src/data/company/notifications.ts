export interface CompanyNotification {
  id: number;
  type: "application" | "interview" | "offer" | "system" | "deadline";
  title: string;
  description: string;
  time: string;
  read: boolean;
  priority: "High" | "Medium" | "Low";
  action?: {
    label: string;
    url?: string;
  };
}

export const notifications: CompanyNotification[] = [
  {
    id: 1,
    type: "application",
    title: "New application received",
    description: "Priya Sharma applied for Senior Frontend Developer",
    time: "5 minutes ago",
    read: false,
    priority: "Medium",
    action: { label: "View Candidate", url: "/company/candidates" },
  },
  {
    id: 2,
    type: "interview",
    title: "Interview begins in 30 minutes",
    description: "Technical Interview with Priya Sharma for Senior Frontend Developer",
    time: "25 minutes ago",
    read: false,
    priority: "High",
    action: { label: "Join Interview" },
  },
  {
    id: 3,
    type: "offer",
    title: "Candidate accepted offer",
    description: "Vikram Singh accepted the Backend Developer offer",
    time: "2 hours ago",
    read: false,
    priority: "High",
    action: { label: "View Offer" },
  },
  {
    id: 4,
    type: "deadline",
    title: "Job closing tomorrow",
    description: "Frontend Developer job closes on July 28. 12 applications received.",
    time: "4 hours ago",
    read: true,
    priority: "Medium",
    action: { label: "View Job" },
  },
  {
    id: 5,
    type: "application",
    title: "Recruiter submitted interview feedback",
    description: "Rajesh Kumar submitted feedback for Rahul Mehta",
    time: "Yesterday",
    read: true,
    priority: "Low",
  },
  {
    id: 6,
    type: "system",
    title: "AI screening completed",
    description: "50 applications processed. 42 passed, 8 flagged.",
    time: "Yesterday",
    read: true,
    priority: "Low",
  },
];
