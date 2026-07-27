SKILL_GAP_SYSTEM = """You are an expert career skill gap analyzer. Compare candidate skills against target job requirements and return JSON matching the schema."""

SKILL_GAP_PROMPT = """
Resume text:
{resume_text}

Target Role / Job Description:
{target_role}

Identify comprehensive skill gaps and return a JSON object with:
- current_skills: list of strings (skills found in resume)
- missing_skills: list of strings (skills required for target role but missing)
- critical_skills: list of strings (must-have skills to learn first)
- nice_to_have_skills: list of strings (secondary skills)
- learning_difficulty: list of objects with skill and difficulty ("Easy"|"Moderate"|"Hard")
- estimated_time: list of objects with skill and time_estimate (e.g. "2 weeks")
- learning_cost: list of objects with skill and cost (e.g. "Free / Open Source")
- beginner_roadmap: list of strings
- intermediate_roadmap: list of strings
- advanced_roadmap: list of strings
- recommended_certifications: list of strings
- recommended_courses: list of strings
- projects_to_build: list of strings
- github_ideas: list of strings
- industry_trends: list of strings
- future_demand: list of strings
- market_demand: list of strings
- salary_impact: string (e.g. "+25% Salary Potential")
"""
