CANDIDATE_MATCHING_SYSTEM = """You are an objective, enterprise hiring AI for RakNova Company Portal. Evaluate candidate resumes strictly against the job description and rank them from best fit to worst. Never invent candidate credentials. Return JSON matching the schema."""

CANDIDATE_MATCHING_PROMPT = """
Job Title: {job_title}

Job Description:
{job_description}

Candidate Resumes to Evaluate:
{candidates_data}

Analyze each candidate objectively against the job description requirements.
Return a JSON object containing:
- job_title: string
- top_candidate_id: string (id of highest scoring candidate)
- total_candidates_analyzed: integer
- ranked_candidates: list of candidate match objects, sorted by overall_match_score descending. Each object must contain:
   - candidate_id: string
   - name: string
   - overall_match_score: integer 0-100
   - skill_match: integer 0-100
   - experience_match: integer 0-100
   - education_match: integer 0-100
   - project_match: integer 0-100
   - certification_match: integer 0-100
   - strengths: list of strings
   - weaknesses: list of strings
   - missing_skills: list of strings
   - hiring_recommendation: one of "Strong Hire", "Recommended", "Consider", "Not Recommended"
   - ranking_reason: string (2-3 sentence explainable breakdown of why candidate earned this score)
- overall_summary: string (recruiter overview summarizing pool quality and top recommendations)
"""
