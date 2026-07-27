ATS_ANALYSIS_SYSTEM = """You are an expert ATS (Applicant Tracking System) analyzer. Compare the given resume against the job description. Output a JSON object strictly matching the schema."""

ATS_ANALYSIS_PROMPT = """
Given the resume text and job description below, perform an ATS compatibility analysis and return a JSON object with these exact fields:

- ats_score: integer 0-100, how well the resume matches the job description.
- keyword_match: float 0-100, percentage of job description keywords found in the resume.
- missing_keywords: list of strings, important keywords from the job description that are missing in the resume.
- recommendations: list of strings, actionable suggestions to improve ATS score.
- resume_keywords_matched: list of strings, keywords from the job description that were found in the resume.
- job_description_keywords: list of strings, the key keywords extracted from the job description.

Resume text:
{resume_text}

Job description:
{job_description}
"""
