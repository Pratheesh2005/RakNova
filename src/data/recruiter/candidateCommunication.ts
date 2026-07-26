export interface CommunicationTask {
  id: number;
  title: string;
  candidate: string;
  dueTime: string;
  priority: "High" | "Medium" | "Low";
  actionLabel: string;
}

export interface CommunicationItem {
  id: number;
  candidate: string;
  appliedJob: string;
  lastCommunication: string;
  communicationType: "Email" | "Phone" | "Interview" | "Offer" | "Follow-up";
  status: "Pending" | "Waiting Reply" | "Completed" | "Overdue";
  assignedRecruiter: string;
  nextFollowUp: string;
  history?: CommunicationHistoryEntry[];
}

export interface CommunicationHistoryEntry {
  date: string;
  type: string;
  description: string;
  status: "sent" | "received" | "pending";
}

export interface FollowUpItem {
  id: number;
  candidate: string;
  reason: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "Completed";
}

export interface MessageTemplate {
  id: number;
  name: string;
  subject: string;
  body: string;
}

export const todayCommunicationTasks: CommunicationTask[] = [
  { id: 1, title: "Interview confirmations pending", candidate: "Priya Sharma, Arun Kumar", dueTime: "Within 2 hours", priority: "High", actionLabel: "Send Reminder" },
  { id: 2, title: "Candidate replies awaiting response", candidate: "Rahul Mehta", dueTime: "Today", priority: "Medium", actionLabel: "Review Reply" },
  { id: 3, title: "Offer discussion pending", candidate: "Vikram Singh", dueTime: "Before 4:00 PM", priority: "High", actionLabel: "Call Candidate" },
  { id: 4, title: "Follow-up reminders", candidate: "Sneha Reddy, Anita Desai", dueTime: "Tomorrow", priority: "Medium", actionLabel: "Send Follow-up" },
  { id: 5, title: "Interview reminder scheduled", candidate: "Priya Sharma", dueTime: "10:00 AM tomorrow", priority: "Low", actionLabel: "View" },
];

export const communicationList: CommunicationItem[] = [
  {
    id: 1,
    candidate: "Priya Sharma",
    appliedJob: "Senior Frontend Developer",
    lastCommunication: "2026-07-26",
    communicationType: "Email",
    status: "Waiting Reply",
    assignedRecruiter: "Rahul Kumar",
    nextFollowUp: "2026-07-28",
    history: [
      { date: "2026-07-25", type: "Interview Invitation", description: "Sent technical interview invitation for July 28", status: "sent" },
      { date: "2026-07-26", type: "Candidate Reply", description: "Priya confirmed availability for July 28", status: "received" },
      { date: "2026-07-26", type: "Reminder", description: "Sent interview reminder with meeting link", status: "sent" },
    ],
  },
  {
    id: 2,
    candidate: "Arun Kumar",
    appliedJob: "ML Engineer",
    lastCommunication: "2026-07-25",
    communicationType: "Interview",
    status: "Pending",
    assignedRecruiter: "Rahul Kumar",
    nextFollowUp: "2026-07-27",
    history: [
      { date: "2026-07-24", type: "Phone Call", description: "Discussed interview schedule for ML Engineer role", status: "sent" },
      { date: "2026-07-25", type: "Interview Invitation", description: "Sent interview invitation for July 28", status: "sent" },
    ],
  },
  {
    id: 3,
    candidate: "Vikram Singh",
    appliedJob: "Backend Developer",
    lastCommunication: "2026-07-27",
    communicationType: "Offer",
    status: "Waiting Reply",
    assignedRecruiter: "Rahul Kumar",
    nextFollowUp: "2026-07-29",
    history: [
      { date: "2026-07-27", type: "Offer Discussion", description: "Discussed offer details over phone", status: "sent" },
      { date: "2026-07-27", type: "Offer Letter", description: "Sent official offer letter via email", status: "sent" },
    ],
  },
  {
    id: 4,
    candidate: "Sneha Reddy",
    appliedJob: "DevOps Engineer",
    lastCommunication: "2026-07-24",
    communicationType: "Follow-up",
    status: "Overdue",
    assignedRecruiter: "Rahul Kumar",
    nextFollowUp: "2026-07-26",
    history: [
      { date: "2026-07-23", type: "Document Request", description: "Requested updated resume and certificates", status: "sent" },
    ],
  },
  {
    id: 5,
    candidate: "Rahul Mehta",
    appliedJob: "Backend Developer",
    lastCommunication: "2026-07-26",
    communicationType: "Email",
    status: "Completed",
    assignedRecruiter: "Rahul Kumar",
    nextFollowUp: "—",
    history: [
      { date: "2026-07-26", type: "Interview Confirmation", description: "Candidate confirmed HR interview on July 29", status: "received" },
    ],
  },
];

export const followUpItems: FollowUpItem[] = [
  { id: 1, candidate: "Sneha Reddy", reason: "Waiting for updated resume", dueDate: "2026-07-26", priority: "High", status: "Pending" },
  { id: 2, candidate: "Arun Kumar", reason: "Waiting for interview confirmation", dueDate: "2026-07-27", priority: "Medium", status: "Pending" },
  { id: 3, candidate: "Vikram Singh", reason: "Offer discussion follow-up", dueDate: "2026-07-29", priority: "High", status: "Pending" },
  { id: 4, candidate: "Anita Desai", reason: "Waiting for portfolio link", dueDate: "2026-07-30", priority: "Low", status: "Pending" },
];

export const messageTemplates: MessageTemplate[] = [
  {
    id: 1,
    name: "Interview Invitation",
    subject: "Interview Invitation — [Position] at TechNova Solutions",
    body: "Dear [Candidate Name],\n\nWe are pleased to invite you for a [Interview Type] interview for the position of [Position] at TechNova Solutions.\n\nDate: [Date]\nTime: [Time]\nMode: [Online/Offline]\n\nPlease confirm your availability at your earliest convenience.\n\nBest regards,\n[Recruiter Name]\nTechNova Solutions",
  },
  {
    id: 2,
    name: "Interview Reminder",
    subject: "Reminder — Upcoming Interview for [Position]",
    body: "Dear [Candidate Name],\n\nThis is a reminder that your [Interview Type] interview for [Position] is scheduled for [Date] at [Time].\n\nMeeting Link: [Link]\n\nWe look forward to speaking with you.\n\nBest regards,\n[Recruiter Name]",
  },
  {
    id: 3,
    name: "Follow-up After Interview",
    subject: "Thank You — Interview for [Position]",
    body: "Dear [Candidate Name],\n\nThank you for taking the time to interview with us for the [Position] role.\n\nWe will review your feedback and get back to you within [Timeframe].\n\nBest regards,\n[Recruiter Name]",
  },
  {
    id: 4,
    name: "Request Additional Documents",
    subject: "Request for Additional Documents — [Position]",
    body: "Dear [Candidate Name],\n\nWe require the following documents to proceed with your application:\n- [Document List]\n\nPlease share them by [Deadline].\n\nBest regards,\n[Recruiter Name]",
  },
  {
    id: 5,
    name: "Offer Discussion",
    subject: "Offer Discussion — [Position]",
    body: "Dear [Candidate Name],\n\nWe are pleased to inform you that we would like to extend an offer for the [Position] role.\n\nLet us schedule a call to discuss the details at your earliest convenience.\n\nBest regards,\n[Recruiter Name]",
  },
  {
    id: 6,
    name: "Application Update",
    subject: "Application Update — [Position]",
    body: "Dear [Candidate Name],\n\nWe wanted to update you on your application for [Position]. Your profile is currently under review and we expect to have an update by [Date].\n\nBest regards,\n[Recruiter Name]",
  },
];
