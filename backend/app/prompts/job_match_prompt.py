JOB_MATCH_SYSTEM = """You are an expert hiring AI. Compare the candidate's resume against the job description and provide a comprehensive match analysis. Never invent information. Only use what is present in the resume. Return a JSON object matching the required schema."""

JOB_MATCH_PROMPT = """
Resume text:
{resume_text}

Job description:
{job_description}

Return a JSON object with these exact fields:
- overall_match: integer 0-100, overall match score.
- match_level: string, one of "Excellent Match", "Good Match", "Average Match", "Low Match".
- match_breakdown: object with integer fields (0-100): skills_match, experience_match, education_match, certifications_match, ats_keyword_match, responsibilities_match, domain_match.
- matching_skills: list of strings, skills found in both resume and job description.
- missing_skills: list of strings, skills required in the job but missing from resume.
- experience_comparison: object with:
   - resume_experience: string summarizing relevant experience from resume.
   - job_requirement: string summarizing experience required in job.
   - match_percentage: integer 0-100.
- education_comparison: object with:
   - resume_education: string summarizing highest education from resume.
   - job_requirement: string summarizing education requirement.
   - status: string, "Matched", "Partially Matched", or "Not Matched".
- certifications_summary: string summarizing certifications match (or "None").
- responsibilities_comparison: list of objects, each with:
   - responsibility: string (a key responsibility from the job).
   - matched: boolean (true if resume indicates ability).
- ai_hiring_decision: string, 2-3 sentence recruiter-style summary.
- interview_probability: integer 0-100, chance of getting an interview.
- salary_estimate: string, estimated salary range (e.g., "₹8-12 LPA") based on skills/experience/location (assume India).
- resume_improvements: list of strings, specific improvements to increase match for this job.
- keyword_coverage: list of objects, each with skill (string) and coverage (integer 0-100) based on how well the resume covers the job keyword.
- strengths: list of strings, top strengths of the candidate for this role.
- weaknesses: list of strings, top weaknesses.
- missing_requirements: list of strings, important job requirements not met.
- recommendations: list of strings, personalized recommendations.
"""
