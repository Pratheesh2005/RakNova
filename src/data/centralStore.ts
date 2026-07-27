import { mockAdminUsers, mockAdminCompanies, mockAdminRecruiters, mockAdminCandidates, mockAdminJobs, mockAdminApplications, mockAdminAuditLogs } from "./admin/adminData";

export interface CentralNotification {
  id: string;
  recipientRole: "Candidate" | "Company" | "Recruiter" | "Super Admin" | "All";
  recipientEmail?: string;
  title: string;
  message: string;
  category: "Application" | "Job" | "Interview" | "Verification" | "AI" | "Security";
  priority: "Low" | "Medium" | "High" | "Critical";
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface CentralApplication {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  jobId: string;
  jobTitle: string;
  companyId: string;
  companyName: string;
  recruiterId: string;
  recruiterName: string;
  appliedDate: string;
  stage: "Applied" | "Screening" | "Interview" | "Offer" | "Hired" | "Rejected";
  matchScore: number;
  resumeFileName: string;
  interviewDetails?: {
    date: string;
    time: string;
    type: string;
    status: "Scheduled" | "Completed" | "Cancelled";
  };
  offerDetails?: {
    salary: string;
    joiningDate: string;
    status: "Pending" | "Accepted" | "Declined";
  };
  notes: string;
  timeline: { id: string; action: string; timestamp: string }[];
}

export interface CentralJob {
  id: string;
  title: string;
  companyId: string;
  company: string;
  department: string;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
  workMode: "Remote" | "Hybrid" | "On-site";
  salaryRange: string;
  experienceRequired: string;
  requiredSkills: string[];
  preferredSkills: string[];
  description: string;
  status: "Published" | "Draft" | "Closed" | "Expired";
  applicationsCount: number;
  views: number;
  recruitersAssigned: number;
  postedDate: string;
  expiryDate: string;
}

const STORAGE_KEY = "raknova_central_state_v1";

// Initial seed data
const initialSeed = {
  users: mockAdminUsers,
  companies: mockAdminCompanies,
  recruiters: mockAdminRecruiters,
  candidates: mockAdminCandidates,
  jobs: mockAdminJobs.map((j) => ({
    ...j,
    companyId: "cmp-201",
    applicationsCount: j.applications || 184,
  })),
  applications: mockAdminApplications.map((a) => ({
    ...a,
    jobId: "job-501",
    candidateId: "can-401",
    companyId: "cmp-201",
    recruiterId: "rec-301",
    interviewDetails: undefined as any,
  })),
  notifications: [
    {
      id: "cnotif-1",
      recipientRole: "Candidate" as const,
      recipientEmail: "rohan.nair@example.com",
      title: "Application Status Updated",
      message: "Your application for Senior Full-Stack Engineer at TechCorp Systems has advanced to Interview.",
      category: "Application" as const,
      priority: "High" as const,
      timestamp: "Today 10:30 AM",
      read: false,
    },
    {
      id: "cnotif-2",
      recipientRole: "Company" as const,
      title: "New Job Application Received",
      message: "Rohan Nair submitted an application for Senior Full-Stack Engineer (AI Match: 88%).",
      category: "Application" as const,
      priority: "Medium" as const,
      timestamp: "Today 10:15 AM",
      read: false,
    },
    {
      id: "cnotif-3",
      recipientRole: "Recruiter" as const,
      recipientEmail: "s.verma@techcorp.com",
      title: "Candidate Assigned to Interview Pipeline",
      message: "Rohan Nair was scheduled for Technical Interview tomorrow at 11:00 AM.",
      category: "Interview" as const,
      priority: "High" as const,
      timestamp: "Today 11:00 AM",
      read: false,
    },
    {
      id: "cnotif-4",
      recipientRole: "Super Admin" as const,
      title: "Platform Hiring Event",
      message: "Application #APP-901 advanced to Interview stage across TechCorp Systems.",
      category: "Application" as const,
      priority: "Low" as const,
      timestamp: "Today 11:05 AM",
      read: false,
    },
  ],
};

class CentralStore {
  private state: typeof initialSeed;

  constructor() {
    this.state = this.loadState();
  }

  private loadState() {
    if (typeof window === "undefined") return initialSeed;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (err) {
      console.warn("Failed to load central store, using seed defaults:", err);
    }
    return initialSeed;
  }

  private saveState() {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (err) {
      console.warn("Failed to save central store to localStorage:", err);
    }
  }

  // GETTERS
  public getJobs(): CentralJob[] {
    return this.state.jobs as CentralJob[];
  }

  public getApplications(): CentralApplication[] {
    return this.state.applications as CentralApplication[];
  }

  public getCompanies() {
    return this.state.companies;
  }

  public getRecruiters() {
    return this.state.recruiters;
  }

  public getCandidates() {
    return this.state.candidates;
  }

  public getNotifications(role?: string, email?: string): CentralNotification[] {
    return (this.state.notifications as CentralNotification[]).filter((n) => {
      if (!role || role === "Super Admin" || n.recipientRole === "All") return true;
      if (n.recipientRole === role) {
        if (!n.recipientEmail || !email) return true;
        return n.recipientEmail === email;
      }
      return false;
    });
  }

  // WORKFLOW 2: POST NEW JOB
  public createJob(jobData: Omit<CentralJob, "id" | "applicationsCount" | "views" | "postedDate">): CentralJob {
    const newJob: CentralJob = {
      ...jobData,
      id: `job-${Date.now()}`,
      applicationsCount: 0,
      views: 1,
      postedDate: new Date().toISOString().split("T")[0],
    };

    this.state.jobs.unshift(newJob as any);

    // Notify Super Admin & Candidate recommendation triggers
    this.addNotification({
      recipientRole: "Super Admin",
      title: "New Job Published",
      message: `Job '${newJob.title}' posted by ${newJob.company}.`,
      category: "Job",
      priority: "Low",
      timestamp: "Just now",
    });

    this.saveState();
    return newJob;
  }

  // WORKFLOW 3: CANDIDATE APPLIES FOR A JOB
  public applyForJob(params: {
    candidateId: string;
    candidateName: string;
    candidateEmail: string;
    candidatePhone: string;
    jobId: string;
    jobTitle: string;
    companyId: string;
    companyName: string;
    resumeFileName: string;
    aiMatchScore?: number;
  }): CentralApplication {
    const existingJob = this.state.jobs.find((j) => j.id === params.jobId);
    if (existingJob) {
      existingJob.applicationsCount = (existingJob.applicationsCount || 0) + 1;
    }

    const newApp: CentralApplication = {
      id: `APP-${Math.floor(1000 + Math.random() * 9000)}`,
      candidateId: params.candidateId,
      candidateName: params.candidateName,
      candidateEmail: params.candidateEmail,
      candidatePhone: params.candidatePhone,
      jobId: params.jobId,
      jobTitle: params.jobTitle,
      companyId: params.companyId,
      companyName: params.companyName,
      recruiterId: "rec-301",
      recruiterName: "Siddharth Verma",
      appliedDate: new Date().toISOString().split("T")[0],
      stage: "Applied",
      matchScore: params.aiMatchScore || Math.floor(75 + Math.random() * 20),
      resumeFileName: params.resumeFileName || "Candidate_Resume.pdf",
      notes: "Application received via Candidate Portal.",
      timeline: [
        { id: `t-${Date.now()}`, action: "Job Application Submitted", timestamp: new Date().toLocaleString() },
      ],
    };

    this.state.applications.unshift(newApp as any);

    // WORKFLOW 7: NOTIFICATIONS DISPATCHED TO CANDIDATE, COMPANY, RECRUITER, AND ADMIN
    this.addNotification({
      recipientRole: "Candidate",
      recipientEmail: params.candidateEmail,
      title: "Application Received",
      message: `Your application for '${params.jobTitle}' at ${params.companyName} was submitted.`,
      category: "Application",
      priority: "Medium",
      timestamp: "Just now",
    });

    this.addNotification({
      recipientRole: "Company",
      title: "New Candidate Applicant",
      message: `${params.candidateName} applied for '${params.jobTitle}'.`,
      category: "Application",
      priority: "Medium",
      timestamp: "Just now",
    });

    this.addNotification({
      recipientRole: "Recruiter",
      recipientEmail: "s.verma@techcorp.com",
      title: "Candidate Pipeline Update",
      message: `${params.candidateName} added to ${params.jobTitle} screening queue.`,
      category: "Application",
      priority: "Medium",
      timestamp: "Just now",
    });

    this.addNotification({
      recipientRole: "Super Admin",
      title: "Platform Application Event",
      message: `${params.candidateName} applied to ${params.companyName} for ${params.jobTitle}.`,
      category: "Application",
      priority: "Low",
      timestamp: "Just now",
    });

    this.saveState();
    return newApp;
  }

  // WORKFLOW 5 & 6: RECRUITER / COMPANY UPDATES APPLICATION STAGE & SCHEDULING
  public updateApplicationStage(
    appId: string,
    newStage: CentralApplication["stage"],
    notes?: string
  ): CentralApplication | null {
    const app = this.state.applications.find((a) => a.id === appId);
    if (!app) return null;

    app.stage = newStage;
    if (notes) app.notes = notes;

    app.timeline.unshift({
      id: `t-${Date.now()}`,
      action: `Stage updated to ${newStage}`,
      timestamp: new Date().toLocaleString(),
    });

    // Notify Candidate of status change
    this.addNotification({
      recipientRole: "Candidate",
      recipientEmail: app.candidateEmail,
      title: `Application Advanced: ${newStage}`,
      message: `Your application for ${app.jobTitle} at ${app.companyName} is now in '${newStage}' stage.`,
      category: "Application",
      priority: newStage === "Hired" ? "Critical" : "High",
      timestamp: "Just now",
    });

    // If Hired -> WORKFLOW 6: HIRING METRICS UPDATE
    if (newStage === "Hired") {
      this.addNotification({
        recipientRole: "Super Admin",
        title: "Platform Placement Successful",
        message: `Candidate ${app.candidateName} hired by ${app.companyName} as ${app.jobTitle}!`,
        category: "Application",
        priority: "High",
        timestamp: "Just now",
      });
    }

    this.saveState();
    return app as any;
  }

  // WORKFLOW 5: SCHEDULE INTERVIEW
  public scheduleInterview(params: {
    appId: string;
    date: string;
    time: string;
    type: string;
  }) {
    const app = this.state.applications.find((a) => a.id === params.appId);
    if (!app) return;

    app.stage = "Interview";
    app.interviewDetails = {
      date: params.date,
      time: params.time,
      type: params.type,
      status: "Scheduled",
    };

    app.timeline.unshift({
      id: `t-${Date.now()}`,
      action: `Interview Scheduled (${params.type} - ${params.date} at ${params.time})`,
      timestamp: new Date().toLocaleString(),
    });

    this.addNotification({
      recipientRole: "Candidate",
      recipientEmail: app.candidateEmail,
      title: "Interview Invitation Scheduled",
      message: `Interview scheduled for ${app.jobTitle} on ${params.date} at ${params.time}.`,
      category: "Interview",
      priority: "High",
      timestamp: "Just now",
    });

    this.saveState();
  }

  // ADD NOTIFICATION HELPER
  public addNotification(notif: Omit<CentralNotification, "id" | "read">) {
    const newNotif: CentralNotification = {
      ...notif,
      id: `cnotif-${Date.now()}`,
      read: false,
    };
    this.state.notifications.unshift(newNotif as any);
    this.saveState();
  }

  // MARK NOTIFICATION READ
  public markNotificationRead(id: string) {
    const notif = this.state.notifications.find((n) => n.id === id);
    if (notif) {
      notif.read = true;
      this.saveState();
    }
  }
}

export const centralStore = new CentralStore();
