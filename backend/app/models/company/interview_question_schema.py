from pydantic import BaseModel, Field
from typing import List, Optional

class RecruiterInterviewQuestion(BaseModel):
    id: int
    question: str
    category: str  # "Technical" | "Behavioral" | "HR" | "Scenario"
    difficulty: str  # "Easy" | "Medium" | "Hard"
    expected_answer: str
    evaluation_criteria: List[str]
    follow_up_question: str

class RecruiterInterviewRequest(BaseModel):
    job_title: Optional[str] = Field(default="Software Engineer")
    job_description: str = Field(..., min_length=20)
    candidate_name: Optional[str] = Field(default="Candidate")
    resume_text: str = Field(..., min_length=20)
    experience_level: str = Field(default="Mid-Level")
    difficulty: str = Field(default="Medium")
    interview_type: str = Field(default="Mixed")  # "HR" | "Technical" | "Behavioral" | "Mixed"
    num_questions: int = Field(default=6, ge=1, le=15)

class RecruiterInterviewResponse(BaseModel):
    candidate_name: str
    job_title: str
    interview_type: str
    difficulty: str
    questions: List[RecruiterInterviewQuestion]
    interview_guide_summary: str
