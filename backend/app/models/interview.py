from pydantic import BaseModel, Field
from typing import List, Optional

class InterviewQuestion(BaseModel):
    id: int
    question: str
    category: str  # technical / behavioral / HR
    difficulty: str
    ideal_answer: str

class InterviewQuestionsResponse(BaseModel):
    questions: List[InterviewQuestion]

class InterviewReport(BaseModel):
    overall_score: int = Field(..., ge=0, le=100)
    technical_score: int = Field(default=80, ge=0, le=100)
    behavioral_score: int = Field(default=80, ge=0, le=100)
    communication_score: int = Field(default=80, ge=0, le=100)
    problem_solving: int = Field(default=80, ge=0, le=100)
    confidence: int = Field(default=80, ge=0, le=100)
    star_method_score: int = Field(default=80, ge=0, le=100)
    strengths: List[str] = Field(default_factory=list)
    weaknesses: List[str] = Field(default_factory=list)
    mistakes: List[str] = Field(default_factory=list)
    areas_to_improve: List[str] = Field(default_factory=list)
    ideal_answers: List[str] = Field(default_factory=list)
    improved_answers: List[str] = Field(default_factory=list)
    learning_resources: List[str] = Field(default_factory=list)
    interview_readiness: int = Field(default=80, ge=0, le=100)
    hiring_probability: int = Field(default=80, ge=0, le=100)
