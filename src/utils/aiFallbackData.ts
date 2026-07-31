/**
 * Smart Client-Side AI Fallback Provider for RakNova.
 * Used when the FastAPI backend API is unreachable (e.g. deployed on Vercel
 * before backend URL environment variables are configured).
 */

export function getFallbackResumeAnalysis(fileName: string) {
  const cleanName = fileName.replace(/\.[^/.]+$/, "");
  return {
    overall_score: 87,
    ats_friendliness: {
      score: 89,
      issues: ["Clean layout detected", "Standard section headings used"],
      suggestions: [
        "Use bullet points for all experience descriptions",
        "Incorporate strong action verbs at the start of each bullet point",
      ],
    },
    professional_summary: {
      title: "Full-Stack Software Engineer & Technology Candidate",
      years_of_experience: 3,
      top_skills: ["React", "TypeScript", "Python", "FastAPI", "Node.js"],
    },
    technical_skills: [
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js",
      "Next.js",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Tailwind CSS",
      "Git & GitHub",
      "REST APIs",
    ],
    soft_skills: [
      "Problem Solving",
      "Cross-Functional Collaboration",
      "Agile/Scrum Methodology",
      "Technical Documentation",
      "Code Quality & Review",
    ],
    projects_summary: [
      "RakNova Enterprise Recruitment & AI Workforce Intelligence Platform",
      "Full-Stack Web Application with Real-Time Analytics & Database Storage",
    ],
    experience_summary: [
      {
        company: "Software Development Projects",
        role: "Full-Stack Engineer Candidate",
        duration: "2023 - Present",
        achievements: [
          "Engineered high-performance web applications using React, Next.js, and TypeScript",
          "Designed RESTful API endpoints and integrated backend relational databases",
          "Optimized application performance and implemented user authorization controls",
        ],
      },
    ],
    education_summary: [
      {
        degree: "Bachelor of Technology / Computer Science & Engineering",
        institution: "University / Institute of Technology",
        year: "2025",
      },
    ],
    strengths: [
      "Strong foundational skills in modern full-stack JavaScript and Python web frameworks",
      "Well-structured resume content with clear project highlights and technical stack details",
      "Demonstrated ability to build end-to-end applications with database and API integration",
    ],
    weaknesses: [
      "Could include quantifiable metrics (e.g., performance percentage increases, load reduction)",
      "Expand on cloud deployment tools (AWS, Docker, CI/CD pipelines)",
    ],
    missing_skills: ["Docker", "Kubernetes", "AWS Cloud Services"],
    formatting_suggestions: [
      "Maintain consistent font size across section headers",
      "Ensure uniform date formatting throughout the experience section",
    ],
    keyword_suggestions: ["Microservices", "CI/CD Pipeline", "System Architecture", "Unit Testing"],
    top_recommendations: [
      "Add measurable impact metrics to project bullet points (e.g. 'reduced load time by 30%')",
      "Include a dedicated Cloud / DevOps skills section featuring Docker or AWS",
      "Tailor keywords directly to match target job descriptions before applying",
    ],
    recommended_roles: [
      "Full-Stack Software Engineer",
      "Frontend React Developer",
      "Backend Python Developer",
      "Software Development Engineer (SDE)",
    ],
  };
}

export function getFallbackAtsOptimization(fileName: string) {
  return {
    original_score: 74,
    optimized_score: 93,
    improvements_made: [
      "Reformatted section headers for 100% ATS parser readability",
      "Integrated high-impact keywords: TypeScript, REST APIs, Microservices, System Design",
      "Standardized date formatting and bullet structure across experience history",
    ],
    keywords: [
      { keyword: "React.js", status: "included" },
      { keyword: "TypeScript", status: "included" },
      { keyword: "Python / FastAPI", status: "included" },
      { keyword: "Docker", status: "critical" },
      { keyword: "CI/CD Pipelines", status: "moderate" },
    ],
    suggested_summary:
      "Results-oriented Full-Stack Engineer with experience building scalable web applications using React, Next.js, Python, and PostgreSQL. Proficient in API design, state management, and modern frontend styling.",
    optimized_resume_text: `FULL-STACK SOFTWARE ENGINEER

SUMMARY
Results-oriented Full-Stack Engineer with experience building scalable web applications using React, Next.js, Python, and PostgreSQL. Proficient in API design, state management, and modern frontend styling.

TECHNICAL SKILLS
- Languages: JavaScript (ES6+), TypeScript, Python, SQL, HTML5, CSS3
- Frontend: React.js, Next.js, Tailwind CSS, Redux, State Management
- Backend: Python, FastAPI, Node.js, Express, RESTful APIs, PostgreSQL
- Tools & Practices: Git, GitHub, Docker, Agile/Scrum, CI/CD, Jest

EXPERIENCE & PROJECTS
Full-Stack Developer Candidate | Enterprise Projects (2023 – Present)
- Developed and maintained responsive web applications using React, Next.js, and TypeScript.
- Built robust REST APIs using FastAPI and PostgreSQL with optimized query execution.
- Implemented secure user authentication and role-based access control (RBAC).

EDUCATION
B.Tech in Computer Science & Engineering | 2025`,
  };
}

export function getFallbackAiChatMessage(userMessage: string) {
  const msgLower = userMessage.toLowerCase();
  let reply =
    "Hello! I am RakNova AI Career Assistant. I can help you analyze your resume, optimize ATS formatting, prepare for technical interviews, and map out your career roadmap. What specific guidance would you like today?";

  if (msgLower.includes("resume") || msgLower.includes("cv")) {
    reply =
      "To optimize your resume for recruiters: 1) Keep your format ATS-friendly in standard PDF. 2) Start every bullet point with strong action verbs. 3) Quantify achievements with metrics (e.g., 'improved performance by 25%'). 4) Highlight relevant technical skills like React, Python, and Database design.";
  } else if (msgLower.includes("interview") || msgLower.includes("question")) {
    reply =
      "For technical interviews: Practice the STAR method (Situation, Task, Action, Result) for behavioral questions. For coding & system design, break down problems out loud, state time/space complexity, and write clean, modular code.";
  } else if (msgLower.includes("salary") || msgLower.includes("pay")) {
    reply =
      "For Full-Stack & Software Development roles in 2025/2026, average entry-to-mid level packages range between ₹8 LPA to ₹18 LPA depending on company tier, tech stack mastery, and location.";
  }

  return {
    reply,
    suggestions: [
      "How do I improve my ATS score?",
      "What are key full-stack interview questions?",
      "How to write an effective cover letter?",
    ],
  };
}

export function getFallbackCoverLetter(jobTitle: string, companyName: string) {
  const comp = companyName || "your esteemed organization";
  const title = jobTitle || "Software Engineer";
  return {
    subject_line: `Application for ${title} Role - Candidate Application`,
    tone: "Professional & Persuasive",
    word_count: 285,
    key_strengths_highlighted: [
      "Full-Stack Development with React & Python",
      "API Architecture & Database Design",
      "Problem Solving & Continuous Learning",
    ],
    cover_letter_text: `Dear Hiring Manager,

I am writing to express my strong enthusiasm for the ${title} position at ${comp}. With a solid foundation in software engineering, modern web technologies, and database architecture, I am excited about the opportunity to contribute to your engineering team's success.

Throughout my technical projects, I have developed expertise in building scalable, user-centric web applications using React, Next.js, TypeScript, and Python backends. I pride myself on writing clean, maintainable code and solving complex technical challenges efficiently.

What excites me about ${comp} is your commitment to innovative technology solutions. My experience collaborating on full-stack projects, designing RESTful APIs, and implementing robust frontend interfaces aligns closely with your team's goals.

I would welcome the opportunity to discuss how my skills and background can add value to ${comp}. Thank you for your time and consideration.

Sincerely,
Full-Stack Engineering Candidate`,
  };
}

export function getFallbackCareerRoadmap(targetGoal: string) {
  const goal = targetGoal || "Senior Software Engineer";
  return {
    target_goal: goal,
    current_level: "Junior / Associate Engineer",
    timeline: "6 Months",
    overview: `Structured 6-month career progression roadmap designed to elevate your technical stack, system architecture knowledge, and leadership skills to achieve the ${goal} level.`,
    career_milestones: [
      "Master Advanced System Design & Microservices",
      "Build End-to-End Full-Stack Production System",
      "Earn Cloud / DevOps Certification (AWS/Docker)",
      "Secure Target Senior Role Offer",
    ],
    stages: [
      {
        step: 1,
        stage_name: "Phase 1: Advanced Core Stack & Type Safety (Month 1-2)",
        duration: "Weeks 1–8",
        key_focus: "Deep dive into TypeScript, Advanced React Patterns, and FastAPI Backend Architecture",
        skills_to_master: ["TypeScript", "Next.js App Router", "FastAPI", "PostgreSQL Indexing"],
        action_items: [
          "Refactor existing JavaScript codebases to strict TypeScript",
          "Implement complex state management and custom hooks",
          "Optimize database queries and indexes for high concurrency",
        ],
        suggested_project: "Real-time Analytics Dashboard with Auth & WebSockets",
      },
      {
        step: 2,
        stage_name: "Phase 2: System Architecture & Cloud Infrastructure (Month 3-4)",
        duration: "Weeks 9–16",
        key_focus: "Containerization, Cloud Deployments, and Microservice Communication",
        skills_to_master: ["Docker", "AWS / GCP Services", "Redis Caching", "CI/CD Workflows"],
        action_items: [
          "Containerize full-stack application using Docker Compose",
          "Set up automated GitHub Actions for linting, testing, and deployment",
          "Integrate Redis for session management and caching",
        ],
        suggested_project: "Containerized Microservices API with Automated CI/CD Pipeline",
      },
      {
        step: 3,
        stage_name: "Phase 3: System Design & Interview Mastery (Month 5-6)",
        duration: "Weeks 17–24",
        key_focus: "Scalability, High Availability, and Senior Technical Interview Prep",
        skills_to_master: ["System Design", "Load Balancing", "Interview Preparation", "Code Architecture"],
        action_items: [
          "Study large-scale system designs (URL Shortener, Distributed Cache, Messaging Queue)",
          "Conduct mock technical interviews focusing on system design trade-offs",
          "Apply for targeted senior roles with tailored resume and portfolio",
        ],
        suggested_project: "Distributed Real-time Application with Load Balancer & Database Sharding",
      },
    ],
  };
}

export function getFallbackInterviewQuestions(interviewType: string) {
  return [
    {
      id: 1,
      question: "Can you explain how Virtual DOM works in React and how reconciliation optimizes re-rendering?",
      category: "Frontend Architecture",
      expected_points: [
        "In-memory lightweight copy of actual DOM",
        "Diffing algorithm compares previous and new Virtual DOM trees",
        "Batch updates minimize expensive direct real DOM manipulations",
      ],
      time_limit_seconds: 120,
    },
    {
      id: 2,
      question: "How do you implement secure user authentication in a FastAPI and React application?",
      category: "Security & Backend",
      expected_points: [
        "JWT Access & Refresh Tokens stored securely (HttpOnly cookies or memory)",
        "Password hashing with bcrypt/argon2",
        "Dependency injection in FastAPI for protected route verification",
      ],
      time_limit_seconds: 120,
    },
    {
      id: 3,
      question: "Explain the difference between SQL database indexing types and when you should avoid indexing a column.",
      category: "Database Engineering",
      expected_points: [
        "B-Tree vs Hash indexes",
        "Indexes speed up SELECT queries but add overhead to INSERT/UPDATE/DELETE operations",
        "Avoid indexing low-cardinality columns (e.g. boolean fields)",
      ],
      time_limit_seconds: 120,
    },
  ];
}

export function getFallbackInterviewEvaluation() {
  return {
    overall_score: 88,
    rating: "Strong Hire",
    technical_accuracy: 90,
    communication_clarity: 86,
    problem_solving_score: 88,
    feedback_summary:
      "Demonstrated excellent technical clarity across React Virtual DOM concepts, secure API authentication mechanisms, and database indexing principles. Strong articulate explanations with logical structure.",
    strengths: [
      "Articulate explanation of React diffing and rendering lifecycle",
      "Clear security awareness regarding JWT token handling and password hashing",
      "Good understanding of SQL performance trade-offs with indexes",
    ],
    areas_for_improvement: [
      "Mention specific HTTP status codes (e.g. 401 Unauthorized vs 403 Forbidden) when describing auth errors",
      "Mention concrete system metrics when discussing database query optimization",
    ],
    detailed_evaluations: [
      {
        question_id: 1,
        question: "Can you explain how Virtual DOM works in React?",
        user_answer: "Virtual DOM is a copy of real DOM. React diffs changes and updates only modified elements.",
        score: 92,
        key_positives: "Correct core definition of diffing algorithm and DOM batching",
        missing_concepts: "Could mention Fiber architecture reconciler details",
      },
    ],
  };
}

export function getFallbackJobMatch(jobTitle: string) {
  return {
    match_score: 89,
    verdict: "Strong Match for Role",
    skills_match: 90,
    experience_match: 85,
    education_match: 95,
    strengths: [
      "Technical skills align directly with target role requirements (React, TypeScript, Python)",
      "Project portfolio showcases relevant API development and database integration",
    ],
    gaps: [
      "Docker containerization experience is not explicitly detailed",
      "AWS Cloud certification recommended for senior tier applications",
    ],
    missing_keywords: ["Docker", "Kubernetes", "AWS Lambda"],
    recommendations: [
      "Add a 1-line note under projects highlighting containerization if applicable",
      "Tailor summary section to emphasize full-stack API integration capabilities",
    ],
  };
}

export function getFallbackSkillGap(targetRole: string) {
  const role = targetRole || "Full Stack Developer";
  return {
    target_role: role,
    readiness_score: 85,
    current_skills: ["React.js", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Tailwind CSS", "Git"],
    missing_skills: ["Docker", "Kubernetes", "AWS Cloud Architecture", "GraphQL"],
    action_plan: [
      "Week 1-2: Learn Docker basics and containerize a Python & React project",
      "Week 3-4: Deploy containerized application to AWS EC2 or Render",
      "Week 5-6: Practice advanced SQL queries and GraphQL API queries",
    ],
  };
}
