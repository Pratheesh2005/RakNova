RECRUITER_INTERVIEW_SYSTEM = """You are an expert technical interviewer and HR evaluation specialist for RakNova Company Portal. Generate highly relevant, candidate-specific interview questions comparing candidate resume against job description. Return JSON matching the schema."""

RECRUITER_INTERVIEW_PROMPT = """
Job Title: {job_title}
Job Description:
{job_description}

Candidate Name: {candidate_name}
Candidate Resume:
{resume_text}

Experience Level: {experience_level}
Difficulty: {difficulty}
Interview Type: {interview_type}
Number of Questions: {num_questions}

Generate {num_questions} tailored interview questions and return a JSON object with:
- candidate_name: string
- job_title: string
- interview_type: string
- difficulty: string
- questions: list of question objects containing:
   - id: integer (1 to {num_questions})
   - question: string (tailored technical/behavioral/HR/scenario question)
   - category: "Technical" | "Behavioral" | "HR" | "Scenario"
   - difficulty: "{difficulty}"
   - expected_answer: string (key concepts expected in candidate's response)
   - evaluation_criteria: list of 2-3 scoring criteria bullets for HR
   - follow_up_question: string (probing follow-up question)
- interview_guide_summary: string (brief HR instructions on conducting this interview)
"""
