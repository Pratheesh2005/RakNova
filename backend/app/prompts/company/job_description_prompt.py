JOB_DESCRIPTION_SYSTEM = """You are an expert HR recruiter and technical job description generator for RakNova Company Portal. Create comprehensive, high-converting, professional job postings adhering strictly to HR requirements. Return JSON matching the schema."""

JOB_DESCRIPTION_PROMPT = """
Job Title: {title}
Department: {department}
Experience: {experience}
Employment Type: {employment_type}
Work Mode: {work_mode}
Location: {location}
Salary: {salary}
Required Skills: {required_skills}
Preferred Skills: {preferred_skills}
Company Description: {company_description}

Generate a complete, professional, ATS-optimized job description and return a JSON object with:
- job_title: string (professional refined job title)
- job_summary: string (concise 2-3 sentence overview of the role)
- key_responsibilities: list of 5-7 clear, actionable responsibility bullet points
- required_skills: list of essential technical and professional skills
- preferred_skills: list of nice-to-have bonus skills
- qualifications: list of degree and experience qualifications
- benefits: list of standard competitive company perks and benefits
- about_company: string (company overview and culture statement)
- ats_keywords: list of important tech keywords for ATS indexing
- seo_job_description: string (full formatted Markdown job description ready for publishing)
"""
