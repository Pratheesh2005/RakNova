export interface RecruiterNotification {
  id: number;
  type: "candidates" | "interviews" | "feedback" | "system";
  title: string;
  description: string;
  time: string;
  read: boolean;
  priority: "High" | "Medium" | "Low";
  action?: { label: string; url?: string };
}

export const recruiterNotifications: RecruiterNotification[] = [
  {
    id: 1,
    type: "candidates",
    title: "New candidate assigned",
    description: "Priya Sharma assigned to you for Senior Frontend Developer",
    time: "5 min ago",
    read: false,
    priority: "Medium",
    action: { label: "Review Candidate", url: "/recruiter/candidates/1" },
  },
  {
    id: 2,
    type: "interviews",
    title: "Interview begins in 30 minutes",
    description: "Technical Interview with Priya Sharma at 10:30 AM",
    time: "25 min ago",
    read: false,
    priority: "High",
    action: { label: "View Interview" },
  },
  {
    id: 3,
    type: "feedback",
    title: "Interview feedback pending",
    description: "Feedback for Arun Kumar's technical interview is due today",
    time: "1 hour ago",
    read: false,
    priority: "Medium",
    action: { label: "Submit Feedback" },
  },
  {
    id: 4,
    type: "candidates",
    title: "Candidate accepted interview invitation",
    description: "Rahul Mehta confirmed HR interview on July 29",
    time: "2 hours ago",
    read: true,
    priority: "Low",
  },
  {
    id: 5,
    type: "system",
    title: "Resume updated",
    description: "Sneha Reddy updated her resume for DevOps Engineer role",
    time: "Yesterday",
    read: true,
    priority: "Low",
  },
  {
    id: 6,
    type: "interviews",
    title: "Interview cancelled",
    description: "Anita Desai's Manager interview has been cancelled",
    time: "Yesterday",
    read: true,
    priority: "Medium",
  },
];
