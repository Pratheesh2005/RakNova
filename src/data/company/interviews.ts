export interface Interview {
  id: number;
  candidate: string;
  appliedPosition: string;
  interviewType: "Technical" | "HR" | "Manager" | "Final";
  interviewer: string;
  meetingMode: "Online" | "Offline";
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled" | "Rescheduled";
  date: string;
  time: string;
  duration: string;
  meetingLink?: string;
  location?: string;
  resume?: string;
  portfolio?: string;
  github?: string;
  linkedin?: string;
  notes?: string;
  feedbackStatus?: "Pending" | "Submitted";
  completedOn?: string;
}

export const interviews: Interview[] = [
  {
    id: 1,
    candidate: "Priya Sharma",
    appliedPosition: "Senior Frontend Developer",
    interviewType: "Technical",
    interviewer: "Rajesh Kumar",
    meetingMode: "Online",
    status: "Scheduled",
    date: "2026-07-28",
    time: "10:30 AM",
    duration: "60 min",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    resume: "Priya_Sharma_Resume.pdf",
    portfolio: "https://priyasharma.dev",
    github: "https://github.com/priyasharma",
    linkedin: "https://linkedin.com/in/priyasharma",
    feedbackStatus: "Pending",
  },
  {
    id: 2,
    candidate: "Arun Kumar",
    appliedPosition: "ML Engineer",
    interviewType: "Technical",
    interviewer: "Anita Desai",
    meetingMode: "Online",
    status: "In Progress",
    date: "2026-07-28",
    time: "2:00 PM",
    duration: "90 min",
    meetingLink: "https://zoom.us/j/123456",
    resume: "Arun_Kumar_Resume.pdf",
    github: "https://github.com/arunkumar",
    linkedin: "https://linkedin.com/in/arunkumar",
    feedbackStatus: "Pending",
  },
  {
    id: 3,
    candidate: "Rahul Mehta",
    appliedPosition: "Backend Developer",
    interviewType: "HR",
    interviewer: "Sneha Reddy",
    meetingMode: "Offline",
    status: "Scheduled",
    date: "2026-07-29",
    time: "11:00 AM",
    duration: "45 min",
    location: "Conference Room A, Bangalore",
    resume: "Rahul_Mehta_Resume.pdf",
    linkedin: "https://linkedin.com/in/rahulmehta",
    feedbackStatus: "Pending",
  },
  {
    id: 4,
    candidate: "Vikram Singh",
    appliedPosition: "DevOps Engineer",
    interviewType: "Final",
    interviewer: "Vikram Singh (Hiring Manager)",
    meetingMode: "Online",
    status: "Completed",
    date: "2026-07-27",
    time: "9:00 AM",
    duration: "60 min",
    meetingLink: "https://meet.google.com/xyz",
    resume: "Vikram_Singh_Resume.pdf",
    github: "https://github.com/vikramsingh",
    linkedin: "https://linkedin.com/in/vikramsingh",
    feedbackStatus: "Submitted",
    completedOn: "2026-07-27",
  },
  {
    id: 5,
    candidate: "Sneha Reddy",
    appliedPosition: "DevOps Engineer",
    interviewType: "Technical",
    interviewer: "Unassigned",
    meetingMode: "Online",
    status: "Scheduled",
    date: "2026-07-30",
    time: "3:00 PM",
    duration: "60 min",
    meetingLink: "",
    resume: "Sneha_Reddy_Resume.pdf",
    feedbackStatus: "Pending",
  },
  {
    id: 6,
    candidate: "Anita Desai",
    appliedPosition: "Product Designer",
    interviewType: "Manager",
    interviewer: "Priya Sharma",
    meetingMode: "Online",
    status: "Cancelled",
    date: "2026-07-28",
    time: "4:00 PM",
    duration: "60 min",
    feedbackStatus: "Pending",
  },
];

export const interviewPriorities = [
  {
    title: "5 interviews start today",
    description: "First one at 10:30 AM with Priya Sharma",
    priority: "High",
    actionLabel: "View Schedule",
  },
  {
    title: "2 interview feedback forms pending",
    description: "From yesterday's interviews with Vikram Singh and Arun Kumar",
    priority: "High",
    actionLabel: "Submit Feedback",
  },
  {
    title: "1 interview cancelled",
    description: "Anita Desai's Manager interview needs rescheduling",
    priority: "Medium",
    actionLabel: "Reschedule",
  },
  {
    title: "3 technical interviews need interviewer assignment",
    description: "Sneha Reddy, new ML applicant, and backend intern",
    priority: "Medium",
    actionLabel: "Assign Interviewer",
  },
  {
    title: "1 candidate waiting for HR decision",
    description: "Vikram Singh completed final round yesterday",
    priority: "High",
    actionLabel: "Make Decision",
  },
];

export const interviewInsights = [
  {
    observation: "Candidate performed strongly in technical screening.",
    reason: "Score 92%, good problem-solving and system design.",
    recommendedAction: "Proceed to HR Interview.",
  },
  {
    observation: "Candidate lacks required cloud experience.",
    reason: "0 cloud projects mentioned, no AWS/Azure certifications.",
    recommendedAction: "Conduct additional technical assessment on cloud basics.",
  },
  {
    observation: "Interview delayed for 5 days.",
    reason: "Interviewer unavailable, candidate rescheduled twice.",
    recommendedAction: "Schedule follow-up today with a different interviewer.",
  },
];

export const interviewActivity = [
  { action: "Interview Scheduled", detail: "Technical interview for Priya Sharma on July 28", time: "1 hour ago" },
  { action: "Interview Rescheduled", detail: "Manager interview for Anita Desai moved to July 30", time: "3 hours ago" },
  { action: "Feedback Submitted", detail: "Vikram Singh's final round feedback recorded", time: "Yesterday" },
  { action: "Offer Approved", detail: "Offer for Vikram Singh approved by hiring manager", time: "Yesterday" },
  { action: "Candidate Declined", detail: "Karthik declined interview invitation for DevOps role", time: "2 days ago" },
];
