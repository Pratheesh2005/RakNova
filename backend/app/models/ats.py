from pydantic import BaseModel, Field
from typing import List

class ATSAnalysisResponse(BaseModel):
    ats_score: int = Field(..., ge=0, le=100)
    keyword_match: float = Field(..., ge=0.0, le=100.0, description="Percentage of job description keywords found in resume")
    missing_keywords: List[str]
    recommendations: List[str]
    resume_keywords_matched: List[str]
    job_description_keywords: List[str]
