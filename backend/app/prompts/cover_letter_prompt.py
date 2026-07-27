COVER_LETTER_SYSTEM = """You are an expert executive cover letter writer. Create tailored, highly compelling cover letters matching candidate experience to target roles. Return JSON."""

COVER_LETTER_PROMPT = """
Candidate Resume:
{resume_text}

Target Job Title / Company:
{job_title} at {company_name}

Job Description / Key Requirements:
{job_description}

Tone / Style Preference:
{tone}

Generate a tailored cover letter and return a JSON object with:
- cover_letter_text: string (full formatted cover letter ready for submission)
- subject_line: string (impactful email/application subject line)
- tone: "{tone}"
- key_strengths_highlighted: list of strings
- word_count: int
"""
