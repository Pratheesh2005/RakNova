JOB_MATCH_SYSTEM = """You are an expert recruitment AI. Compare the candidate's resume with the job description and assess how well the candidate matches the role. Output a JSON object strictly following the schema."""

JOB_MATCH_PROMPT = """
Given the resume text and job description below, perform a job match analysis and return a JSON object with these exact fields:

- match_percentage: integer 0-100, how well the candidate matches the job requirements.
- strengths: list of strings, the candidate's strengths that align with the role.
- weaknesses: list of strings, gaps or areas where the candidate falls short.
- missing_skills: list of strings, required skills that are missing.
- reasons: list of strings, explanation of the match score (2-3 sentences).
- recommended_action: string, one of: "Proceed to interview immediately", "Review with caution", "Not a suitable match", "Request additional information".

Resume text:
{resume_text}

Job description:
{job_description}
"""
