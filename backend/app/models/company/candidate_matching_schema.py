from pydantic import BaseModel, Field
from typing import List, Optional

class CandidateInput(BaseModel):
    candidate_id: str
    name: str
    resume_text: str

class CandidateMatchingRequest(BaseModel):
    job_title: str = Field(default="Software Engineer")
    job_description: str = Field(..., min_length=20)
    candidates: List[CandidateInput] = Field(..., min_items=1)

class CandidateMatchResult(BaseModel):
    candidate_id: str
    name: str
    overall_match_score: int = Field(..., ge=0, le=100)
    skill_match: int = Field(..., ge=0, le=100)
    experience_match: int = Field(..., ge=0, le=100)
    education_match: int = Field(..., ge=0, le=100)
    project_match: int = Field(..., ge=0, le=100)
    certification_match: int = Field(..., ge=0, le=100)
    strengths: List[str]
    weaknesses: List[str]
    missing_skills: List[str]
    hiring_recommendation: str  # "Strong Hire", "Recommended", "Consider", "Not Recommended"
    ranking_reason: str

class CandidateMatchingResponse(BaseModel):
    job_title: str
    top_candidate_id: str
    total_candidates_analyzed: int
    ranked_candidates: List[CandidateMatchResult]
    overall_summary: str
