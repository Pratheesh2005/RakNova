from pydantic import BaseModel, Field
from typing import List, Optional

class JobDescriptionRequest(BaseModel):
    title: str = Field(..., min_length=2)
    department: str = Field(default="Engineering")
    experience: str = Field(default="Mid-Level (2-4 yrs)")
    employment_type: str = Field(default="Full-time")
    work_mode: str = Field(default="Hybrid")
    location: str = Field(default="Bangalore, India")
    salary: Optional[str] = Field(default=None)
    required_skills: List[str] = Field(default_factory=list)
    preferred_skills: List[str] = Field(default_factory=list)
    company_description: Optional[str] = Field(default=None)

class JobDescriptionResponse(BaseModel):
    job_title: str
    job_summary: str
    key_responsibilities: List[str]
    required_skills: List[str]
    preferred_skills: List[str]
    qualifications: List[str]
    benefits: List[str]
    about_company: str
    ats_keywords: List[str]
    seo_job_description: str
