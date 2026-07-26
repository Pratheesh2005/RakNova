export interface Interview {
  id: number;
  company: string;
  companyLogo: string;
  position: string;
  type: "Technical" | "HR" | "Manager" | "Coding" | "System Design" | "Behavioral";
  mode: "Online" | "Offline";
  date: string;
  time: string;
  duration: string;
  interviewerName: string;
  interviewerDesignation: string;
  interviewerEmail: string;
  interviewerPhone: string;
  interviewerLinkedIn: string;
  meetingLink?: string;
  location?: string;
  status: "upcoming" | "completed" | "cancelled" | "rescheduled";
  preparationStatus: "Ready" | "In Progress" | "Not Started";
  score?: number;
  feedback?: {
    strengths: string[];
    improvements: string[];
    overallRating: number;
    notes: string;
  };
  companyResearch: {
    overview: string;
    culture: string;
    products: string[];
    techStack: string[];
    hiringProcess: string[];
    recentNews: string[];
    interviewDifficulty: string;
    expectedQuestions: string[];
    dressCode: string;
    interviewTips: string[];
  };
  suggestedQuestions: string[];
  requiredDocuments: { name: string; completed: boolean }[];
  notes?: string;
}

export const todayInterviews: Interview[] = [
  {
    id: 1,
    company: "Microsoft",
    companyLogo: "/company-logos/microsoft.png",
    position: "Senior Frontend Developer",
    type: "Technical",
    mode: "Online",
    date: "2026-07-25",
    time: "10:30 AM",
    duration: "60 Minutes",
    interviewerName: "Arun Kumar",
    interviewerDesignation: "Senior Engineering Manager",
    interviewerEmail: "arun.kumar@microsoft.com",
    interviewerPhone: "+91 9876543210",
    interviewerLinkedIn: "https://linkedin.com/in/arunkumar",
    meetingLink: "https://teams.microsoft.com/meeting/abc123",
    status: "upcoming",
    preparationStatus: "Ready",
    companyResearch: {
      overview: "Microsoft is a global technology company empowering every person and organization to achieve more.",
      culture: "Growth mindset, inclusive culture, innovation-driven, customer-obsessed.",
      products: ["Azure", "Microsoft 365", "GitHub", "VS Code", "LinkedIn", "Windows"],
      techStack: ["React", "TypeScript", "Azure", ".NET", "GraphQL"],
      hiringProcess: ["Phone Screen", "Technical Round (DSA)", "System Design", "Behavioral", "AA (As Appropriate)"],
      recentNews: ["Microsoft AI Copilot expansion", "Azure growth 30% YoY", "New Bengaluru office"],
      interviewDifficulty: "Medium-High",
      expectedQuestions: [
        "Design a collaborative code editor",
        "Implement a debounce function",
        "Explain React reconciliation",
        "Tell me about a challenging project",
      ],
      dressCode: "Business Casual",
      interviewTips: [
        "Focus on problem-solving approach",
        "Communicate your thought process clearly",
        "Ask clarifying questions before coding",
        "Prepare questions about the team and role",
      ],
    },
    suggestedQuestions: [
      "Explain React fiber architecture",
      "Design a real-time notification system",
      "How does TypeScript improve code quality?",
      "Describe your most challenging frontend project",
      "What's your approach to performance optimization?",
    ],
    requiredDocuments: [
      { name: "Updated Resume", completed: true },
      { name: "Government ID", completed: true },
      { name: "Certificates", completed: true },
      { name: "Portfolio Link", completed: true },
      { name: "Passport Photo", completed: false },
    ],
    notes: "Focus on system design for scalable frontends. Microsoft values growth mindset.",
  },
];

export const upcomingInterviews: Interview[] = [
  {
    id: 2,
    company: "Google",
    companyLogo: "/company-logos/google.png",
    position: "Frontend Engineer",
    type: "System Design",
    mode: "Online",
    date: "2026-07-27",
    time: "11:00 AM",
    duration: "90 Minutes",
    interviewerName: "Priya Sundaram",
    interviewerDesignation: "Staff Software Engineer",
    interviewerEmail: "priya.s@google.com",
    interviewerPhone: "+91 8765432109",
    interviewerLinkedIn: "https://linkedin.com/in/priyasundaram",
    meetingLink: "https://meet.google.com/xyz-abc-def",
    status: "upcoming",
    preparationStatus: "In Progress",
    companyResearch: {
      overview: "Google organizes the world's information and makes it universally accessible and useful.",
      culture: "Innovation, collaboration, data-driven decisions, psychological safety.",
      products: ["Google Search", "Chrome", "Gmail", "Google Cloud", "Android", "YouTube"],
      techStack: ["Angular", "TypeScript", "Go", "Borg", "Spanner"],
      hiringProcess: ["Resume Screen", "Phone Screen", "Onsite (4-5 rounds)", "Hiring Committee", "Offer"],
      recentNews: ["Gemini AI updates", "Google Cloud growth", "New Hyderabad campus"],
      interviewDifficulty: "High",
      expectedQuestions: [
        "Design a URL shortener frontend",
        "How would you build Google Docs real-time collaboration?",
        "Explain virtual DOM vs incremental DOM",
      ],
      dressCode: "Casual",
      interviewTips: [
        "Practice system design fundamentals",
        "Focus on scalability and performance",
        "Prepare for follow-up questions",
        "Be ready to whiteboard your ideas",
      ],
    },
    suggestedQuestions: [
      "Design the frontend for Google Drive",
      "Explain how you'd optimize a slow React app",
      "What's the difference between CSR, SSR, and SSG?",
      "How would you implement infinite scroll?",
    ],
    requiredDocuments: [
      { name: "Updated Resume", completed: true },
      { name: "Government ID", completed: true },
      { name: "Certificates", completed: false },
      { name: "Portfolio Link", completed: true },
      { name: "Passport Photo", completed: false },
    ],
  },
  {
    id: 3,
    company: "Amazon",
    companyLogo: "/company-logos/amazon.png",
    position: "SDE II - Frontend",
    type: "Behavioral",
    mode: "Online",
    date: "2026-07-29",
    time: "02:00 PM",
    duration: "45 Minutes",
    interviewerName: "Rajesh Iyer",
    interviewerDesignation: "Hiring Manager",
    interviewerEmail: "rajesh.iyer@amazon.com",
    interviewerPhone: "+91 7654321098",
    interviewerLinkedIn: "https://linkedin.com/in/rajeshiyer",
    meetingLink: "https://chime.aws/meeting/123",
    status: "upcoming",
    preparationStatus: "Not Started",
    companyResearch: {
      overview: "Amazon is Earth's most customer-centric company, guided by Leadership Principles.",
      culture: "Customer obsession, ownership, bias for action, frugality, high standards.",
      products: ["AWS", "Amazon.com", "Prime Video", "Alexa", "Kindle"],
      techStack: ["React", "Java", "AWS", "DynamoDB", "Lambda"],
      hiringProcess: ["Online Assessment", "Phone Screen", "Onsite (Bar Raiser + 4 rounds)", "Offer"],
      recentNews: ["AWS AI services expansion", "Prime Day record sales", "Chennai office growth"],
      interviewDifficulty: "High",
      expectedQuestions: [
        "Tell me about a time you disagreed with a manager",
        "Describe a situation where you took ownership beyond your role",
        "How do you handle tight deadlines?",
      ],
      dressCode: "Business Casual",
      interviewTips: [
        "Prepare STAR format answers",
        "Study Amazon Leadership Principles deeply",
        "Have 2-3 stories for each principle",
        "Show customer obsession in every answer",
      ],
    },
    suggestedQuestions: [
      "Tell me about a time you failed and what you learned",
      "Describe a project where you had to learn something new quickly",
      "How do you prioritize competing tasks?",
      "Give an example of a time you improved a process",
    ],
    requiredDocuments: [
      { name: "Updated Resume", completed: true },
      { name: "Government ID", completed: false },
      { name: "Certificates", completed: false },
      { name: "Portfolio Link", completed: true },
      { name: "Passport Photo", completed: false },
    ],
  },
  {
    id: 4,
    company: "Flipkart",
    companyLogo: "/company-logos/flipkart.png",
    position: "UI Developer",
    type: "Coding",
    mode: "Offline",
    date: "2026-07-31",
    time: "09:30 AM",
    duration: "120 Minutes",
    interviewerName: "Sneha Reddy",
    interviewerDesignation: "Tech Lead",
    interviewerEmail: "sneha.reddy@flipkart.com",
    interviewerPhone: "+91 6543210987",
    interviewerLinkedIn: "https://linkedin.com/in/snehareddy",
    location: "Flipkart Office, Bellandur, Bangalore",
    status: "upcoming",
    preparationStatus: "Not Started",
    companyResearch: {
      overview: "Flipkart is India's leading e-commerce platform, part of the Walmart group.",
      culture: "Bias for action, innovation, customer-first, inclusion, audacity.",
      products: ["Flipkart.com", "Myntra", "PhonePe", "Flipkart Plus", "SuperCoins"],
      techStack: ["React", "Node.js", "Kubernetes", "Cassandra", "Kafka"],
      hiringProcess: ["Coding Round", "Machine Coding", "Design Round", "Hiring Manager", "HR"],
      recentNews: ["Flipkart IPO plans", "AI-powered shopping features", "Quick commerce expansion"],
      interviewDifficulty: "Medium",
      expectedQuestions: [
        "Build a star rating component",
        "Implement a typeahead search",
        "Design a shopping cart with React",
      ],
      dressCode: "Smart Casual",
      interviewTips: [
        "Practice machine coding problems",
        "Focus on clean, production-quality code",
        "Handle edge cases in your solutions",
        "Explain your approach before coding",
      ],
    },
    suggestedQuestions: [
      "Build an accordion component from scratch",
      "Implement debouncing and throttling",
      "Create a responsive navigation bar",
      "Build a todo list with CRUD operations",
    ],
    requiredDocuments: [
      { name: "Updated Resume", completed: true },
      { name: "Government ID", completed: true },
      { name: "Certificates", completed: true },
      { name: "Portfolio Link", completed: true },
      { name: "Passport Photo", completed: false },
    ],
  },
];

export const previousInterviews: Interview[] = [
  {
    id: 5,
    company: "Zoho",
    companyLogo: "/company-logos/zoho.png",
    position: "Full Stack Developer",
    type: "Technical",
    mode: "Online",
    date: "2026-07-18",
    time: "10:00 AM",
    duration: "60 Minutes",
    interviewerName: "Karthik Subramanian",
    interviewerDesignation: "Senior Developer",
    interviewerEmail: "karthik.s@zoho.com",
    interviewerPhone: "+91 5432109876",
    interviewerLinkedIn: "https://linkedin.com/in/karthiks",
    meetingLink: "https://meet.zoho.com/abc",
    status: "completed",
    preparationStatus: "Ready",
    score: 72,
    feedback: {
      strengths: ["Good problem-solving", "Clean code", "Strong JavaScript fundamentals"],
      improvements: ["Backend knowledge needs work", "Database design could improve", "System design practice needed"],
      overallRating: 3.5,
      notes: "Good candidate but needs more backend experience for full stack role.",
    },
    companyResearch: {
      overview: "",
      culture: "",
      products: [],
      techStack: [],
      hiringProcess: [],
      recentNews: [],
      interviewDifficulty: "",
      expectedQuestions: [],
      dressCode: "",
      interviewTips: [],
    },
    suggestedQuestions: [],
    requiredDocuments: [],
  },
  {
    id: 6,
    company: "TCS",
    companyLogo: "/company-logos/tcs.png",
    position: "React Developer",
    type: "HR",
    mode: "Online",
    date: "2026-07-15",
    time: "03:00 PM",
    duration: "30 Minutes",
    interviewerName: "Meena Kumari",
    interviewerDesignation: "HR Manager",
    interviewerEmail: "meena.k@tcs.com",
    interviewerPhone: "+91 4321098765",
    interviewerLinkedIn: "https://linkedin.com/in/meenakumari",
    meetingLink: "https://meet.tcs.com/xyz",
    status: "completed",
    preparationStatus: "Ready",
    score: 85,
    feedback: {
      strengths: ["Excellent communication", "Confident answers", "Good salary negotiation"],
      improvements: ["Could improve technical depth explanation", "Prepare more company-specific questions"],
      overallRating: 4,
      notes: "Strong HR round. Recommended for offer.",
    },
    companyResearch: {
      overview: "",
      culture: "",
      products: [],
      techStack: [],
      hiringProcess: [],
      recentNews: [],
      interviewDifficulty: "",
      expectedQuestions: [],
      dressCode: "",
      interviewTips: [],
    },
    suggestedQuestions: [],
    requiredDocuments: [],
  },
];

export const allInterviews = [...todayInterviews, ...upcomingInterviews, ...previousInterviews];
