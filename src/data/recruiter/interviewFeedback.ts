export interface InterviewFeedbackData {
  id: number;
  candidateName: string;
  candidatePhoto: string;
  appliedPosition: string;
  interviewRound: string;
  interviewDate: string;
  interviewTime: string;
  interviewType: string;
  interviewer: string;
  interviewDuration: string;
  currentStage: string;
  evaluationRatings: {
    technicalKnowledge: number;
    problemSolving: number;
    communication: number;
    confidence: number;
    culturalFit: number;
    roleUnderstanding: number;
    learningAbility: number;
    overallPerformance: number;
  };
  observations: {
    strengths: string;
    areasForImprovement: string;
    technicalObservations: string;
    communicationNotes: string;
    generalComments: string;
  };
  checklistItems: { label: string; checked: boolean }[];
  aiAssistant: {
    observations: string[];
    strengths: string[];
    risks: string[];
    suggestedAction: string;
  };
  attachments: { name: string; type: string }[];
  feedbackHistory: { action: string; detail: string; time: string }[];
}

// Demo feedback data for a completed interview
export const interviewFeedbackData: InterviewFeedbackData = {
  id: 1,
  candidateName: "Priya Sharma",
  candidatePhoto: "/avatars/priya.jpg",
  appliedPosition: "Senior Frontend Developer",
  interviewRound: "Technical",
  interviewDate: "2026-07-28",
  interviewTime: "10:30 AM",
  interviewType: "Online",
  interviewer: "Rajesh Kumar",
  interviewDuration: "60 min",
  currentStage: "Interview Completed",
  evaluationRatings: {
    technicalKnowledge: 4,
    problemSolving: 5,
    communication: 4,
    confidence: 4,
    culturalFit: 5,
    roleUnderstanding: 5,
    learningAbility: 4,
    overallPerformance: 4,
  },
  observations: {
    strengths: "Strong React and TypeScript skills. Excellent problem-solving approach. Clear communication.",
    areasForImprovement: "Limited production cloud deployment experience. Could benefit from more system design exposure.",
    technicalObservations: "Demonstrated good knowledge of React hooks, state management, and performance optimization. Struggled slightly with Docker-related questions.",
    communicationNotes: "Articulated ideas clearly. Asked relevant questions. Professional demeanor.",
    generalComments: "Overall a strong candidate who would fit well with the team. Recommend proceeding to the next round.",
  },
  checklistItems: [
    { label: "Candidate Joined On Time", checked: true },
    { label: "Identity Verified", checked: true },
    { label: "Resume Discussed", checked: true },
    { label: "Projects Discussed", checked: true },
    { label: "Questions Answered", checked: true },
    { label: "Candidate Questions Addressed", checked: true },
    { label: "Interview Completed Successfully", checked: true },
  ],
  aiAssistant: {
    observations: [
      "Candidate demonstrated excellent technical knowledge.",
      "Communication was clear and professional.",
      "Portfolio supports resume claims.",
      "Limited production experience observed.",
    ],
    strengths: ["React", "TypeScript", "Problem Solving", "Communication"],
    risks: ["Cloud deployment experience", "System design at scale"],
    suggestedAction: "Proceed to Final Interview. Consider a short cloud deployment exercise before the final round.",
  },
  attachments: [
    { name: "Interview Notes", type: "PDF" },
    { name: "Coding Assessment", type: "PDF" },
    { name: "Portfolio Review", type: "PDF" },
    { name: "Technical Evaluation", type: "PDF" },
  ],
  feedbackHistory: [
    { action: "Interview Scheduled", detail: "Technical interview with Rajesh Kumar", time: "2026-07-27" },
    { action: "Interview Completed", detail: "Interview conducted via Google Meet", time: "2026-07-28 10:30 AM" },
    { action: "Feedback Draft Saved", detail: "Initial feedback draft saved", time: "2026-07-28 11:45 AM" },
    { action: "Feedback Submitted", detail: "Final feedback submitted to HR", time: "Pending" },
  ],
};
