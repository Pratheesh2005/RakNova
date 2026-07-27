from pydantic import BaseModel, Field
from typing import List, Optional

class MatchBreakdown(BaseModel):
    skills_match: int = Field(..., ge=0, le=100)
    experience_match: int = Field(..., ge=0, le=100)
    education_match: int = Field(..., ge=0, le=100)
    certifications_match: int = Field(..., ge=0, le=100)
    ats_keyword_match: int = Field(..., ge=0, le=100)
    responsibilities_match: int = Field(..., ge=0, le=100)
    domain_match: int = Field(..., ge=0, le=100)

class SkillItem(BaseModel):
    skill: str
    match: bool

class ExperienceComparison(BaseModel):
    resume_experience: str
    job_requirement: str
    match_percentage: int

class EducationComparison(BaseModel):
    resume_education: str
    job_requirement: str
    status: str  # "Matched", "Partially Matched", "Not Matched"

class ResponsibilityComparison(BaseModel):
    responsibility: str
    matched: bool

class KeywordCoverageItem(BaseModel):
    skill: str
    coverage: int = Field(..., ge=0, le=100)

class JobMatchAnalysisResponse(BaseModel):
    overall_match: int = Field(..., ge=0, le=100)
    match_level: str  # "Excellent Match", "Good Match", "Average Match", "Low Match"
    match_breakdown: MatchBreakdown
    matching_skills: List[str]
    missing_skills: List[str]
    experience_comparison: ExperienceComparison
    education_comparison: EducationComparison
    certifications_summary: str
    responsibilities_comparison: List[ResponsibilityComparison]
    ai_hiring_decision: str
    interview_probability: int = Field(..., ge=0, le=100)
    salary_estimate: str
    resume_improvements: List[str]
    keyword_coverage: List[KeywordCoverageItem] = Field(default_factory=list)
    strengths: List[str]
    weaknesses: List[str]
    missing_requirements: List[str]
    recommendations: List[str]
