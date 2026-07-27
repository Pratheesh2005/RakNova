INTERVIEW_GENERATION_SYSTEM = """You are an expert interview question generator. Create tailored interview questions based on candidate resume and job description. Return JSON matching the schema."""

INTERVIEW_QUESTIONS_PROMPT = """
Resume text:
{resume_text}

Job description:
{job_description}

Interview type: {interview_type}
Difficulty: {difficulty}
Experience level: {experience}
Number of questions: {num_questions}
Language: {language}

Generate exactly {num_questions} interview questions.
Return a JSON object with a field "questions", which is a list of objects containing:
- id: integer (1 to {num_questions})
- question: string
- category: one of "technical", "behavioral", or "HR"
- difficulty: "{difficulty}"
- ideal_answer: concise summary of ideal response key points
"""

INTERVIEW_REPORT_SYSTEM = """You are an expert technical interviewer and hiring evaluator. Evaluate candidate answers constructively and return a JSON performance report."""

INTERVIEW_REPORT_PROMPT = """
Resume context:
{resume_text}

Interview settings:
- Type: {interview_type}
- Difficulty: {difficulty}

Candidate Answers:
{answers_json}

Evaluate performance and return a JSON object with:
- overall_score: int 0-100
- technical_score: int 0-100
- behavioral_score: int 0-100
- communication_score: int 0-100
- problem_solving: int 0-100
- confidence: int 0-100
- star_method_score: int 0-100
- strengths: list of strings
- weaknesses: list of strings
- mistakes: list of strings
- areas_to_improve: list of strings
- ideal_answers: list of strings
- improved_answers: list of strings
- learning_resources: list of strings
- interview_readiness: int 0-100
- hiring_probability: int 0-100
"""
