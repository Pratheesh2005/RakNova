from pydantic import BaseModel, Field
from typing import List, Optional

class SkillDifficultyItem(BaseModel):
    skill: str
    difficulty: str

class SkillTimeItem(BaseModel):
    skill: str
    time_estimate: str

class SkillCostItem(BaseModel):
    skill: str
    cost: str

class SkillGapAnalysisResponse(BaseModel):
    current_skills: List[str] = Field(default_factory=list)
    missing_skills: List[str] = Field(default_factory=list)
    critical_skills: List[str] = Field(default_factory=list)
    nice_to_have_skills: List[str] = Field(default_factory=list)
    learning_difficulty: List[SkillDifficultyItem] = Field(default_factory=list)
    estimated_time: List[SkillTimeItem] = Field(default_factory=list)
    learning_cost: List[SkillCostItem] = Field(default_factory=list)
    beginner_roadmap: List[str] = Field(default_factory=list)
    intermediate_roadmap: List[str] = Field(default_factory=list)
    advanced_roadmap: List[str] = Field(default_factory=list)
    recommended_certifications: List[str] = Field(default_factory=list)
    recommended_courses: List[str] = Field(default_factory=list)
    projects_to_build: List[str] = Field(default_factory=list)
    github_ideas: List[str] = Field(default_factory=list)
    industry_trends: List[str] = Field(default_factory=list)
    future_demand: List[str] = Field(default_factory=list)
    market_demand: List[str] = Field(default_factory=list)
    salary_impact: str = Field(default="+25% Salary Increase Potential")

SkillGapResponse = SkillGapAnalysisResponse
