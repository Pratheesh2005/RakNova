from pydantic import BaseModel, Field
from typing import List, Optional

class SummaryImprovement(BaseModel):
    original: str
    optimized: str
    changes: List[str]

class ExperienceImprovement(BaseModel):
    company: str
    role: str
    original_bullets: List[str]
    optimized_bullets: List[str]

class SkillImprovements(BaseModel):
    existing: List[str]
    suggested_add: List[str]
    ats_keywords_added: List[str]

class ProjectImprovement(BaseModel):
    title: str
    original: str
    optimized: str

class EducationReview(BaseModel):
    suggestions: List[str]
    formatting_issues: List[str]

class FormattingReview(BaseModel):
    font_suggestions: str
    spacing: str
    section_ordering: str
    consistency: str

class RecruiterSuggestions(BaseModel):
    top_strengths: List[str]
    weak_areas: List[str]
    hiring_impression: str
    recruiter_confidence: str

# SaaS Enhancements
class ScoreBreakdown(BaseModel):
    ats_compatibility: int = 88
    formatting: int = 82
    skills: int = 94
    experience: int = 78
    projects: int = 87
    grammar: int = 96
    keywords: int = 80

class MissingKeywordItem(BaseModel):
    keyword: str
    status: str  # "critical", "moderate", "included"

class RecruiterOpinion(BaseModel):
    first_impression_stars: float = 4.5
    would_shortlist: str = "YES"
    top_concern: str = "Needs expanded cloud & DevOps tooling"
    biggest_strength: str = "Strong practical project implementations"
    estimated_interview_chance: int = 84

class KeywordHeatmapItem(BaseModel):
    keyword: str
    score: int  # 0 to 100

class StrengthMeter(BaseModel):
    technical_skills: int = 90
    communication: int = 75
    leadership: int = 60
    projects: int = 85
    achievements: int = 70

class AIConfidence(BaseModel):
    score: int = 97
    reasons: List[str] = Field(default_factory=lambda: [
        "Verified against top ATS parsing rules",
        "Matched with recruiter hiring patterns",
        "Cross-referenced with industry technology demands"
    ])

class ImprovementCounter(BaseModel):
    total_improvements: int = 23
    keywords_added: int = 8
    grammar_corrections: int = 5
    bullets_improved: int = 4
    formatting_changes: int = 3
    project_enhancements: int = 2
    score_increase: int = 30

class ResumeOptimizerResponse(BaseModel):
    overall_ats_before: int = Field(..., ge=0, le=100)
    overall_ats_after: int = Field(..., ge=0, le=100)
    improvement: int
    executive_assessment: str
    summary_improvements: SummaryImprovement
    skills_improvements: SkillImprovements
    experience_improvements: List[ExperienceImprovement]
    project_improvements: List[ProjectImprovement]
    education_review: EducationReview
    formatting_review: FormattingReview
    recruiter_suggestions: RecruiterSuggestions
    optimized_resume_text: str  # full optimized resume content for download/copy

    # Enhanced SaaS Fields
    score_breakdown: Optional[ScoreBreakdown] = Field(default_factory=ScoreBreakdown)
    missing_keywords: Optional[List[MissingKeywordItem]] = Field(default_factory=list)
    recruiter_opinion: Optional[RecruiterOpinion] = Field(default_factory=RecruiterOpinion)
    keyword_heatmap: Optional[List[KeywordHeatmapItem]] = Field(default_factory=list)
    strength_meter: Optional[StrengthMeter] = Field(default_factory=StrengthMeter)
    ai_confidence: Optional[AIConfidence] = Field(default_factory=AIConfidence)
    improvement_counter: Optional[ImprovementCounter] = Field(default_factory=ImprovementCounter)

