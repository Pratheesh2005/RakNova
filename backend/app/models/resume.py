from pydantic import BaseModel, Field
from typing import List, Optional

class ResumeAnalysisRequest(BaseModel):
    # No fields needed because we receive a file upload,
    # but FastAPI file upload is handled separately.
    pass

class ProfessionalSummary(BaseModel):
    title: str = Field(..., description="Current or most relevant job title")
    years_of_experience: int
    top_skills: List[str]

class ExperienceItem(BaseModel):
    company: str
    role: str
    duration: str
    achievements: List[str]

class EducationItem(BaseModel):
    degree: str
    institution: str
    year: str

class ATSFriendliness(BaseModel):
    score: int = Field(..., ge=0, le=100)
    issues: List[str]
    suggestions: List[str]

class ResumeAnalysisResponse(BaseModel):
    overall_score: int = Field(..., ge=0, le=100)
    professional_summary: ProfessionalSummary
    strengths: List[str]
    weaknesses: List[str]
    missing_skills: List[str]
    technical_skills: List[str]
    soft_skills: List[str]
    experience_summary: List[ExperienceItem]
    education_summary: List[EducationItem]
    projects_summary: List[str]
    ats_friendliness: ATSFriendliness
    formatting_suggestions: List[str]
    keyword_suggestions: List[str]
    top_recommendations: List[str]
    recommended_roles: List[str] = Field(..., description="3-5 recommended job roles based on the resume")
