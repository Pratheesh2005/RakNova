export interface RecruiterInterview {
  id: number;
  time: string;
  candidate: string;
  appliedRole: string;
  interviewRound: string;
  interviewMode: "Online" | "Offline";
  interviewer: string;
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled" | "Rescheduled";
  date: string;
  duration: string;
  meetingLink?: string;
  resume?: string;
  portfolio?: string;
  github?: string;
  linkedin?: string;
  notes?: string;
}

export const todayInterviewTasks = [
  {
    title: "3 interviews starting today",
    priority: "High",
    time: "First at 10:30 AM",
    candidate: "Priya Sharma",
    actionLabel: "View",
  },
  {
    title: "2 interview confirmations pending",
    priority: "Medium",
    time: "Within 2 hours",
    candidate: "Arun Kumar, Sneha Reddy",
    actionLabel: "Send Reminder",
  },
  {
    title: "1 interview needs rescheduling",
    priority: "Medium",
    time: "Anytime today",
    candidate: "Rahul Mehta",
    actionLabel: "Reschedule",
  },
  {
    title: "1 candidate submitted updated resume",
    priority: "Low",
    time: "Recently",
    candidate: "Priya Sharma",
    actionLabel: "Review",
  },
];

export const todayInterviews: RecruiterInterview[] = [
  {
    id: 1,
    time: "10:30 AM",
    candidate: "Priya Sharma",
    appliedRole: "Senior Frontend Developer",
    interviewRound: "Technical",
    interviewMode: "Online",
    interviewer: "Rajesh Kumar",
    status: "Scheduled",
    date: "2026-07-28",
    duration: "60 min",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    resume: "Priya_Sharma_Resume.pdf",
    portfolio: "https://priyasharma.dev",
    github: "https://github.com/priyasharma",
    linkedin: "https://linkedin.com/in/priyasharma",
    notes: "Focus on system design and React performance.",
  },
  {
    id: 2,
    time: "2:00 PM",
    candidate: "Arun Kumar",
    appliedRole: "ML Engineer",
    interviewRound: "Technical",
    interviewMode: "Online",
    interviewer: "Anita Desai",
    status: "Scheduled",
    date: "2026-07-28",
    duration: "90 min",
    meetingLink: "https://zoom.us/j/123456",
    resume: "Arun_Kumar_Resume.pdf",
    github: "https://github.com/arunkumar",
    linkedin: "https://linkedin.com/in/arunkumar",
    notes: "Prepare ML theory questions.",
  },
];

export const upcomingInterviews: RecruiterInterview[] = [
  {
    id: 3,
    time: "11:00 AM",
    candidate: "Rahul Mehta",
    appliedRole: "Backend Developer",
    interviewRound: "HR",
    interviewMode: "Offline",
    interviewer: "Sneha Reddy",
    status: "Scheduled",
    date: "2026-07-29",
    duration: "45 min",
  },
  {
    id: 4,
    time: "3:00 PM",
    candidate: "Sneha Reddy",
    appliedRole: "DevOps Engineer",
    interviewRound: "Technical",
    interviewMode: "Online",
    interviewer: "Unassigned",
    status: "Scheduled",
    date: "2026-07-30",
    duration: "60 min",
  },
];

export const interviewActivity = [
  { action: "Interview Scheduled", detail: "Technical interview for Priya Sharma on July 28", time: "1 hour ago" },
  { action: "Interview Rescheduled", detail: "HR round for Rahul Mehta moved to July 29", time: "3 hours ago" },
  { action: "Candidate Confirmed", detail: "Arun Kumar confirmed interview availability", time: "Yesterday" },
  { action: "Meeting Link Updated", detail: "Updated Google Meet link for Priya Sharma", time: "Yesterday" },
  { action: "Interview Completed", detail: "Vikram Singh's final round completed", time: "2 days ago" },
];
